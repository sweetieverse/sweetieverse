import React from 'react';

import styles from './styles.css';

import projectsImage from '../../../../assets/images/x_projects.png';

const { THREE } = global.window ? window : { THREE: null };

const canvasWidth = 500;
const canvasHeight = 500;

const targetRotation = 0;
const targetRotationY = 0;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.fov = null;
    this.scene = null;
    this.renderer = null;
    this.group = null;
    this.cube = null;
    this.canvas = null;
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.animate = this.animate.bind(this);
    this.startRenderer = this.startRenderer.bind(this);
  }

  setCanvasRef(el) {
    if (el) this.canvas = el;
    if (THREE) {
      this.initRenderer();
      this.initGroups();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.startRenderer();
      this.addImage(projectsImage);
      this.animate();
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
    this.scene.background = new THREE.Color(0xFFFFFF);
    this.scene.add(this.group);
    this.scene.add(this.camera);
  }

  initLight() {
    // create a point light
    const pointLight =
      new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    this.scene.add(pointLight);
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
    const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    cube.rotation.set(0, 0, 0);
    this.cube.add(cube);
  }

  animate() {
    this.renderer.state.reset();
    this.camera.fov = this.fov;
    this.camera.aspect = canvasWidth / canvasHeight;
    this.group.rotation.y += (targetRotation - this.group.rotation.y) * 0.05;
    this.group.rotation.x += (targetRotationY - this.group.rotation.x) * 0.05;
    this.renderer.render(this.scene, this.camera);
    this.camera.updateProjectionMatrix();
    requestAnimationFrame(this.animate);
  }

  render() {
    return (
      <div className={styles.game}>
        <canvas ref={this.setCanvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
    );
  }
}

export default Game;
