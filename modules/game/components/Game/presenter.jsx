import React from 'react';

import styles from './styles.css';

import projectsImage from '../../../../assets/images/x_projects.png';

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
    const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    cube.rotation.set(0, 0, 0);
    this.cube.add(cube);
  }

  initEventListeners() {
    window.addEventListener('mousedown', this.onDocumentMouseDown, false);
    window.addEventListener('wheel', this.onDocumentMouseWheel, false);
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
