import React from 'react';
import * as THREE from 'three';

import projectsImg from '../assets/images/projects.png';

let camera;
let scene;
let renderer;
let group;
let cubes;

let targetRotation = 0;
let targetRotationY = 0;
let targetRotationOnMouseDown = 0;
let targetRotationYOnMouseDown = 0;
let mouseX = 0;
let mouseY = 0;
let mouseXOnMouseDown = 0;
let mouseYOnMouseDown = 0;
let windowWidth = 200;
let windowHeight = 200;
const windowHalfX = global.window ? window.innerWidth / 2 : 500;
const windowHalfY = global.window ? window.innerHeight / 2 : 500;
const mouseDelta = 0;
let fov;

const fovMAX = 160;
const fovMIN = 1;

const geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);

function addCube(material) {
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);
  cube.rotation.set(0, 0, 0);
  cubes.add(cube);
}

function addImage(path) {
  new THREE.ImageLoader()
    .setCrossOrigin('*')
    .load(path, (image) => {
      const texture = new THREE.CanvasTexture(image);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
      addCube(material);
    });
}

function onDocumentKeyDown(evt) {
  const code = evt.keyCode;

  // press 'm' for magic leap (any other key for other vr)
  if (code !== 77) {
    scene.background = new THREE.Color(0x3B3961);
  }

  navigator.getVRDisplays().then((displays) => {
    if (displays.length > 0) {
      const display = displays[0];
      const canvas = renderer.domElement;
      display.requestPresent([{ source: canvas }]).then(() => {
        renderer.vr.enabled = true;
        renderer.vr.setDevice(display);
        const leftEye = display.getEyeParameters('left');
        const rightEye = display.getEyeParameters('right');
        canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
        canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
        console.log('am i presenting meow?');
      });
    }
  });
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  targetRotation = (targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown)) * 0.02;
  targetRotationY = (targetRotationYOnMouseDown + (mouseY - mouseYOnMouseDown)) * 0.02;
}

function onDocumentMouseOut(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false); // eslint-disable-line
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseUp(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    targetRotation = (targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown)) * 0.05;
  }
}

function onDocumentMouseWheel(event) {
  const fovDelta = fov - (event.deltaY * 0.05);
  fov = Math.max(Math.min(fovDelta, fovMAX), fovMIN);
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  if (global.window) {
    window.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('mouseup', onDocumentMouseUp, false);
    window.addEventListener('mouseout', onDocumentMouseOut, false);
  }

  mouseXOnMouseDown = event.clientX - windowHalfX;
  mouseYOnMouseDown = event.clientY - windowHalfY;
  targetRotationOnMouseDown = targetRotation;
  targetRotationYOnMouseDown = targetRotationY;
}

function onWindowResize() {
  if (global.window) {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }
  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(windowWidth, windowHeight);
}

function animate() {
  renderer.state.reset();
  camera.fov = fov;
  camera.aspect = windowWidth / windowHeight;
  group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
  group.rotation.x += (targetRotationY - group.rotation.x) * 0.05;
  renderer.render(scene, camera);
  camera.updateProjectionMatrix();
  requestAnimationFrame(animate);
}

function init(container) {
  camera = new THREE.PerspectiveCamera(30, windowWidth / windowHeight, 1, 1500);
  camera.position.set(0, 4, 7);
  camera.lookAt(new THREE.Vector3());

  fov = camera.fov; // eslint-disable-line

  scene = new THREE.Scene();

  group = new THREE.Group();

  scene.add(group);

  cubes = new THREE.Group();
  group.add(cubes);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(global.window ? window.devicePixelRatio : 1);
  renderer.setSize(800, 800);
  if (container) container.appendChild(renderer.domElement);

  addImage(projectsImg);

  if (global.window) {
    window.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener('touchstart', onDocumentTouchStart, false);
    window.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('wheel', onDocumentMouseWheel, false);
    window.addEventListener('keydown', onDocumentKeyDown, false);
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
    };
    this.container = null;
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.container = el;
    init(this.container);
    animate();
  }

  handleAppendCanvas(canvas) {
    this.setState({ canvas });
  }

  render() {
    return (
      <div ref={this.setRef} />
    );
  }
}
