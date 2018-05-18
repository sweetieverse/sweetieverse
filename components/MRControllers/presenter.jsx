import React from 'react';
import { isEqual } from 'lodash';

import { propTypes, defaultProps } from './props';

const THREE = global.window ? window.THREE : {};

/*
async function initControllerMeshes(controllerMeshes) {
  const meshesClone = [...controllerMeshes];

  for (let i = 0; i < controllerMeshes.length; i++) {
    const controllerMesh = new THREE.Object3D();
    controllerMesh.position.set(i === 0 ? -0.1 : 0.1, 0, 0);
    controllerMesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(0, -1, -1),
    );

    controllerMesh.lastGrabbed = false;

    meshesClone[i] = controllerMesh;
  }

  const controllerMeshLoader = new THREE.OBJLoader();
  controllerMeshLoader.setPath('/entities/vive-controller/');

  const object = await controllerMeshLoader.load('vr_controller_vive_1_5.obj');

  const textureLoader = new THREE.TextureLoader();
  textureLoader.setPath('/entities/vive-controller/');

  const controllerMesh = object.children[0];
  controllerMesh.material.map = textureLoader.load('onepointfive_texture.png');
  controllerMesh.material.specularMap = textureLoader.load('onepointfive_spec.png');

  meshesClone[0].add(object.clone());
  meshesClone[1].add(object.clone());
  // controllerMeshLoader.load('vr_controller_vive_1_5.obj', (object) => {
  //   const textureLoader = new THREE.TextureLoader();
  //   textureLoader.setPath('/entities/vive-controller/');
  //
  //   const controllerMesh = object.children[0];
  //   controllerMesh.material.map = textureLoader.load('onepointfive_texture.png');
  //   controllerMesh.material.specularMap = textureLoader.load('onepointfive_spec.png');
  //
  //   meshesClone[0].add(object.clone());
  //   meshesClone[1].add(object.clone());
  // });
}
*/

class MRControllers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamepads: [],
    };
    this.controllerMeshes = [null, null];
    this.rafId = null; // store the raf id if cancel() is needed later
  }

  componentDidMount() {
    const { scene } = this.props;

    const me = this;

    if (!global.window || !scene) return;

    for (let i = 0; i < this.controllerMeshes.length; i++) {
      const controllerMesh = new THREE.Object3D();
      controllerMesh.position.set(i === 0 ? -0.1 : 0.1, 0, 0);
      controllerMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, -1, -1),
      );

      controllerMesh.lastGrabbed = false;

      scene.add(controllerMesh);
      this.controllerMeshes[i] = controllerMesh;
    }

    const controllerMeshLoader = new THREE.OBJLoader();
    controllerMeshLoader.setPath('/entities/vive-controller/');
    controllerMeshLoader.load('vr_controller_vive_1_5.obj', (object) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setPath('/entities/vive-controller/');

      const controllerMesh = object.children[0];
      controllerMesh.material.map = textureLoader.load('onepointfive_texture.png');
      controllerMesh.material.specularMap = textureLoader.load('onepointfive_spec.png');

      this.controllerMeshes[0].add(object.clone());
      this.controllerMeshes[1].add(object.clone());

      me.updateControllers();
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log(this.props, nextProps);
  }

  updateControllers() {
    if (navigator) {
      const gamepads = navigator.getGamepads();

      if (!isEqual(this.state.gamepads, gamepads)) {
        this.setState({ gamepads });
      }
    }

    this.rafId = requestAnimationFrame(this.updateControllers);
  }

  render() {
    for (let i = 0; i < this.state.gamepads.length; i++) {
      const gamepad = this.state.gamepads[i];
      if (gamepad) {
        const controllerMesh = this.controllerMeshes[i];
        controllerMesh.position.fromArray(gamepad.pose.position);
        controllerMesh.quaternion.fromArray(gamepad.pose.orientation);
        controllerMesh.updateMatrixWorld();
      }
    }

    return null;
  }
}

MRControllers.propTypes = propTypes;

MRControllers.defaultProps = defaultProps;

export default MRControllers;
