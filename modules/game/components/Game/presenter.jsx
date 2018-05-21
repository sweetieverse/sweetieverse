import React from 'react';

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
    };
    this.camera = null;
    this.fov = null;
    this.scene = null;
    this.renderer = null;
    this.group = null;
    this.cube = null;
    this.canvas = null;
    this.pointLight = null;
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
      this.initPlayers();
    }
  }

  initPlayers() {
    const players = [];
    const numPlayers = 2; // normally get this from this.props.players.length or something
    for (let i = 0; i < numPlayers; i += 1) {
      players.push(new PlayerObject(this.scene));
    }
    this.setState({ players });
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

  updateGamepads() {
    const { updateGamepads } = this.props;

    if (navigator && navigator.getGamepads) {
      const gamepads = navigator.getGamepads();
      const gp = [];
      let pressed = false;

      for (let i = 0; i < gamepads.length; i += 1) {
        const pad = gamepads[i];
        if (pad) {
          if (pad.pose) {
            gp.push({
              position: pad.pose.position,
              orientation: pad.pose.orientation,
              hand: pad.hand,
            });
          }
          if (pad.buttons) {
            for (let j = 0; j < pad.buttons.length; j += 1) {
              const button = pad.buttons[j];
              if (button.pressed) {
                pressed = true;
                break;
              }
            }
          }
        }
      }

      updateGamepads(gp, pressed);
    }
  }

  updateCube(gamepads, buttonPressed) {
    this.group.rotation.y += (targetRotation - this.group.rotation.y) * 0.05;
    this.group.rotation.x += (targetRotationY - this.group.rotation.x) * 0.05;

    for (let i = 0; i < gamepads.length; i += 1) {
      const pad = gamepads[i];
      if (pad && pad.position && buttonPressed) {
        const posX = pad.position[0];
        const posY = pad.position[1];
        const posZ = pad.position[2];
        this.group.position.x = posX;
        this.group.position.y = posY;
        this.group.posZ = posZ;
      }
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
    const { gamepads } = this.props;
    const { players } = this.state;

    return (
      <div className={styles.game}>
        <canvas ref={this.setCanvasRef} width={canvasWidth} height={canvasHeight} />
        {players.map(player => (
          <Player player={player} scene={this.scene} gamepads={gamepads} />
        ))}
      </div>
    );
  }
}

export default Game;
