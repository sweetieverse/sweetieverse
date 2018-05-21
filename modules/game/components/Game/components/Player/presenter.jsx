import React from 'react';

import styles from './styles.css';

const { THREE } = global.window ? window : { THREE: null };

const canvasWidth = 400;
const canvasHeight = 500;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.scene = null;
    this.renderer = null;
  }

  initScene() {}

  initRenderer() {}

  render() {
    return (
      <div className={styles.game}>
        <canvas width={canvasWidth} height={canvasHeight} />
      </div>
    );
  }
}

export default Game;
