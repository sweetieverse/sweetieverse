import { throttle } from 'lodash';
import util from 'util';

const { THREE } = global.window ? window : { THREE: null };

class Player {
  constructor(scene) {
    this.controllerMeshes = [null, null];
    this.scene = scene;
    this.throttler = null;
  }
}

export default Player;
