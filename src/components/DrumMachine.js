import React, { Component } from 'react';
import { WindowResizeListener } from 'react-window-resize-listener';
import _ from 'lodash';
import uuid4 from 'uuid/v4';

import styles from '../assets/styles/DrumMachine.css';
import Matrix from './Matrix';
import Sequencer from '../utils/Sequencer';
import Animation from '../utils/Animation';

const patternA =
  [[1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0]];
const patternB =
  [[1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0]];
const patterns = [
  { title: 'AAA', pattern: patternA },
  { title: 'BBB', pattern: patternB }];
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
      recording: false,
    };

    this.setCurrentBeat = this.setCurrentBeat.bind(this);
    this.recordSequencer = this.recordSequencer.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.clearRecord = this.clearRecord.bind(this);
    this.playPattern = this.playPattern.bind(this);
    this.renderPatterns = this.renderPatterns.bind(this);

    this.sequencer = new Sequencer(
      this.state.data,
      this.setCurrentBeat,
    );
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    // this.ani = new Animation();
    this.ani = Animation();
  }

  /**
   * [setCurrentBeat description]
   * @param {number} currentBeat
   */
  setCurrentBeat(currentBeat) {
    if (currentBeat === 0) {
      this.ani.trigger(5);
    }
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
   * [handleResize description]
   * @param  {number} w width of window
   * @param  {number} h height of window
   */
  handleResize(w, h) {
    this.ani.resize(w, h);
  }

  /**
   * [startSequence description]
   */
  startSequencer() {
    this.ani.trigger(1);
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
      currentBeat: 0,
    });
  }

  /**
   * [recordSequencer description]
   */
  recordSequencer() {
    if (this.state.recording === true) {
      this.setState({ recording: false });
      this.sequencer.stopRecording();
    } else {
      this.setState({ recording: true });
      this.sequencer.startRecording();
    }
  }

  /**
   * [saveRecord description]
   */
  saveRecord() {
    this.sequencer.saveRecord();
  }

  /**
   * [clearRecord description]
   */
  clearRecord() {
    this.sequencer.clearRecord();
  }

  /**
  * @param  {object} pattern width of window
   * [playPattern description]
   */
  playPattern(pattern) {
    this.sequencer.stop();
    const data = this.state.data;
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = pattern[i][j];
      }
    }
    this.setState({ data });
    this.sequencer.start();
  }

  /**
   * [renderPatterns description]
   * @return {Element}
   */
  renderPatterns() {
    return _.map(patterns, pattern => (
      <li
        key={uuid4()}
        onTouchTap={() => this.playPattern(pattern.pattern)}
      >
        <h4>{pattern.title}</h4>
      </li>
    ));
  }

  /**
   * [render description]
   * @return {Element}
   */
  render() {
    return (
      <div>
        <h1 className={styles.title}>
          Drum Machine
        </h1>
        {/*
        <ul>
          {this.renderPatterns()}
        </ul>
        */}
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
          {/*
          <div
            className={styles.btn}
            onTouchTap={() => this.recordSequencer()}
          >
            Record
          </div>
          <div
            className={styles.btn}
            onTouchTap={() => this.saveRecord()}
          >
            Save
          </div>
          <div
            className={styles.btn}
            onTouchTap={() => this.clearRecord()}
          >
            Clear
          </div>
          */}

        </div>
        <Matrix
          data={this.state.data}
          playing={this.state.playing}
          currentBeat={this.state.currentBeat}
          onClick={(i, j) => this.handleClick(i, j)}
        />
        <div className={styles.animation} id="animation" />
        <WindowResizeListener
          onResize={w => this.handleResize(w.windowWidth, w.windowHeight)}
        />
      </div>
    );
  }

}

export default DrumMachine;
