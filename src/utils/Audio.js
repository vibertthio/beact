import { Sequence, Transport, Players, now } from 'tone';
import axios from 'axios';
import uuid4 from 'uuid/v4';
import { keysUrls, keysNotes } from './config/keys.config';
import { drumUrls, drumNotes, presets } from './config/drum.config';

let temperId = uuid4();

export class Sequencer {
  notes: Array<String>;
  samples: Object;
  loadingSamples: Boolean;
  sequence: Object;
  playing: Boolean;
  beat: Number;
  matrix: Array<Array<number>>;
  recording: Boolean;
  drumNoteChain: Array;
  isPlayingChain: Boolean;
  recordMatrix: Array;
  recordFull: Array;
  isPlayingRecord: Boolean;
  nowPlayingAni: Array;
  startTime: Number;

  constructor(
    matrix,
    setCurrentBeat,
    playNextChainElement,
    storeRecord,
    playNextRecordElement,
    playDrumAni,
  ) {
    this.matrix = matrix;
    this.number = 0;
    this.playing = true;
    this.notes = drumNotes; // [1, 2, 3, 4, 5, 6, 7, 8]
    this.isPlayingChain = false;
    this.recordMatrix = [];
    this.recordFull = [];
    this.isPlayingRecord = false;
    this.startTime = 0;
    this.currentSampleIndex = 0;
    this.storeRecord = record => storeRecord(record);
    this.loadSamples();
    this.checkStart = false;
    // this.nowPlayingAni = [];
    this.saveRecord = this.saveRecord.bind(this);
    this.sequence = new Sequence((time, col) => {
      this.beat = col;
      setCurrentBeat(this.beat);

      // 16 columns, each column: ex. [1, 0, 0, 0, 1, 1, 0, 1]
      const column = this.matrix[col];
      const nowPlayingAni = [];
      for (let i = 0; i < this.notes.length; i += 1) {
        if (col === 0 && i === 0 && this.checkStart === false && this.recording === true) {
          this.checkStart = true;
          this.startTime = now();
        }
        // make sure no play while loading
        if (column[i] === 1 && !this.loadingSamples) {
          const vel = (Math.random() * 0.5) + 0.5;
          // convert velocity(gain) to volume
          this.samples.volume.value = 10 * Math.log10(vel);
          // console.log('nowTime: ', now());
          // console.log('Transport.seconds: ', Transport.seconds);
          // console.log('time: ', time);
          // this.samples._players[this.notes[i]].start(time, 0, 0.5);
          this.samples._players[this.notes[i]].start(time);
          nowPlayingAni.push(i);
        }
      }
      playDrumAni(nowPlayingAni);

      if (this.recording === true) {
        if (this.recordMatrix.length < 16) {
          this.recordMatrix.push(column);
          if (this.recordMatrix.length === 16) {
            const recordMatrix = [
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
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0],
            ];
            for (let i = 0; i < 16; i += 1) {
              for (let j = 0; j < 8; j += 1) {
                recordMatrix[i][j] = this.recordMatrix[i][j];
              }
            }
            this.recordFull.push(recordMatrix);
            // console.log(`recordFull: ${this.recordFull}`);
            this.recordMatrix = [];
          }
        }
      }

      if (col === 15 && this.isPlayingChain === true) {
        playNextChainElement();
      }
      if (col === 15 && this.isPlayingRecord === true) {
        playNextRecordElement();
      }
    }, Array.from(Array(this.matrix.length).keys()), '16n');
    Transport.start();
  }

  static getBeat() {
    return this.beat;
  }

  isPlaying() {
    return this.playing;
  }

  start() {
    this.playing = true;
    this.sequence.start();
  }

  stop() {
    this.playing = false;
    // this.isPlayingRecord = false;
    this.sequence.stop();
  }

  startRecording() {
    this.recording = true;
  }

  stopRecording() {
    this.recording = false;
    this.stop();
  }

  changeSampleSet(up) {
    this.currentSampleIndex =
      (this.currentSampleIndex + (up ? 1 : -1)) % drumUrls.length;
    if (this.currentSampleIndex < 0) {
      this.currentSampleIndex += drumUrls.length;
    }

    console.log(this.currentSampleIndex);
    this.loadSamples();
  }

  loadSamples() {
    console.log(`start loading drum sound bank : ${this.currentSampleIndex}`);
    this.loadingSamples = true;
    this.samples = new Players(drumUrls[this.currentSampleIndex], () => {
      this.loadingSamples = false;
    }).toMaster();
    this.samples.volume.value = -2;
    this.samples.fadeOut = 0.4;
  }

  saveRecord(saveKeyboardRecord, storeKeyboardRecord, recordTitle, bpm) {
    this.checkStart = false;
    // console.log(`ready to save this.recordFull: ${this.recordFull}`);
    // console.log(`now this.recordMatrix: ${this.recordMatrix}`);
    // fill the rest recordMatrix then append to recordFull
    // if the rest recordMatrix columns are too few, we think it's not user's intention
    if (this.recordMatrix.length > 5) {
      const emptyCol = [0, 0, 0, 0, 0, 0, 0, 0];
      while (this.recordMatrix.length < 16) {
        this.recordMatrix.push(emptyCol);
      }
      this.recordFull.push(this.recordMatrix);
    }
    if (this.recordFull.length > 0) {
      axios.post('/api/notes', {
        id: temperId,
        title: recordTitle,
        content: this.recordFull,
        startTime: this.startTime,
        bpm,
      })
      .then(saveKeyboardRecord(temperId, this.startTime))
      .then(
        this.recordFull = [],
        this.recordMatrix = [],
      )
      .then(axios.get('/api/notes')
          .then((res) => {
            this.storeRecord(res.data);
            temperId = uuid4();
          })
          .catch((err) => {
            console.log(err);
          }))
      .then(axios.get('/api/keys')
          .then((res) => {
            storeKeyboardRecord(res.data);
          })
          .catch((err) => {
            console.log(err);
          }))
      .catch(err => console.log(err));
    } else {
      console.log('you should at least play one rounds of drum');
    }
  }
}

