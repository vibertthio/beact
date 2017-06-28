import React, { Component } from 'react';
import { WindowResizeListener } from 'react-window-resize-listener';
import _ from 'lodash';
import uuid4 from 'uuid/v4';
import axios from 'axios';
import key from 'keymaster';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import NavigationRefreshIcon from 'material-ui/svg-icons/navigation/refresh';
// import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';
import AVShuffleIcon from 'material-ui/svg-icons/av/shuffle';

import styles from '../assets/styles/DrumMachine.css';
import Matrix from './Matrix';
import { Sequencer, Keyboard } from '../utils/Audio';
import Animation, {
	animationKey2IndexMapping,
} from '../utils/Animation';
import menu1 from '../assets/svg/menu/menu1.svg';
import menu2 from '../assets/svg/menu/menu2.svg';
import menu3 from '../assets/svg/menu/menu3.svg';
import menu4 from '../assets/svg/menu/menu4.svg';
import menu5 from '../assets/svg/menu/menu5.svg';
import menu6 from '../assets/svg/menu/menu6.svg';
import menu7 from '../assets/svg/menu/menu7.svg';
import menu8 from '../assets/svg/menu/menu8.svg';
import menu9 from '../assets/svg/menu/menu9.svg';
import menu10 from '../assets/svg/menu/menu10.svg';
import menu11 from '../assets/svg/menu/menu11.svg';

