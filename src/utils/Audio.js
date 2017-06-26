import { MultiPlayer, Sequence, Transport } from 'tone';
import axios from 'axios';
import uuid4 from 'uuid/v4';

let temperId = uuid4();
/**
 * Sequencer
 */
export class Sequencer {
  notes: Array<String>;
  samples: Object;
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
  constructor(matrix, setCurrentBeat, playNextChainElement,
    storeRecord, playNextRecordElement, playDrumAni) {
    this.matrix = matrix;
    this.number = 0;
    this.playing = true;
    this.notes = [
      'kk',
      'sn',
      'hh',
      'ho',
      'A',
      'F#',
      'E',
      'C#',
    ];
    this.isPlayingChain = false;
    this.recordMatrix = [];
    this.recordFull = [];
    this.isPlayingRecord = false;
    this.startTime = 0;
    this.checkStart = false;
    this.storeRecord = record => storeRecord(record);
    this.samples = new MultiPlayer({
      urls: {
        kk: './assets/audio/505/kick.mp3',
        sn: './assets/audio/505/snare.mp3',
        hh: './assets/audio/505/hh.mp3',
        ho: './assets/audio/505/hho.mp3',
        A: './assets/audio/casio/A1.mp3',
        'C#': './assets/audio/casio/Cs2.mp3',
        E: './assets/audio/casio/E2.mp3',
        'F#': './assets/audio/casio/Fs2.mp3',
      },
      volume: -10,
      fadeOut: 0.1,
    }).toMaster();
    // this.nowPlayingAni = [];

    this.sequence = new Sequence((time, col) => {
      // console.log(`time : ${time}`);
      // console.log(`matrix : ${this.matrix}`);
      // console.log(`col : ${col}`);
      this.beat = col;

      setCurrentBeat(this.beat);

      const column = this.matrix[col];
      const nowPlayingAni = [];
      for (let i = 0; i < this.notes.length; i += 1) {
        if (col === 0 && i === 0 && this.checkStart === false) {
          this.checkStart = true;
          this.startTime = time;
        }
        if (column[i] === 1) {
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
            const recordMatrix = [[0, 0, 0, 0, 0, 0, 0, 0],
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
                recordMatrix[i][j] = this.recordMatrix[i][j];
              }
            }
            this.recordFull.push(recordMatrix);
            console.log(this.startTime);
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
    this.sequence.stop();
  }

  /**
  * @param  {Function} saveKeyboardRecord width of window
   * [storeRecord description]
   */
  saveRecord(saveKeyboardRecord) {
    this.checkStart = false;
    if (this.recordFull.length > 0) {
      console.log(this.recordFull);
      axios.post('/api/notes', {
        id: temperId,
        title: 'Notes',
        content: this.recordFull,
        startTime: this.startTime,
      })
      .then(
        axios.get('/api/notes')
          .then((res) => {
            console.log(res.data);
            this.storeRecord(res.data);
            saveKeyboardRecord(temperId);
            temperId = uuid4();
          })
          .catch((err) => {
            console.log(err);
          }),
      )
      .catch(err => console.log(err));
    }
    this.recordFull = [];
  }

  /**
   * [clearRecord description]
   */
  clearRecord() {
    this.sequence.stop();
    this.checkStart = false;
    this.recordFull = [];
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
   */
  constructor() {
    this.startRecordingTime = 0;
    this.stopRecordingTime = 0;
    this.gapTimeCorrection = 0;
    this.recordStatusChange = false;
    this.haveClearRecord = false;
    this.currentKey = null;
    this.record = [];
    this.notes = [
      'kk',
      'sn',
      'hh',
      'ho',
      'A',
      'F#',
      'E',
      'C#',
    ];
    this.samples = new MultiPlayer({
      urls: {
        kk: './assets/audio/505/kick.mp3',
        sn: './assets/audio/505/snare.mp3',
        hh: './assets/audio/505/hh.mp3',
        ho: './assets/audio/505/hho.mp3',
        A: './assets/audio/casio/A1.mp3',
        'C#': './assets/audio/casio/Cs2.mp3',
        E: './assets/audio/casio/E2.mp3',
        'F#': './assets/audio/casio/Fs2.mp3',
      },
      volume: -10,
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
        const time = Transport.seconds - this.gapTimeCorrection;
        this.record.push({ time, key: this.currentKey });
        console.log(this.record);
      }
      this.currentKey = null;
    }
  }

  /**
   * [startRecording description]
   */
  startRecording() {
    this.recording = true;
    if (this.stopRecordingTime > this.startRecordingTime || this.startRecordingTime === 0) {
      this.startRecordingTime = Transport.seconds;
    }
    if (this.stopRecordingTime < this.startRecordingTime && this.stopRecordingTime !== 0
      && this.haveClearRecord === false) {
      const gapTime = this.startRecordingTime - this.stopRecordingTime;
      this.gapTimeCorrection += gapTime;
      console.log(this.gapTimeCorrection);
    } else if (this.haveClearRecord === true) {
      this.gapTimeCorrection = 0;
      this.haveClearRecord = false;
      console.log('gap');
      console.log(this.gapTimeCorrection);
    }
  }

  /**
   * [stopRecording description]
   */
  stopRecording() {
    this.recording = false;
    if (this.stopRecordingTime < this.startRecordingTime) {
      this.stopRecordingTime = Transport.seconds;
    }
  }

  /**
  * @param  {String} recordId width of window
   * [saveRecord description]
   */
  saveRecord(recordId) {
    this.gapTimeCorrection = 0;
    const keyBoardRecord = {
      content: this.record,
      id: recordId,
    };
    this.record = [];
  }
}