export class Keyboard {
  currentKey: Number;
  record: Array;
  notes: Array<String>;
  samples: Object;
  recording: Boolean;
	loadingSamples: Boolean;

  constructor(storeRecord) {
    this.currentKey = null;
    this.record = [];
    this.notes = keysNotes;
    this.storeRecord = record => storeRecord(record);
    this.samples = new Players(keysUrls[0]);
    for (let i = 0; i < Object.keys(keysUrls[0]).length; i += 1) {
      this.samples.add(i, keysUrls[0][i + 1]);
    }
    this.samples.volume.value = 2;
    this.samples.fadeOut = 0.1;
    this.recording = false;
    this.saveRecord = this.saveRecord.bind(this);
    this.currentSampleIndex = 0;
    this.recordStartTime = 0;
  }

  playKey() {
    console.log(`key: ${this.currentKey}`);
    if (this.currentKey !== null && !this.loadingSamples) {
      this.samples.get(this.currentKey).start().toMaster();
      if (this.recording === true) {
        const time = now();
        this.record.push({ time, key: this.currentKey });
        console.log('keyBoardRecord: ', this.record);
      }
      this.currentKey = null;
    }
  }

  startRecording() {
    this.recording = true;
  }

  stopRecording() {
    this.recording = false;
  }

  saveRecord(recordId, startTime) {
    const keyBoardRecord = {
      content: this.record,
      id: recordId,
      startTime,
    };
    axios.post('/api/keys', keyBoardRecord)
      .catch(err => console.log(err));
    this.record = [];
  }

  playRecord(record, aniTrigger) {
    this.recordStartTime = now();
    for (let i = 0; i < record.content.length; i += 1) {
      const time = this.recordStartTime + (record.content[i].time - record.startTime);
      this.samples.get(record.content[i].key).start(time).toMaster();
      Transport.schedule(() => {
        aniTrigger(record.content[i].key);
      }, time);
    }
  }

  clearSchedule(record) {
     Transport.cancel();
     for (let i = 0; i < record.content.length; i += 1) {
       // const time = this.recordStartTime + (record.content[i].time - record.startTime);
       this.samples.get(record.content[i].key).stop();
     }
     // this.samples.stopAll([time]);
     // Transport.cancel([time]);
  }

	changeSampleSet(up) {
	  this.currentSampleIndex =
	    (this.currentSampleIndex + (up ? 1 : -1)) % keysUrls.length;
	  if (this.currentSampleIndex < 0) {
	    this.currentSampleIndex += keysUrls.length;
	  }

	  console.log(this.currentSampleIndex);
	  this.loadSamples();
	}

  startNaruto() {
	  this.currentSampleIndex = 1;
	  console.log(this.currentSampleIndex);
	  this.loadSamples();
	}

	startNormal() {
		this.currentSampleIndex = 0;
		console.log(this.currentSampleIndex);
		this.loadSamples();
	}

	loadSamples() {
	  console.log(`start loading key sound bank : ${this.currentSampleIndex}`);
	  this.loadingSamples = true;
    this.samples = new Players(keysUrls[this.currentSampleIndex], () => {
      this.loadingSamples = false;
    }).toMaster();
    this.samples.volume.value = -2;
    this.samples.fadeOut = 0.4;
	}
}

const toBPM = (val, rampTime) => {
  const target = val.toFixed();
  Transport.bpm.rampTo(target, rampTime);
};

export {
  toBPM,
  presets,
};
