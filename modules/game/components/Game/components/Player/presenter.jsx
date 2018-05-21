import * as React from 'react';
import { throttle } from 'lodash';
import util from 'util';

const { THREE } = global.window ? window : { THREE: null };

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = props.player;
    this.initScene();
  }

  initScene() {
    if (!this.player.scene) return;

    const me = this;
    const controllerMeshLoader = new THREE.OBJLoader();

    for (let i = 0; i < this.player.controllerMeshes.length; i += 1) {
      const controllerMesh = new THREE.Object3D();
      controllerMesh.position.set(i === 0 ? -0.1 : 0.1, 0, 0);
      controllerMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, -1, -1),
      );
      controllerMesh.lastGrabbed = false;
      this.player.scene.add(controllerMesh);
      this.player.controllerMeshes[i] = controllerMesh;
    }

    controllerMeshLoader.setPath('models/vive-ctrl/');

    controllerMeshLoader.load('vr_controller_vive_1_5.obj', (object) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setPath('models/vive-ctrl/');
      const controllerMesh = object.children[0];
      controllerMesh.material.map = textureLoader.load('onepointfive_texture.png');
      controllerMesh.material.specularMap = textureLoader.load('onepointfive_spec.png');
      me.player.controllerMeshes[0].add(object.clone());
      me.player.controllerMeshes[1].add(object.clone());
    });
  }

  updateControllers(gamepads) {
    if (!gamepads) return;

    /* eslint-disable */
    function logGamepads() {
      console.log(util.inspect(gamepads, {showHidden: false, depth: null}));
    }
    /* eslint-enable */
    if (!this.throttler) this.throttler = throttle(logGamepads, 1000);
    this.throttler();

    for (let i = 0; i < gamepads.length; i += 1) {
      const gamepad = gamepads[i];
      if (gamepad && gamepad.pose) {
        const controllerMesh = this.player.controllerMeshes[i];
        if (controllerMesh) {
          controllerMesh.position.fromArray(gamepad.pose.position);
          controllerMesh.quaternion.fromArray(gamepad.pose.orientation);
          controllerMesh.updateMatrixWorld();
        }
      }
    }
  }

  render() {
    const { gamepads } = this.props;

    this.updateControllers(gamepads);

    return null;
  }
}

export default Player;
