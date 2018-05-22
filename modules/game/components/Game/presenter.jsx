import React from 'react';
import qs from 'query-string';
import { throttle } from 'lodash';

import styles from './styles.css';

import projectsImage from '../../../../assets/images/x_projects.png';

import { PlayerObject } from './objects';
import { Player } from './components';

const { THREE } = global.window ? window : { THREE: null };

const canvasWidth = 500;
const canvasHeight = 500;

const fovMAX = 160;
const fovMIN = 1;

let targetRotation = 0;
let targetRotationY = 0;
let targetRotationOnMouseDown = 0;
let targetRotationYOnMouseDown = 0;
let mouseX = 0;
let mouseY = 0;
let mouseXOnMouseDown = 0;
let mouseYOnMouseDown = 0;
const windowHalfX = global.window ? window.innerWidth / 2 : 250;
const windowHalfY = global.window ? window.innerHeight / 2 : 250;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      scene: false,
      mouseDown: false,
    };
    this.camera = null;
    this.fov = null;
    this.scene = null;
    this.renderer = null;
    this.group = null;
    this.cube = null;
    this.canvas = null;
    this.pointLight = null;
    this.throttler = null;
    this.objectThrottler = null;
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.animate = this.animate.bind(this);
    this.startRenderer = this.startRenderer.bind(this);
    this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
    this.onDocumentMouseWheel = this.onDocumentMouseWheel.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.onDocumentMouseOut = this.onDocumentMouseOut.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
  }

  componentDidMount() {
    const { setUser } = this.props;
    const { search } = global.window ? window.location : { search: '' };
    const parsed = qs.parse(search);
    if (parsed && parsed.p) {
      const id = parsed.p;
      const data = {
        id,
        displayName: id,
      };
      setUser(id, data);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.playerIds.length !== prevState.players.length) {
      const currentPlayerIds = prevState.players.map(player => player.id);
      const newPlayers = nextProps.playerIds.filter(id => !currentPlayerIds.includes(id));
      const { players } = prevState;
      return {
        ...players,
        players: [...players, ...newPlayers],
      };
    }
    return prevState;
  }

  setCanvasRef(el) {
    if (el) this.canvas = el;
    if (THREE) {
      this.initRenderer();
      this.initGroups();
      this.initCamera();
      this.initLight();
      this.initScene();
      this.startRenderer();
      this.addImage(projectsImage);
      this.animate();
      this.initEventListeners();
      // this.initPlayers();
    }
  }

  startRenderer() {
    // Start the renderer.
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvasWidth, canvasHeight);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(30, canvasWidth / canvasHeight, 1, 1500);
    this.camera.position.set(0, 4, 7);
    this.camera.lookAt(new THREE.Vector3());
    this.fov = this.camera.fov;
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.add(this.group);
    this.scene.add(this.camera);
    this.scene.add(this.pointLight);
    this.setState({ scene: true });
  }

  initLight() {
    // create a point light
    this.pointLight =
      new THREE.PointLight(0xFFFFFF);
    // set its position
    this.pointLight.position.x = 10;
    this.pointLight.position.y = 50;
    this.pointLight.position.z = 130;
  }

  initGroups() {
    this.group = new THREE.Group();
    this.cube = new THREE.Group();
    this.group.add(this.cube);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.canvas,
    });
  }

  addImage(path) {
    const me = this;
    new THREE
      .ImageLoader()
      .setCrossOrigin('*')
      .load(path, (image) => {
        const texture = new THREE.CanvasTexture(image);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        me.addCube(material);
      });
  }

  addCube(material) {
    const geometry = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    cube.rotation.set(0, 0, 0);
    this.cube.add(cube);
  }

  initEventListeners() {
    window.addEventListener('mousedown', this.onDocumentMouseDown, false);
    window.addEventListener('wheel', this.onDocumentMouseWheel, false);
    window.addEventListener('keydown', this.onDocumentKeyDown, false);
  }

  onDocumentMouseDown(evt) {
    evt.preventDefault();
    this.setState({ mouseDown: true });
    window.addEventListener('mousemove', Game.onDocumentMouseMove, false);
    window.addEventListener('mouseup', this.onDocumentMouseUp, false);
    window.addEventListener('mouseout', this.onDocumentMouseOut, false);
    mouseXOnMouseDown = evt.clientX - windowHalfX;
    mouseYOnMouseDown = evt.clientY - windowHalfY;
    targetRotationOnMouseDown = targetRotation;
    targetRotationYOnMouseDown = targetRotationY;
  }

  onDocumentMouseWheel(evt) {
    const fovDelta = this.fov - (evt.deltaY * 0.05);
    this.fov = Math.max(Math.min(fovDelta, fovMAX), fovMIN);
  }

  static onDocumentMouseMove(evt) {
    mouseX = evt.clientX - windowHalfX;
    mouseY = evt.clientY - windowHalfY;
    targetRotation = (targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown)) * 0.02;
    targetRotationY = (targetRotationYOnMouseDown + (mouseY - mouseYOnMouseDown)) * 0.02;
  }

  onDocumentMouseUp() {
    this.setState({ mouseDown: false });
    document.removeEventListener('mousemove', Game.onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this.onDocumentMouseOut, false);
  }

  onDocumentMouseOut() {
    document.removeEventListener('mousemove', Game.onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this.onDocumentMouseOut, false);
  }

  onDocumentKeyDown(evt) {
    const code = evt.keyCode;

    // press 'm' for magic leap (any other key for other vr)
    if (code !== 77) {
      this.scene.background = new THREE.Color(0x3B3961);
    }

    if (navigator.getVRDisplays) {
      navigator.getVRDisplays().then((displays) => {
        if (displays.length > 0) {
          const display = displays[0];
          const canvas = this.renderer.domElement;
          display.requestPresent([{ source: canvas }]).then(() => {
            this.renderer.vr.enabled = true;
            this.renderer.vr.setDevice(display);
            const leftEye = display.getEyeParameters('left');
            const rightEye = display.getEyeParameters('right');
            canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
            canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
            console.log('am i presenting meow?');
          });
        }
      });
    }
  }

  getGamepadData() {
    const result = {gamepads: [null, null], pressed: false};
    if (navigator && navigator.getGamepads) {
      const gamepads = navigator.getGamepads();

      for (let i = 0; i < gamepads.length; i += 1) {
        const pad = gamepads[i];
        if (pad) {
          result.gamepads[i] = {
            pose: pad.pose,
            hand: pad.hand,
            index: pad.index,
            buttons: pad.buttons,
            axes: pad.axes,
            gesture: pad.gesture,
            connected: pad.connected,
          };
          for (let j = 0; j < pad.buttons.length; j += 1) {
            const button = pad.buttons[j];
            if (button.pressed) {
              result.pressed = true;
              break;
            }
          }
        }
      }
    }
    return result;
  }

  hasGamepadData() {
    const { gamepads, pressed } = this.getGamepadData();
    return (gamepads[0] || gamepads[1]);
  }

  updateGamepads() {
    if (!this.throttler) {
      this.throttler = throttle(() => {
        if (this.hasGamepadData()) {
          const { gamepads, pressed } = this.getGamepadData();
          this.props.updateDbGamepads(gamepads);
        }
      }, 500);
    }
    this.throttler();

    if (this.hasGamepadData()) {
      const {gamepads: gp, pressed} = this.getGamepadData();
      this.props.updateGamepads(gp, pressed);
    }
  }

  updateCube(gamepads, buttonPressed) {
    const { updateDbObject, cube } = this.props;
    const { mouseDown } = this.state;

    for (let i = 0; i < gamepads.length; i += 1) {
      const pad = gamepads[i];
      if (pad && pad.pose.position && buttonPressed) {
        const posX = pad.pose.position[0];
        const posY = pad.pose.position[1];
        const posZ = pad.pose.position[2];
        this.group.position.x = posX;
        this.group.position.y = posY;
        this.group.posZ = posZ;
      }
    }

    if (!this.objectThrottler) {
      this.objectThrottler = throttle(() => {
        const {
          quaternion,
          position,
          scale,
        } = this.group;

        const cubeData = {
          quaternion: { w: quaternion.w, x: quaternion.x, y: quaternion.y, z: quaternion.z },
          position: { x: position.x, y: position.y, z: position.z },
          scale: { x: scale.x, y: scale.y, z: scale.z },
        };

        updateDbObject('cube', cubeData);
      }, 1000 / 40);
    }
    this.objectThrottler();

    if (mouseDown) {
      this.group.rotation.y += (targetRotation - this.group.rotation.y) * 0.05;
      this.group.rotation.x += (targetRotationY - this.group.rotation.x) * 0.05;
    } else {
      this.group.position.x = cube.position.x;
      this.group.position.y = cube.position.y;
      this.group.position.z = cube.position.z;
      this.group.quaternion.w = cube.quaternion.w;
      this.group.quaternion.x = cube.quaternion.x;
      this.group.quaternion.y = cube.quaternion.y;
      this.group.quaternion.z = cube.quaternion.z;
    }
  }

  animate() {
    const { gamepads, buttonPressed } = this.props;

    this.renderer.state.reset();
    this.camera.fov = this.fov;
    this.camera.aspect = canvasWidth / canvasHeight;

    this.updateCube(gamepads, buttonPressed);

    this.renderer.render(this.scene, this.camera);
    this.camera.updateProjectionMatrix();

    this.updateGamepads();

    requestAnimationFrame(this.animate);
  }

  render() {
    const { gamepads, players, user, cube } = this.props;
    const { players: playerIds, scene } = this.state;

    const gamePlayers = playerIds.map(id => new PlayerObject(
      this.scene,
      id,
      players[id].displayName,
      players[id].gamepads,
    ));

    const userPlayer = new PlayerObject(
      this.scene,
      user.id,
      user.displayName,
      gamepads,
    );

    return (
      <div className={styles.game}>
        <canvas ref={this.setCanvasRef} width={canvasWidth} height={canvasHeight} />
        {
          scene &&
          gamePlayers.map((player, idx) => (
            <Player
              key={`game-player-${idx}`}
              player={player}
              scene={this.scene}
              gamepads={player.gamepads} />
          ))
        }
        {
          scene &&
          <Player player={userPlayer} scene={this.scene} gamepads={gamepads} />
        }
      </div>
    );
  }
}

export default Game;