let fadeoutID;
let keys = '';
_.range(26).forEach((i) => {
	keys = keys.concat(String.fromCharCode(97 + i));
	if (i < 25) { keys = keys.concat(', '); }
});
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
      patternLists: [],
      patternTitle: '',
      currentPatternId: '',
      drumNoteChain: [],
      currentChainElement: '',
      currentPlayingChainElement: 0,
      drumRecords: [],
      keyRecords: [],
      recordTitle: '',
      currentPlayingRecord: [],
      currentPlayingRecordElement: 0,
      keyStartTimeCorrection: 0,
			hidden: false,
			wait: true,
			idle: false,
    };

    this.setCurrentBeat = this.setCurrentBeat.bind(this);
    this.recordSequencer = this.recordSequencer.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.handleRecordTitleChange = this.handleRecordTitleChange.bind(this);
    this.storeDrumRecord = this.storeDrumRecord.bind(this);
    this.storeKeyRecord = this.storeKeyRecord.bind(this);
    this.playRecord = this.playRecord.bind(this);
    this.playNextRecordElement = this.playNextRecordElement.bind(this);
    this.exitPlayRecord = this.exitPlayRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);

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

    this.playNextChainElement = this.playNextChainElement.bind(this);
    this.playChain = this.playChain.bind(this);
    this.exitChain = this.exitChain.bind(this);

    this.playDrumAni = this.playDrumAni.bind(this);

    this.detectKeyboard = this.detectKeyboard.bind(this);

    this.sequencer = new Sequencer(
      this.state.data,
      this.setCurrentBeat,
      this.playNextChainElement,
      this.storeDrumRecord,
      this.playNextRecordElement,
      this.playDrumAni,
    );

    this.keyboard = new Keyboard(this.storeKeyRecord);

    this.toggleHidden = this.toggleHidden.bind(this);
		this.hideSpinner = this.hideSpinner.bind(this);
		this.showDOM = this.showDOM.bind(this);
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    this.detectKeyboard();
    // this.ani = new Animation();
    this.ani = Animation();
    axios.get('/api/patterns')
      .then((res) => {
        this.setState({ patternLists: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get('/api/notes')
      .then((res) => {
        this.setState({ drumRecords: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get('/api/keys')
      .then((res) => {
        this.setState({ keyRecords: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
		/**
	   * hide loading spinner and wait 3.5s after DOM is loaded.
	   */
	  const outShowDOM = this.hideSpinner;
		/**
	   * [startTimer description]
	   */
		function startTimer() {
			fadeoutID = window.setTimeout(outShowDOM, 3500);
		}
		startTimer();
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
   * [setCurrentChainAtLast description]
   */
  setCurrentChainElementAtLast() {
    this.sequencer.isPlayingChain = false;
    this.sequencer.isPlayingRecord = false;
    this.setState({ currentChainElement: '' });
  }

  /**
  * @param  {String} id width of window
   * [setCurrentChainAtHere description]
   */
  setCurrentChainElementAtHere(id) {
    this.sequencer.isPlayingChain = false;
    this.sequencer.isPlayingRecord = false;
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
   * [showDOM description]
   */
	showDOM() {
		const rootDiv = document.getElementById('root');
		rootDiv.classList.add('fullHeight');
		this.setState({ wait: false });
	}

  /**
   * [hideSpinner description]
   */
	hideSpinner() {
		const spinner = document.getElementById('spinner');
		spinner.classList.add('loaded');
 		const loadingTitle = document.getElementById('loadingTitle');
 		loadingTitle.classList.add('loaded');
 		window.clearTimeout(fadeoutID);
		fadeoutID = window.setTimeout(this.showDOM, 1500);
 	}

	/**
   * [clearClicked description]
   * @param  {number} i first index
   * @param  {number} j second index
   */
	clearClicked() {
		const data = this.state.data;
		let i;
		let j;
		for (i = 0; i < 16; i += 1) {
			for (j = 0; j < 8; j += 1) {
				data[i][j] = 0;
			}
		}
		this.setState({
			data,
		});
	}

  /**
   * [clearClicked description]
   * @param  {number} i first index
   * @param  {number} j second index
   */
	randomClicked() {
		const data = this.state.data;
		let i;
		let j;
		for (i = 0; i < 16; i += 1) {
			for (j = 0; j < 8; j += 1) {
				data[i][j] = (Math.random() > 0.8) ? 1 : 0;
			}
		}
		this.setState({
			data,
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
    this.ani.trigger(21);
    this.sequencer.start();
    this.setState({
      playing: true,
    });
    if (this.sequencer.recording === true) {
      this.keyboard.startRecording();
    }
  }

  /**
   * [stopSequencer description]
   */
  stopSequencer() {
    if (this.sequencer.recording !== true) {
      this.sequencer.stop();
      this.setState({
        playing: false,
        currentBeat: 0,
      });
    }
  }

  /**
   * [recordSequencer description]
   */
  recordSequencer() {
    if (this.state.recordTitle === '') {
      console.log('Please give your record a title');
    } else if (this.sequencer.recording === true) {
      this.sequencer.stopRecording();
      this.keyboard.stopRecording();
      this.setState({
        playing: false,
        currentBeat: 0,
        recordTitle: '',
      });
      this.saveRecord();
      console.log('stopRecording');
    } else {
      // countDown 3 seconds
      console.log('startRecording');
      this.sequencer.startRecording();
      if (this.state.playing === true) {
        this.keyboard.startRecording();
      }
    }
  }

  /**
  * @param  {object} event width of window
   * [playPattern description]
   */
  handleRecordTitleChange(event) {
    this.setState({ recordTitle: event.target.value });
  }

  /**
   * [saveRecord description]
   */
  saveRecord() {
    // add title as a paramater (feature)
    this.sequencer.saveRecord(this.keyboard.saveRecord,
       this.keyboard.storeRecord,
      this.state.recordTitle);
  }

  /**
  * @param  {Array} records width of window
   * [storeDrumRecord description]
   */
  storeDrumRecord(records) {
    this.setState({ drumRecords: records });
  }

  /**
  * @param  {Array} records width of window
   * [storeKeyRecord description]
   */
  storeKeyRecord(records) {
    this.setState({ keyRecords: records });
  }

  /**
  * @param  {Array} record width of window
   * [playRecord description]
   */
  playRecord(record) {
    this.sequencer.isPlayingChain = false;
    this.sequencer.isPlayingRecord = true;
    this.keyboard.isPlayingRecord = true;
    this.stopSequencer();
    this.exitPattern();
    const data = this.state.data;
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = record.content[0][i][j];
      }
    }
    this.setState({ data,
      currentPlayingRecord: record.content,
      currentPlayingRecordElement: 0,
      keyStartTimeCorrection: record.startTime });
    for (let i = 0; i < this.state.keyRecords.length; i += 1) {
      if (this.state.keyRecords[i].id === record.id) {
        this.startSequencer();
        this.keyboard.playRecord(this.state.keyRecords[i], this.ani.trigger);
      }
    }
  }

  /**
   * [exitPlayRecord description]
   */
  exitPlayRecord() {
    if (this.sequencer.isPlayingRecord === true) {
      this.sequencer.isPlayingRecord = false;
      this.keyboard.isPlayingRecord = false;
      const data = this.state.data;
      for (let i = 0; i < 16; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          data[i][j] = 0;
        }
      }
      this.setState({ data, currentPlayingRecord: [], currentPlayingRecordElement: 0 });
      this.keyboard.clearSchedule();
      this.stopSequencer();
    }
  }

  /**
  * @param  {Number} recordId width of window
   * [deleteRecord description]
   */
  deleteRecord(recordId) {
    axios.delete(`/api/notes/${recordId}`)
     .then(
       axios.get('/api/notes')
         .then((res) => {
           this.setState({ drumRecords: res.data });
         })
         .catch((err) => {
           console.log(err);
         }),
     )
     .catch((err) => {
       console.log(err);
     });
     axios.delete(`/api/keys/${recordId}`)
      .then(
        axios.get('/api/keys')
          .then((res) => {
            this.setState({ keyRecords: res.data });
          })
          .catch((err) => {
            console.log(err);
          }),
      )
      .catch((err) => {
        console.log(err);
      });
    console.log(recordId);
  }

  /**
   * [playNextRecordElement description]
   */
  playNextRecordElement() {
    const data = this.state.data;
    let stopDrum = false;
    let num = this.state.currentPlayingRecordElement;
    num += 1;
    // we can configure it to no replay mode
    if (num === this.state.currentPlayingRecord.length) {
      num = 0;
      stopDrum = true;
      this.exitPlayRecord();
    }
    if (stopDrum === false) {
      for (let i = 0; i < 16; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          data[i][j] = this.state.currentPlayingRecord[num][i][j];
        }
      }
    }
    this.setState({ currentPlayingRecordElement: num, data });
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
        id: uuid4(),
      })
        .then(
          axios.get('/api/patterns')
            .then((res) => {
              this.setState({ patternLists: res.data });
            })
            .catch((err) => {
              console.log(err);
            }),
        )
        .catch(err => console.log(err));
      this.setState({ patternTitle: '' });
    } else {
      console.log('Please give your pattern a name!');
    }
  }

  /**
  * @param  {object} pattern width of window
   * [playPattern description]
   */
  playPattern(pattern) {
    this.sequencer.isPlayingRecord = false;
    this.sequencer.isPlayingChain = false;
    this.stopSequencer();
    const data = this.state.data;
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = pattern.content[i][j];
      }
    }
    this.setState({
      data,
      currentPatternId: pattern.id, // eslint-disable-line no-underscore-dangle
    });
    this.startSequencer();
  }

  /**
   * [editPattern description]
   */
  editPattern() {
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
    if (this.state.currentPatternId !== '') {
      const data = this.state.data;
      for (let i = 0; i < 16; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          data[i][j] = 0;
        }
      }
      this.setState({ currentPatternId: '', data });
      this.stopSequencer();
    }
  }

  /**
   * [deleteCurrentPattern description]
   */
  deleteCurrentPattern() {
    if (this.state.currentPatternId !== '') {
      axios.delete(`/api/patterns/${this.state.currentPatternId}`)
       .then(
         axios.get('/api/patterns')
           .then((res) => {
             this.setState({ patternLists: res.data });
           })
           .catch((err) => {
             console.log(err);
           }),
       )
       .catch((err) => {
         console.log(err);
       });
      this.exitPattern();
      this.stopSequencer();
    }
  }

  /**
  * @param  {Number} id width of window
   * [deletePattern description]
   */
  deletePattern(id) {
    if (id === this.state.currentPatternId) {
      this.deleteCurrentPattern();
    } else {
      axios.delete(`/api/patterns/${id}`)
       .then(
         axios.get('/api/patterns')
           .then((res) => {
             this.setState({ patternLists: res.data });
           })
           .catch((err) => {
             console.log(err);
           }),
       )
       .catch((err) => {
         console.log(err);
       });
    }
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
    if (this.state.currentChainElement !== '') {
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
      this.stopSequencer();
      this.exitPattern();
    }
  }

  /**
   * [playChain description]
   */
  playChain() {
    if (this.state.drumNoteChain.length > 0) {
      this.sequencer.isPlayingRecord = false;
      this.sequencer.isPlayingChain = true;
      this.stopSequencer();
      this.exitPattern();
      const data = this.state.data;
      for (let i = 0; i < 16; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          data[i][j] = this.state.drumNoteChain[0].data[i][j];
        }
      }
      this.setState({ data });
      this.startSequencer();
    }
  }

  /**
   * [exitChain description]
   */
  exitChain() {
    if (this.sequencer.isPlayingChain === true) {
      this.sequencer.isPlayingChain = false;
      const data = this.state.data;
      for (let i = 0; i < 16; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          data[i][j] = 0;
        }
      }
      this.stopSequencer();
      this.setState({ currentPlayingChainElement: 0, data, currentChainElement: '' });
    }
  }

  /**
   * [playNextChainElement description]
   */
  playNextChainElement() {
    let num = this.state.currentPlayingChainElement;
    num += 1;
    // we can configure it to no replay mode
    if (num === this.state.drumNoteChain.length) {
      num = 0;
    }
    const data = this.state.data;
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        data[i][j] = this.state.drumNoteChain[num].data[i][j];
      }
    }
    this.setState({ currentPlayingChainElement: num, data });
  }

  /**
   * @param  {Array} column width of window
   * [playDrumAni description]
   */
  playDrumAni(column) {
    for (let i = 0; i < column.length; i += 1) {
      this.ani.trigger(column[i]);
    }
  }

  /**
   * [detectKeyboard description]
   */
  detectKeyboard() {
    key(keys, (e, h) => {
			const index = animationKey2IndexMapping[h.shortcut];
      this.ani.trigger(index);
			this.keyboard.currentKey = index;
			this.keyboard.playKey();
    });

		// start / stop
		key('space', () => {
			if (!this.state.playing) {
				this.startSequencer();
			} else {
				this.stopSequencer();
			}
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
      <div key={uuid4()}>
        <li
          key={pattern.id}
          onTouchTap={() => this.playPattern(pattern)}
          style={{ color: 'white' }}
        >
          <h4>{pattern.title}</h4>
        </li>
        <h4 onClick={() => this.deletePattern(pattern.id)}>
          X
        </h4>
      </div>

    ));
  }

  /**
   * [renderRecords description]
   * @return {Element}
   */
  renderRecords() {
    return _.map(this.state.drumRecords, drumRecord => (
      <div key={uuid4()}>
        <li
          key={drumRecord.id}
          onTouchTap={() => this.playRecord(drumRecord)}
          style={{ color: 'black' }}
        >
          <h4>{drumRecord.title}{drumRecord.content.length}</h4>
        </li>
        <h4 onClick={() => this.deleteRecord(drumRecord.id)}>
          X
        </h4>
      </div>
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
		const { hidden, wait } = this.state;
    return (
      <div className={(wait === true) ? styles.hideDOM : styles.showDOM}>
        <NavigationMenuIcon
          className={
						`${styles.icon}
						 ${styles.menuIcon}
						 ${(hidden === true) ? '' : styles.displayHide}`
					}
          onClick={() => this.toggleHidden()}
          style={{ color: '#eecdcc' }}
        />
        <NavigationRefreshIcon
          className={
						`${styles.icon}
						 ${styles.clearIcon}
						 ${(hidden === true) ? '' : styles.displayHide}`
					}
          onClick={() => this.clearClicked()}
          style={{ color: '#eecdcc' }}
        />
        <AVShuffleIcon
          className={
						`${styles.icon}
						 ${styles.randomIcon}
						 ${(hidden === true) ? '' : styles.displayHide}`
					}
          onClick={() => this.randomClicked()}
          style={{ color: '#eecdcc' }}
        />

        {/* sidebar menu (only css) */}

        <div
          className={
					`${styles.menu}
					 ${(hidden === true) ? styles.toggleRevMenu : styles.toggleMenu}`
				  }
        >
          <div className={styles.colorMenu}>
            {/* 1 */}
            <div className={`${styles.row1} ${styles.row}`}>
              <button
                className={styles.row1l}
                onClick={() => console.log('Start Button clicked')}
                onTouchTap={() => this.startSequencer()}
              >
                {/* <div className={styles.row1l}> */}
                <img src={menu1} alt="Start Button" />
                {/* </div> */}
              </button>

              <button
                className={styles.row1r}
                onClick={() => console.log('Stop Button clicked')}
                onTouchTap={() => this.stopSequencer()}
              >
                <img src={menu2} alt="Stop Button" />
              </button>
            </div>
            {/* 2 */}
            <div className={`${styles.evenrow} ${styles.row}`}>
              <img src={menu3} alt="Patten Icon" />
            </div>
            {/* 3 */}
            <div className={`${styles.row3} ${styles.row}`}>
              <div className={styles.row3l}>
                <button
                  className={styles.row3lu}
                  onClick={() => console.log('Save New Pattern clicked')}
                  onTouchTap={() => this.savePattern()}
                >
                  <img src={menu4} alt="Save New Pattern" />
                </button>
                <button
                  className={styles.row3ld}
                  onClick={() => console.log('Exit Pattern clicked')}
                  onTouchTap={() => this.exitPattern()}
                >
                  <img src={menu5} alt="Exit Pattern" />
                </button>
              </div>
              <div className={styles.row3r}>
                <div className={styles.row3ru}>
                  <input
                    type="text"
                    className={styles.row3input}
                    value={this.state.patternTitle}
                    onChange={this.handleTitleChange}
                    placeholder="input pattern name..."
                  />
                </div>
                <div className={styles.row3rd}>
                  <ul>
                    {this.renderPatterns()}
                    {/* alt Delete Pattern Icon */}
                    <li>raggae</li>
                    <li>jazz hip-hop</li>
                    <li>nice ass</li>
                    <li>vibert</li>
                    <li>undone</li>
                    <li>rock pattern</li>
                    <li>rock pattern</li>
                    <li>rock pattern</li>
                    <li>rock pattern</li>
                    <li>rock pattern</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 4 */}
            <div className={`${styles.evenrow} ${styles.row}`}>
              <img className={styles.chain} src={menu6} alt="Chain Icon" />
            </div>
            {/* 5 */}
            <div className={`${styles.row5} ${styles.row}`}>
              <div className={styles.row5l}>
                <div className={styles.row5lu}>
                  <button
                    className={styles.row5lul}
                    onClick={() => console.log('Play Chain Button clicked')}
                    onTouchTap={() => this.playChain()}
                  >
                    <img src={menu7} alt="Play Chain Button" />
                  </button>
                  <button
                    className={styles.row5lur}
                    onClick={() => console.log('Update Chain Button clicked')}
                    onTouchTap={() => this.updateChain()}
                  >
                    <img src={menu8} alt="Update Chain Button" />
                  </button>
                </div>
                <div className={styles.row5ld}>
                  <button
                    className={styles.row5ldl}
                    onClick={() => console.log('Delete Current Chain Element Button clicked')}
                    onTouchTap={() => this.deleteCurrentChainElement()}
                  >
                    <img src={menu5} alt="Delete Current Chain Element Button" />
                  </button>
                  <button
                    className={styles.row5ldr}
                    onClick={() => console.log('Exit Chain Button Chain clicked')}
                    onTouchTap={() => this.exitChain()}
                  >
                    <img src={menu9} alt="Exit Chain Button Chain Index" />
                  </button>
                </div>
              </div>
              <div className={styles.row5r}>
                <span className={styles.chainIndex}>2</span>
                <span className={styles.chainDivider}>/</span>
                <span className={styles.chainLength}>4</span>
              </div>
            </div>
            {/* 6 */}
            <div className={`${styles.evenrow} ${styles.row}`}>
              <img src={menu10} alt="Record Icon" />
            </div>
            {/* 7 */}
            <div className={`${styles.row7} ${styles.row}`}>
              <div className={styles.row7l}>
                <div className={styles.row7lu}>
                  <button
                    className={styles.row7lul}
                    onClick={() => console.log('Record Button clicked')}
                    onTouchTap={() => this.recordSequencer()}
                  >
                    <img src={menu11} alt="Record Button" />
                  </button>
                  <button className={styles.row7lur} onClick={() => console.log('Save Button clicked')}>
                    <img src={menu2} alt="Save Button" />
                  </button>
                </div>
                <div className={styles.row7ld}>
                  <button className={styles.row7ldl} onClick={() => console.log('Clear Current Record Button clicked')}>
                    <img src={menu5} alt="Clear Current Record Button" />
                  </button>
                  <button
                    className={styles.row7ldr}
                    onClick={() => console.log('Exit Playing Record Button clicked')}
                    onTouchTap={() => this.exitPlayRecord()}
                  >
                    <img src={menu9} alt="Exit Playing Record Button" />
                  </button>
                </div>
              </div>
              <div className={styles.row10r}>
                <input
                  type="text"
                  className={styles.row3input}
                  value={this.state.recordTitle}
                  onChange={this.handleRecordTitleChange}
                  placeholder="input record name..."
                />
                <ul>
                  {/* alt Delete Pattern Icon */}
                  {this.renderRecords()}
                  <li>raggae</li>
                  <li>vibert</li>
                  <li>joey</li>
                  <li>scya</li>
                  <li>ric</li>
                  <li>...</li>
                  <li>...</li>
                  <li>...</li>
                </ul>
              </div>
            </div>
            {/* 8 */}
            <div className={`${styles.evenrow} ${styles.row}`}>
              <span>User Guide</span>
            </div>
            {/* 9 */}
            <div className={`${styles.row9} ${styles.row}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</div>
          </div>
        </div>

        {/* <div
          className={
					`${styles.menu}
					 ${(hidden === true) ? styles.toggleRevMenu : styles.toggleMenu}`
				  }
        >
          <NavigationCloseIcon
            className={styles.closeIcon}
            onClick={() => this.toggleHidden()}
          />
          <div className={styles.patternList}>
						renderPatterns in this div
            <ul>
              {this.renderPatterns()}
            </ul>
          </div>
          <div className={styles.chainList}>
						renderChain in this div
            <ul>{this.renderChain()}
              <li
                style={{ color: 'yellow' }}
                onTouchTap={() => this.setCurrentChainElementAtLast()}>
		            Update at here in this li
		          </li>
		        </ul>
          </div>
          <div className={styles.patternList}>
            renderRecords in this div
            <ul>
              {this.renderRecords()}
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
              onTouchTap={() => this.exitPlayRecord()}
            >
              Exit Playing Record
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
          <hr />
          <div>
            <br />
            <br />
						user guide
          </div>
        </div> */}
        <button
          className={
						`${styles.mask}
						 ${(hidden === false ? styles.showMask : styles.hideMask)}`}
          onClick={() => this.toggleHidden()}
        >
          <button className={styles.btn} onClick={() => console.log('update pattern')} onTouchTap={() => this.editPattern()}>
						Update Pattern
					</button>
          <button className={styles.btn} onClick={() => console.log('delete current pattern')} onTouchTap={() => this.deleteCurrentPattern()}>
						Delete Current Pattern
					</button>
          <div className={styles.chainList}>
						renderChain in this div
						<ul>{this.renderChain()}<li style={{ color: 'yellow' }} onTouchTap={() => this.setCurrentChainElementAtLast()}>
								Update at here in this li
							</li>
						</ul>
          </div>
        </button>
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
        <div>
          <input
            type="text" id="one"
            onKeyPress={this.detectKeyboard}
          />
        </div>
      </div>
    );
  }

}

export default DrumMachine;
