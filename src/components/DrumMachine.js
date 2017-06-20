import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import styles from '../styles/DrumMachine.css';
import Matrix from './Matrix';
import Sequencer from '../utils/Sequencer';
import '../utils/Animation';

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
      playing: true,
    };

    this.setCurrentBeat = this.setCurrentBeat.bind(this);

    this.sequencer = new Sequencer(
      this.state.data,
      this.setCurrentBeat,
    );
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
    this.sequencer.start();
    this.setState({
      playing: true,
    });
  }

  /**
   * [stopSequencer description]
   */
  stopSequencer() {
    this.sequencer.stop();
    this.setState({
      playing: false,
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
        <RaisedButton
          label="Start"
          primary
          className={styles.btn}
          onTouchTap={() => this.startSequencer()}
        />
        <RaisedButton
          label="End"
          primary
          className={styles.btn}
          onTouchTap={() => this.stopSequencer()}
        />
        <Matrix
          data={this.state.data}
          playing={playing}
          currentBeat={this.state.currentBeat}
          onClick={(i, j) => this.handleClick(i, j)}
        />
      </div>
    );
  }

}

export default DrumMachine;
