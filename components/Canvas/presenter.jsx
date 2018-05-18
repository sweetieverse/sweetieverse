import React from 'react';
import { isEqual } from 'lodash';

import { MRControllers } from '..';

import { propTypes, defaultProps } from './props';

const THREE = global.window ? window.THREE : null;

const windowWidth = global.window ? window.innerWidth : 200;
const windowHeight = global.window ? window.innerHeight : 200;

class CanvasScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamepads: [],
      inited: false,
    };
    this.canvas = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.fov = null;
    this.rafId = null; // store the raf id if cancel() is needed later
    this.animate = this.animate.bind(this);
  }

  setCanvasRef(el) {
    if (el && global.window) {
      this.canvasRef = el;
      this.initScene();
      this.animate();
    }
  }

  handlePresentVr() {
    if (global.navigator && navigator.getVRDisplays) {
      console.log('getting displays');
      navigator.getVRDisplays().then((displays) => {
        if (displays.length > 0) {
          const display = displays[0];
          const canvas = this.renderer.domElement;
          if (canvas) {
            display.requestPresent([{ source: canvas }]).then(() => {
              this.renderer.vr.enabled = true;
              this.renderer.vr.setDevice(display);
              const leftEye = display.getEyeParameters('left');
              const rightEye = display.getEyeParameters('right');
              canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
              canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
            });
          }
        }
      });
      navigator.getVRDisplays = null;
    }
  }

  initScene() {
    if (!THREE) return;
    this.camera = new THREE.PerspectiveCamera(30, windowWidth / windowHeight, 1, 1500);
    this.camera.position.set(0, 4, 7);
    this.camera.lookAt(new THREE.Vector3());
    this.fov = this.camera.fov;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x3B3961);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvasRef,
    });
    this.renderer.setPixelRatio(global.window ? window.devicePixelRatio : 1);
    this.renderer.setSize(800, 800);
  }

  animate() {
    this.renderer.state.reset();
    this.camera.fov = this.fov;
    this.renderer.render(this.scene, this.camera);
    this.camera.updateProjectionMatrix();
    requestAnimationFrame(this.animate);
  }

  render() {
    this.handlePresentVr();

    return (
      <React.Fragment>
        <canvas
          ref={this.setCanvasRef.bind(this)}
          width={200}
          height={200}
          onClick={this.handlePresentVr.bind(this)} />
        <MRControllers scene={this.scene} />
      </React.Fragment>
    );
  }
}

CanvasScene.propTypes = propTypes;

CanvasScene.defaultProps = defaultProps;

export default CanvasScene;
