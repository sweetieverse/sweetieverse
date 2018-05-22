const { THREE } = global.window ? window : { THREE: null };

class Player {
  constructor(scene, id, displayName, gamepads) {
    this.controllerMeshes = [null, null];
    this.scene = scene;
    this.throttler = null;
    this.id = id;
    this.displayName = displayName;
    this.gamepads = gamepads;
  }
}

export default Player;
