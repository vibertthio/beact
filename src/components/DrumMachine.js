import React, { Component } from 'react';
import { WindowResizeListener } from 'react-window-resize-listener';
import uuid4 from 'uuid/v4';
import axios from 'axios';
import key from 'keymaster';

import styles from '../styles/DrumMachine.css';
import Matrix from './Matrix';
import { Sequencer, Keyboard, changeBPM, presets } from '../utils/Audio';
import Animation, { animationKey2IndexMapping } from '../utils/Animation';
import menu1 from '../assets/images/menu/menu1.svg';
import menu2 from '../assets/images/menu/menu2.svg';
import menu3 from '../assets/images/menu/menu3.svg';
import menu4 from '../assets/images/menu/menu4.svg';
import menu5 from '../assets/images/menu/menu5.svg';
import menu6 from '../assets/images/menu/menu6.svg';
import menu7 from '../assets/images/menu/menu7.svg';
import menu8 from '../assets/images/menu/menu8.svg';
import menu9 from '../assets/images/menu/menu9.svg';
import menu10 from '../assets/images/menu/menu10.svg';
import menu11 from '../assets/images/menu/menu11.svg';
import menuLogo from '../assets/images/logo.png';
import mi1 from '../assets/images/material-icon/ic_menu_white_24dp_2x.png';
import mi2 from '../assets/images/material-icon/ic_close_white_24dp_2x.png';
import mi3 from '../assets/images/material-icon/ic_pause_white_24dp_2x.png';
import mi4 from '../assets/images/material-icon/ic_play_arrow_white_24dp_2x.png';
import mi5 from '../assets/images/material-icon/ic_refresh_white_24dp_2x.png';
import mi6 from '../assets/images/material-icon/ic_shuffle_white_24dp_2x.png';

