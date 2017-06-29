import { MultiPlayer, Sequence, Transport } from 'tone';
import axios from 'axios';
import uuid4 from 'uuid/v4';
import { keysUrls, keysNotes } from './keys.config';
import { drumUrls, drumNotes, presets } from './drum.config';

let temperId = uuid4();
/**
 * Sequencer
 */
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
  isPlayingRecord: Array;
  nowPlayingAni: Array;
  startTime: Number;

  /**
   * [constructor description]
   * @param  {[type]} matrix [description]
   * @param  {[type]} setCurrentBeat [description]
   * @param  {[type]} playNextChainElement [description]
   * @param  {[type]} storeRecord [description]
   * @param  {[type]} playNextRecordElement [description]
   * @param  {[type]} playDrumAni [description]
   */
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
    this.notes = drumNotes;
    this.isPlayingChain = false;
    this.recordMatrix = [];
    this.recordFull = [];
    this.isPlayingRecord = false;
    this.startTime = 0;
    this.currentSampleIndex = 2;
    this.storeRecord = record => storeRecord(record);

    this.loadSamples();
    this.checkStart = false;
    // this.nowPlayingAni = [];
    this.saveRecord = this.saveRecord.bind(this);

    this.sequence = new Sequence((time, col) => {
      this.beat = col;

      setCurrentBeat(this.beat);

      const column = this.matrix[col];
      const nowPlayingAni = [];
      for (let i = 0; i < this.notes.length; i += 1) {
        if (col === 0 && i === 0 && this.checkStart === false && this.recording === true) {
          this.checkStart = true;
          this.startTime = time;
        }
        // make sure no play while loading
        if (column[i] === 1 && !this.loadingSamples) {
          const vel = (Math.random() * 0.5) + 0.5;
          this.samples.start(this.notes[i], time, 0, '32n', 0, vel);
          nowPlayingAni.push(i);
        }
        if (i === 7) {
          playDrumAni(nowPlayingAni);
        }
      }

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
            console.log(`startTime: ${this.startTime}`);
            console.log(`recordFull: ${this.recordFull}`);
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

  /**
   * get the current position of sequence
   * @return {number} [description]
   */
  static getBeat() {
    return this.beat;
  }

  /**
   * [isPlaying description]
   * @return {Boolean} [description]
   */
  isPlaying() {
    return this.playing;
  }

  /**
   * [start description]
   */
  start() {
    this.playing = true;
    this.sequence.start();
  }

  /**
   * [stop description]
   */
  stop() {
    this.playing = false;
    this.sequence.stop();
  }

  /**
   * [startRecording description]
   */
  startRecording() {
    this.recording = true;
  }

  /**
   * [stopRecording description]
   */
  stopRecording() {
    this.recording = false;
    this.stop();
  }

  /**
   * [changeSampleSet description]
   * @param  {[type]} up [description]
   */
  changeSampleSet(up) {
    this.currentSampleIndex =
      (this.currentSampleIndex + (up ? 1 : -1)) % drumUrls.length;
    if (this.currentSampleIndex < 0) {
      this.currentSampleIndex += drumUrls.length;
    }
    this.loadSamples();
  }

  /**
   * [loadSamples description]
   */
  loadSamples() {
    console.log(`start loading drum sound bank : ${this.currentSampleIndex}`);
    this.loadingSamples = true;
    this.samples = new MultiPlayer({
      urls: drumUrls[this.currentSampleIndex],
      volume: -2,
      fadeOut: 0.4,
      onload: () => {
        console.log('finish!');
        this.loadingSamples = false;
      },
   }).toMaster();
  }


  /**
  * @param  {Function} saveKeyboardRecord width of window
  * @param  {Function} storeKeyboardRecord width of window
  * @param  {String} recordTitle width of window
   * [storeRecord description]
   */
  saveRecord(saveKeyboardRecord, storeKeyboardRecord, recordTitle) {
    this.checkStart = false;
    if (this.recordFull.length > 0) {
      axios.post('/api/notes', {
        id: temperId,
        title: recordTitle,
        content: this.recordFull,
        startTime: this.startTime,
      })
      .then(
        saveKeyboardRecord(temperId, this.startTime),
      )
      .then(
        this.recordFull = [],
      )
      .then(
        axios.get('/api/notes')
          .then((res) => {
            this.storeRecord(res.data);
            temperId = uuid4();
          })
          .catch((err) => {
            console.log(err);
          }),
      )
      .then(
        axios.get('/api/keys')
          .then((res) => {
            storeKeyboardRecord(res.data);
          })
          .catch((err) => {
            console.log(err);
          }),
      )
      .catch(err => console.log(err));
    } else {
      console.log('you should at least play one rounds of drum');
    }
  }

}

/**
 * Keyboard
 */
export class Keyboard {
  currentKey: Number;
  record: Array;
  notes: Array<String>;
  samples: Object;
  recording: Boolean;
  /**
   * [constructor description]
   * @param  {[type]} storeRecord [description]
   */
  constructor(storeRecord) {
    this.currentKey = null;
    this.record = [];
    this.notes = keysNotes;
    this.storeRecord = record => storeRecord(record);
    console.log('haha');
    this.samples = new MultiPlayer({
      urls: keysUrls[0],
      volume: -5,
      fadeOut: 0.1,
    }).toMaster();
    this.recording = false;
    this.saveRecord = this.saveRecord.bind(this);
  }

  /**
   * [playKey description]
   */
  playKey() {
    if (this.currentKey !== null) {
      this.samples.start(this.notes[this.currentKey]);
      if (this.recording === true) {
        const time = Transport.seconds;
        this.record.push({ time, key: this.currentKey });
        console.log(`keyBoardRecord: ${this.record}`);
      }
      this.currentKey = null;
    }
  }

  /**
   * [startRecording description]
   */
  startRecording() {
    this.recording = true;
  }

  /**
   * [stopRecording description]
   */
  stopRecording() {
    this.recording = false;
  }

  /**
  * @param  {String} recordId width of window
  * @param  {Number} startTime width of window
   * [saveRecord description]
   */
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

  /**
  * @param  {Object} record width of window
  * @param  {Function} aniTrigger width of window
   * [playRecord description]
   */
  playRecord(record, aniTrigger) {
    const currentTime = Transport.seconds;
    for (let i = 0; i < record.content.length; i += 1) {
      const time = currentTime + (record.content[i].time - record.startTime);
      this.samples.start(this.notes[record.content[i].key], time);
      Transport.schedule(() => {
        aniTrigger(record.content[i].key);
      }, time - 0.4);
    }
  }

  /**
   * [clearSchedule description]
   */
  clearSchedule() {
     const time = Transport.seconds + 1;
     this.samples.stopAll([time]);
     // Transport.cancel([time]);
    }
}

const changeBPM = (value) => {
    Transport.bpm.value += value;
    console.log(`bpm:${Transport.bpm.value}`);
};

export {
  changeBPM,
  presets,
};
