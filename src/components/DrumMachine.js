import React, { Component } from 'react';

import styles from '../assets/styles/DrumMachine.css';
import Matrix from './Matrix';
import Sequencer from '../utils/Sequencer';
import Animation from '../utils/Animation';

/**
 * DrumMachine
 */
class DrumMachine extends Component {
  /**
   * [constructor description]
   */
  constructor() {
    super();
    const data = [];
    for (let i = 0; i < 16; i += 1) {
      data[i] = [];
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = (Math.random() > 0.15) ? 0 : 1;
      }
    }

    this.state = {
      data,
      currentBeat: 0,
      playing: false,
    };

    this.setCurrentBeat = this.setCurrentBeat.bind(this);

    this.sequencer = new Sequencer(
      this.state.data,
      this.setCurrentBeat,
    );
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    this.ani = new Animation();
  }

  /**
   * [setCurrentBeat description]
   * @param {number} currentBeat
   */
  setCurrentBeat(currentBeat) {
    this.setState({
      currentBeat,
    });
  }

  /**
   * [handleClick description]
   * @param  {number} i first index
   * @param  {number} j second index
   */
  handleClick(i, j) {
    const data = this.state.data;
    data[i][j] = (data[i][j] === 0) ? 1 : 0;
    this.setState({
      data,
    });
  }

  /**
   * [startSequence description]
   */
  startSequencer() {
    this.ani.start();
    this.sequencer.start();
    this.setState({
      playing: true,
    });
  }

  /**
   * [stopSequencer description]
   */
  stopSequencer() {
    this.ani.reverse();
    this.sequencer.stop();
    this.setState({
      playing: false,
      currentBeat: 0,
    });
  }

  /**
   * [render description]
   * @return {Element}
   */
  render() {
    const playing = this.sequencer.isPlaying();
    return (
      <div>
        <h1 className={styles.title}>
          Drum Machine
        </h1>
        <div className={styles.control}>
          <div
            className={styles.btn}
            onTouchTap={() => this.startSequencer()}
          >
            start
          </div>
          <div
            className={styles.btn}
            onTouchTap={() => this.stopSequencer()}
          >
            stop
          </div>
        </div>
        <Matrix
          data={this.state.data}
          playing={playing}
          currentBeat={this.state.currentBeat}
          onClick={(i, j) => this.handleClick(i, j)}
        />
        <div className={styles.animation} id="animation" />
      </div>
    );
  }

}

export default DrumMachine;