let fadeoutID;
let logoID;
let keys = '';
keys = new Array(26);
for (let i = 0; i < 26; i += 1) {
	keys[i] = String.fromCharCode(97 + i);
}
keys = keys.join(', ');

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
        // data[i][j] = (Math.random() > 0.15) ? 0 : 1;
        data[i][j] = 0;
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
	  	currentChainElementIndex: 0,
      currentPlayingChainElement: 0,
      drumRecords: [],
      keyRecords: [],
      recordTitle: '',
      currentPlayingRecord: [],
      currentPlayingRecordElement: 0,
      keyStartTimeCorrection: 0,
	    hidden: true,
	    wait: true,
	    idle: false,
	    currentSample: 'A',
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
		this.setCurrentChainElementIndex = this.setCurrentChainElementIndex.bind(this);
    this.deleteCurrentChainElement = this.deleteCurrentChainElement.bind(this);

    this.playNextChainElement = this.playNextChainElement.bind(this);
    this.playChain = this.playChain.bind(this);
    this.exitChain = this.exitChain.bind(this);

    this.playDrumAni = this.playDrumAni.bind(this);

    this.detectKeyboard = this.detectKeyboard.bind(this);
		this.setSample = this.setSample.bind(this);

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
		// this.showLogo = this.showLogo.bind(this);
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    this.detectKeyboard();
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
    // const outShowLogo = this.showLogo;
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
   * [setCurrentChainElementIndex description]
   * @param  {number} id for currentChainElementIndex
   */
  setCurrentChainElementIndex(id) {
		for (let i = 0; i < this.state.drumNoteChain.length; i += 1) {
			if (id === this.state.drumNoteChain[i].id) {
				this.setState({ currentChainElementIndex: i });
				return;
			}
		}
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
		this.setCurrentChainElementIndex(id);
  }

  /**
  * @param  {String} sample width of window
   * [deleteRecord description]
   */
  setSample(sample) {
    this.sequencer.currentSample = sample;
    this.setState({ currentSample: sample });
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
		for (let i = 0; i < 16; i += 1) {
			for (let j = 0; j < 8; j += 1) {
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
		this.setState({ hidden: true });
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
        this.keyboard.playRecord(this.state.keyRecords[i], this.ani.triggerKeyAnimation);
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
		this.setState({ hidden: false });
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
    } else {
      axios.put(`/api/patterns/${this.state.currentPatternId}`, {
        content: this.state.data,
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
    }
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
      this.setState({ drumNoteChain, currentChainElement: '', currentChainElementIndex: 0 });
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
      this.setState({ data, currentPlayingChainElement: 0 });
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
      // this.ani.triggerSequencerAnimation(
			// 	animationDrum2IndexMapping[0][column[i]],
			// );
      this.ani.triggerSequencerAnimation(column[i]);
    }
  }

  /**
   * [detectKeyboard description]
   */
  detectKeyboard() {
    key(keys, (e, h) => {
			const index = animationKey2IndexMapping[h.shortcut];
      this.ani.triggerKeyAnimation(index);
			const char = (h.shortcut.charCodeAt(0) - 97).toString();
			this.keyboard.currentKey = char;
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

		// speed
		key('up', () => {
			changeBPM(10);
		});
		key('down', () => {
			changeBPM(-10);
		});

		// change sound bank
		key('right', () => {
			this.sequencer.changeSampleSet(true);
		});
		key('left', () => {
			this.sequencer.changeSampleSet(false);
		});
		key('up', () => {
			this.keyboard.changeSampleSet(true);
		});
		key('down', () => {
			this.keyboard.changeSampleSet(false);
		});

		// change sequencer animation bank
		key('shift+right', () => {
			this.ani.changeSequencerAnimations(true);
		});
		key('shift+left', () => {
			this.ani.changeSequencerAnimations(false);
		});

		// change key animation bank
		key('shift+up', () => {
			this.ani.changeKeyAnimations(true);
		});
		key('shift+down', () => {
			this.ani.changeKeyAnimations(false);
		});

		// loading presets
		key('1, 2, 3, 4, 5, 6, 7, 8', (e, h) => {
			const index = h.shortcut.charCodeAt(0) - 49;
			const data = this.state.data;
			for (let i = 0; i < 16; i += 1) {
				for (let j = 0; j < 8; j += 1) {
					data[i][j] = presets[index][i][j];
				}
			}
			this.setState({
				data,
			});
		});
  }

  /**
   * [hideSpinner description]
   */
	hideSpinner() {
		const spinner = document.getElementById('spinner');
		spinner.classList.add('loaded');
 		const loadingTitle = document.getElementById('loadingTitle');
 		loadingTitle.classList.add('loaded');
		const logo = document.getElementById('beactLogo');
		logo.classList.add('showLogo');
		const showLogo = () => {
			const beactLogo = document.getElementById('beactLogo');
			beactLogo.classList.remove('showLogo');
			window.clearTimeout(logoID);
		};
		logoID = window.setTimeout(showLogo, 2000);
 		window.clearTimeout(fadeoutID);
		fadeoutID = window.setTimeout(this.showDOM, 3000);
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
		const { patternLists } = this.state;
    return patternLists.map(pattern => (
      <div className={styles.renderedLi} key={pattern.id}>
        <button className={styles.renderedLiTitle} onTouchTap={() => this.playPattern(pattern)}>
          <span className={styles.listText}>{pattern.title}</span>
        </button>
        <button className={styles.renderedListX} onTouchTap={() => this.deletePattern(pattern.id)}>
          <span className={styles.listXBtn}>X</span>
        </button>
      </div>));
  }

  /**
   * [renderRecords description]
   * @return {Element}
   */
  renderRecords() {
		const { drumRecords } = this.state;
    return drumRecords.map(drumRecord => (
      <div className={styles.renderedLi} key={drumRecord.id}>
        <button className={styles.renderedLiTitle} onTouchTap={() => this.playRecord(drumRecord)}>
          <span className={styles.listText}>{drumRecord.title}</span>
        </button>
        <button
          className={styles.renderedListX} onTouchTap={() => this.deleteRecord(drumRecord.id)}
        >
          <span className={styles.listXBtn}>X</span>
        </button>
      </div>));
  }

  /**
   * [renderChain description]
   * @return {Element}
   */
  renderChain() {
		const { drumNoteChain, currentPlayingChainElement,
			currentChainElement, currentChainElementIndex } = this.state;
    return drumNoteChain.map((chainElement, i) => (
      <div
        key={chainElement.id}
        className={styles.chainLi}
        style={{ color: '#d8b98a' }}
        onTouchTap={() => this.setCurrentChainElementAtHere(chainElement.id)}
      >
        <div
          className={
           `${styles.chainItem}
            ${(i === currentPlayingChainElement) ? styles.currentPlayingItem : ''}`
          }
        >
          <span className={styles.chainIndex}>{i + 1}{(currentChainElement !== '' && currentChainElementIndex === i) ? 'V' : ''}</span>
        </div>
      </div>
    ));
  }

  /**
   * [render description]
   * @return {Element}
   */
  render() {
		const { hidden, wait, playing } = this.state;
    return (
      <div className={(wait === true) ? styles.hideDOM : styles.showDOM}>
        {(this.sequencer.isPlayingRecord === false)
          ? <button
            className={`${styles.icon} ${styles.menuIcon} ${(hidden === true) ? '' : styles.displayHide}`}
            onTouchTap={() => this.toggleHidden()}
          >
            <img src={mi1} alt="menu" />
          </button> : <button
            className={`${styles.icon} ${styles.menuIcon}`}
            onClick={() => console.log('Exit Playing Record Button clicked')}
            onTouchTap={() => this.exitPlayRecord()}
          >
            <img src={mi2} alt="close" />
          </button>}
        {(playing)
          ? <button
            className={`${styles.icon} ${styles.toggleIcon} ${(hidden === true) ? '' : styles.displayHide}`}
            onTouchTap={() => this.stopSequencer()}
          >
            <img src={mi3} alt="pause" />
          </button> : <button
            className={`${styles.icon} ${styles.toggleIcon} ${(hidden === true) ? '' : styles.displayHide}`}
            onTouchTap={() => this.startSequencer()}
          >
            <img src={mi4} alt="play" />
          </button>}
        <button
          className={
					`${styles.icon}
					 ${styles.clearIcon}
					 ${(hidden === true) ? '' : styles.displayHide}`
				  }
          onTouchTap={() => this.clearClicked()}
        >
          <img src={mi5} alt="refresh" />
        </button>
        <button
          className={
						`${styles.icon}
						 ${styles.randomIcon}
						 ${(hidden === true) ? '' : styles.displayHide}`
					}
          onTouchTap={() => this.randomClicked()}
          style={{ color: '#eecdcc' }}
        >
          <img src={mi6} alt="shuffle" />
        </button>
        <div
          className={
					`${styles.menu}
					 ${(hidden === true) ? styles.toggleRevMenu : styles.toggleMenu}`
				  }
        >
          <div className={styles.colorMenu}>
            {/* 1 */}
            <div className={`${styles.row1} ${styles.row}`}>
              {(this.sequencer.recording === true)
                ? <div>
                  recording...
                </div> : <div className={styles.row1BtnWrap}>
                  <button
                    className={styles.row1l}
                    onClick={() => console.log('Start Button clicked')}
                    onTouchTap={() => this.startSequencer()}
                  >
                    <img src={menu1} alt="Start Button" />
                  </button>
                  <button
                    className={styles.row1r}
                    onClick={() => console.log('Stop Button clicked')}
                    onTouchTap={() => this.stopSequencer()}
                  >
                    <img src={menu2} alt="Stop Button" />
                  </button>
                </div>}
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
                  <img src={menu9} alt="Exit Pattern" />
                </button>
              </div>
              <div className={styles.row3m}>
                <button
                  className={styles.row3mBtn}
                  onClick={() => console.log('update pattern')}
                  onTouchTap={() => this.editPattern()}
                >
                  <img src={menu8} alt="Update Pattern" />
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
                  {this.renderPatterns()}
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
                    <img src={menu1} alt="Play Chain Button" />
                  </button>
                  <button
                    className={styles.row5lur}
                    onClick={() => console.log('Update Chain Button clicked')}
                    onTouchTap={() => this.updateChain()}
                  >
                    <img src={menu7} alt="Update Chain Button" />
                  </button>
                </div>
                <div className={styles.row5ld}>
                  <button
                    className={styles.row5ldl}
                    onClick={() => console.log('Exit Chain Button Chain clicked')}
                    onTouchTap={() => this.exitChain()}
                  >
                    <img src={menu9} alt="Exit Chain Button Chain Index" />
                  </button>
                  <button
                    className={styles.row5ldr}
                    onClick={() => console.log('Delete Current Chain Element Button clicked')}
                    onTouchTap={() => this.deleteCurrentChainElement()}
                  >
                    <img src={menu5} alt="Delete Current Chain Element Button" />
                  </button>
                </div>
              </div>
              <div className={styles.row5r}>
                {(this.state.drumNoteChain.length === 0)
                  ? <div>HEAD</div>
                  : this.renderChain()}
                <div
                  className={styles.chainLi}
                  style={{ color: '#d8b98a' }}
                  onTouchTap={() => this.setCurrentChainElementAtLast()}
                >
    								+
    							</div>
              </div>
            </div>
            {/* 6 */}
            <div className={`${styles.evenrow} ${styles.row}`}>
              <img src={menu10} alt="Record Icon" />
            </div>
            {/* 7 */}
            <div className={`${styles.row7} ${styles.row}`}>
              <div className={styles.row7l}>
                <button
                  className={
                    `${styles.row7lbtn}
                     ${(this.sequencer.recording === true) ? styles.recordingBtn : ''}`}
                  onClick={() => console.log('Record Button clicked')}
                  onTouchTap={() => this.recordSequencer()}
                >
                  <img src={menu11} alt="Record Button" />
                </button>
              </div>
              <div
                className={
                `${styles.row3r}
                 ${(this.sequencer.recording === true) ? styles.displayHide : ''}`}
              >
                <div className={styles.row3ru}>
                  <input
                    type="text"
                    className={styles.row3input}
                    value={this.state.recordTitle}
                    onChange={this.handleRecordTitleChange}
                    placeholder="input record name..."
                  />
                </div>
                <div className={styles.row3rd}>
                  {this.renderRecords()}
                </div>
              </div>
            </div>
            {/* 8 */}
            <div className={`${styles.evenrow} ${styles.row}`}>
              <span>Beact</span>
            </div>
            {/* 9 */}
            <div className={`${styles.row9} ${styles.row}`}>
              <span>by Vibert, Joey, Scya, 2017</span>
            </div>
          </div>
        </div>

        <button
          className={
						`${styles.mask}
						 ${(hidden === false ? styles.showMask : styles.hideMask)}`}
          onClick={() => this.toggleHidden()}
        >
          <img src={menuLogo} alt="BEACT" className={styles.menuLogo} />
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
