import React, { Component } from 'react';
import { WindowResizeListener } from 'react-window-resize-listener';
import _ from 'lodash';
import uuid4 from 'uuid/v4';
import axios from 'axios';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';

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
      recording: false,
      patternLists: [],
      patternTitle: '',
      currentPatternId: '',
      drumNoteChain: [],
      currentChainElement: '',

			hidden: true,

			idle: false,
    };

    this.setCurrentBeat = this.setCurrentBeat.bind(this);
    this.recordSequencer = this.recordSequencer.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.clearRecord = this.clearRecord.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.savePattern = this.savePattern.bind(this);
    this.playPattern = this.playPattern.bind(this);
    this.editPattern = this.editPattern.bind(this);
    this.deleteCurrentPattern = this.deleteCurrentPattern.bind(this);
    this.exitPattern = this.exitPattern.bind(this);
    this.renderPatterns = this.renderPatterns.bind(this);
    this.updateChain = this.updateChain.bind(this);
    this.renderChain = this.renderChain.bind(this);
    this.setCurrentChainElementAtLast = this.setCurrentChainElementAtLast.bind(this);
    this.setCurrentChainElementAtHere = this.setCurrentChainElementAtHere.bind(this);
    this.deleteCurrentChainElement = this.deleteCurrentChainElement.bind(this);
    this.playChain = this.playChain.bind(this);
    this.exitChain = this.exitChain.bind(this);

    this.sequencer = new Sequencer(
      this.state.data,
      this.setCurrentBeat,
      this.state.drumNoteChain,
    );

    this.toggleHidden = this.toggleHidden.bind(this);
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    // this.ani = new Animation();
    this.ani = Animation();
    axios.get('/api/patterns')
      .then((res) => {
        this.setState({ patternLists: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * [setCurrentBeat description]
   * @param {number} currentBeat
   */
  setCurrentBeat(currentBeat) {
    if (currentBeat === 0) {
      this.ani.trigger(8);
    }
    this.setState({
      currentBeat,
    });
  }

  /**
   * [setCurrentChainAtLast description]
   */
  setCurrentChainElementAtLast() {
    this.setState({ currentChainElement: '' });
  }

  /**
  * @param  {String} id width of window
   * [setCurrentChainAtHere description]
   */
  setCurrentChainElementAtHere(id) {
    const drumNoteChain = this.state.drumNoteChain;
    const data = this.state.data;
    for (let k = 0; k < drumNoteChain.length; k += 1) {
      if (drumNoteChain[k].id === id) {
        for (let i = 0; i < 16; i += 1) {
          for (let j = 0; j < 8; j += 1) {
            data[i][j] = drumNoteChain[k].data[i][j];
          }
        }
      }
    }
    this.setState({ currentChainElement: id, data });
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
    // this.ani.trigger(1);
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
  * @param  {object} event width of window
   * [playPattern description]
   */
  handleTitleChange(event) {
    this.setState({ patternTitle: event.target.value });
  }

  /**
   * [savePattern description]
   */
  savePattern() {
    if (this.state.patternTitle !== '') {
      axios.post('/api/patterns', {
        title: this.state.patternTitle,
        content: this.state.data,
      })
      .catch(err => console.log(err));
      this.setState({ patternTitle: '' });
      axios.get('/api/patterns')
        .then((res) => {
          this.setState({ patternLists: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Please give your pattern a name!');
    }
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
        data[i][j] = pattern.content[i][j];
      }
    }
    this.setState({
      data,
      currentPatternId: pattern._id, // eslint-disable-line no-underscore-dangle
    });
    this.sequencer.start();
  }

  /**
   * [editPattern description]
   */
  editPattern() {
    // console.log(this.state.currentPatternId);
    if (this.state.patternTitle !== '') {
      axios.put(`/api/patterns/${this.state.currentPatternId}`, {
        title: this.state.patternTitle,
        content: this.state.data,
      })
      .catch(err => console.log(err));
    } else {
      axios.put(`/api/patterns/${this.state.currentPatternId}`, {
        content: this.state.data,
      })
      .catch(err => console.log(err));
    }
    axios.get('/api/patterns')
      .then((res) => {
        this.setState({ patternLists: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * [exitPattern description]
   */
  exitPattern() {
    const data = this.state.data;
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = 0;
      }
    }
    this.setState({ currentPatternId: '', data });
  }

  /**
   * [deleteCurrentPattern description]
   */
  deleteCurrentPattern() {
    if (this.state.currentPatternId !== '') {
      axios.delete(`/api/patterns/${this.state.currentPatternId}`)
       .catch((err) => {
         console.log(err);
       });
       axios.get('/api/patterns')
         .then((res) => {
           this.setState({ patternLists: res.data });
         })
         .catch((err) => {
           console.log(err);
         });
    }
    this.exitPattern();
  }

  /**
   * [appendChain description]
   */
  updateChain() {
    const drumNoteChain = this.state.drumNoteChain;
    const data = [[0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]];
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = this.state.data[i][j];
      }
    }
    const newChainElement = { id: uuid4(), data };
    if (this.state.currentChainElement === '') {
      drumNoteChain.push(newChainElement);
    } else {
      for (let i = 0; i < drumNoteChain.length; i += 1) {
        if (drumNoteChain[i].id === this.state.currentChainElement) {
          newChainElement.id = drumNoteChain[i].id;
          drumNoteChain[i] = newChainElement;
        }
      }
    }
    this.setState({ drumNoteChain });
  }

  /**
   * [deleteCurrentChainElement description]
   */
  deleteCurrentChainElement() {
    const drumNoteChain = this.state.drumNoteChain;
    const newDrumNoteChain = drumNoteChain.filter(
      element => element.id !== this.state.currentChainElement);
    drumNoteChain.pop();
    for (let k = 0; k < drumNoteChain.length; k += 1) {
      drumNoteChain[k].id = newDrumNoteChain[k].id;
      for (let i = 0; i < 16; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          drumNoteChain[k].data[i][j] = newDrumNoteChain[k].data[i][j];
        }
      }
    }
    this.setState({ drumNoteChain, currentChainElement: '' });
  }

  /**
   * [playChain description]
   */
  playChain() {
    this.sequencer.playingChain(true);
    this.ani.trigger(1);
    this.setState({
      playing: true,
    });
  }

  /**
   * [clearChain description]
   */
  exitChain() {
    this.sequencer.playingChain(false);
    this.ani.trigger(1);
    this.setState({
      playing: true,
    });
  }

	/**
   * [toggleHidden description]
   */
  toggleHidden() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  /**
   * [renderPatterns description]
   * @return {Element}
   */
  renderPatterns() {
    return _.map(this.state.patternLists, pattern => (
      <li
        key={uuid4()}
        onTouchTap={() => this.playPattern(pattern)}
        style={{ color: 'white' }}
      >
        <h4>{pattern.title}</h4>
      </li>
    ));
  }

  /**
   * [renderChain description]
   * @return {Element}
   */
  renderChain() {
    return _.map(this.state.drumNoteChain, chainElement => (
      <li
        key={chainElement.id}
        style={{ color: 'yellow' }}
        onTouchTap={() => this.setCurrentChainElementAtHere(chainElement.id)}
      >
        <h4>{chainElement.id + chainElement.data}</h4>
      </li>
    ));
  }

  /**
   * [render description]
   * @return {Element}
   */
  render() {
		const { hidden } = this.state;
    return (
      <div>
				<NavigationMenuIcon
					className={
						`${styles.menuIcon}
						 ${(hidden === true) ? styles.opa1 : styles.opa0}`
					}
					onClick={() => this.toggleHidden()}
				/>

				{hidden ? (
					''
				) : (
					<div className={styles.menu}>
						<NavigationCloseIcon
							className={styles.closeIcon}
							onClick={() => this.toggleHidden()} />
						<div className={styles.patternList}>
							renderPatterns in this div
							<ul>
			          {this.renderPatterns()}
			        </ul>
						</div>
						<div className={styles.chainList}>
							renderChain in this div
							<ul>
			          {this.renderChain()}
			          <li style={{ color: 'yellow' }} onTouchTap={() => this.setCurrentChainElementAtLast()}>
			            Update at here in this li
			          </li>
			        </ul>
						</div>
						<div className={styles.menuBtn}>
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
		            Clear Current Record
		          </div>

		          <div>
		            <div>
		              <input
		                type="text"
		                value={this.state.patternTitle}
		                onChange={this.handleTitleChange}
		              />
		            </div>
		            <div
		              className={styles.btn}
		              onTouchTap={() => this.savePattern()}
		            >
		              Save New Pattern
		            </div>
		            <div
		              className={styles.btn}
		              onTouchTap={() => this.editPattern()}
		            >
		              Update Pattern
		            </div>
		          </div>

		          <div
		            className={styles.btn}
		            onTouchTap={() => this.deleteCurrentPattern()}
		          >
		            Delete Current Pattern
		          </div>

		          <div
		            className={styles.btn}
		            onTouchTap={() => this.exitPattern()}
		          >
		            Exit Pattern
		          </div>

		          <div
		            className={styles.btn}
		            onTouchTap={() => this.updateChain()}
		          >
		            Update Chain
		          </div>
		          <div
		            className={styles.btn}
		            onTouchTap={() => this.deleteCurrentChainElement()}
		          >
		            Delete Current Chain Element
		          </div>
		          <div
		            className={styles.btn}
		            onTouchTap={() => this.playChain()}
		          >
		            Play Chain
		          </div>
		          <div
		            className={styles.btn}
		            onTouchTap={() => this.exitChain()}
		          >
		            Exit Chain
		          </div>

		        </div>
					</div>
				)}

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
            Clear Current Record
          </div>

          <div>
            <div>
              <input
                type="text"
                value={this.state.patternTitle}
                onChange={this.handleTitleChange}
              />
            </div>
            <div
              className={styles.btn}
              onTouchTap={() => this.savePattern()}
            >
              Save New Pattern
            </div>
            <div
              className={styles.btn}
              onTouchTap={() => this.editPattern()}
            >
              Update Pattern
            </div>
          </div>

          <div
            className={styles.btn}
            onTouchTap={() => this.deleteCurrentPattern()}
          >
            Delete Current Pattern
          </div>

          <div
            className={styles.btn}
            onTouchTap={() => this.exitPattern()}
          >
            Exit Pattern
          </div>

          <div
            className={styles.btn}
            onTouchTap={() => this.updateChain()}
          >
            Update Chain
          </div>
          <div
            className={styles.btn}
            onTouchTap={() => this.deleteCurrentChainElement()}
          >
            Delete Current Chain Element
          </div>
          <div
            className={styles.btn}
            onTouchTap={() => this.playChain()}
          >
            Play Chain
          </div>
          <div
            className={styles.btn}
            onTouchTap={() => this.exitChain()}
          >
            Exit Chain
          </div>

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
