import { MultiPlayer, Sequence, Transport } from 'tone';
import axios from 'axios';

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
            this.recordMatrix = [];
            console.log(this.recordFull);
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
    // console.log(this.recording);
  }

  /**
   * [stopRecording description]
   */
  stopRecording() {
    this.recording = false;
    // console.log(this.recording);
  }

  /**
   * [saveRecord description]
   */
  saveRecord() {
    this.sequence.stop();
    axios.post('/api/notes', {
      title: 'Notes',
      content: this.recordFull,
    })
    .catch(err => console.log(err));
    axios.get('/api/notes')
      .then((res) => {
        this.storeRecord(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.recordFull = [];
  }

  /**
   * [clearRecord description]
   */
  clearRecord() {
    this.sequence.stop();
    this.recordFull = [];
  }
}

/**
 * Keyboard
 */
export class Keyboard {
  notes: Array<String>;
  samples: Object;

  /**
   * [constructor description]
   * @param  {[type]} currentKey [description]
   * @param  {[type]} clearCurrentKey [description]
   */
  constructor() {
    this.currentKey = null;
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
  }

  /**
   * [playKey description]
   */
  playKey() {
    if (this.currentKey !== null) {
      console.log(Transport.seconds);
      console.log(this.currentKey);
      this.samples.start(this.notes[this.currentKey]);
      this.currentKey = null;
    }
  }
}
