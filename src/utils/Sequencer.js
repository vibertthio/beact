import { MultiPlayer, Sequence, Transport } from 'tone';

/**
 * Sequencer
 */
export default class Sequencer {
  samples: Object;
  sequence: Object;
  playing: boolean;
  beat: number; notes: Array<String>;
  matrix: Array<Array<number>>;

  /**
   * [constructor description]
   * @param  {[type]} matrix [description]
   * @param  {[type]} setCurrentBeat [description]
   */
  constructor(matrix, setCurrentBeat) {
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
      'C#'];

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

    this.sequence = new Sequence((time, col) => {
      // console.log(`time : ${time}`);
      // console.log(`col : ${col}`);
      // console.log(`matrix : ${this.matrix}`);
      setCurrentBeat(this.beat);

      this.beat = col;
      const column = this.matrix[col];
      for (let i = 0; i < this.notes.length; i += 1) {
        if (column[i] === 1) {
          const vel = (Math.random() * 0.5) + 0.5;
          this.samples.start(this.notes[i], time, 0, '32n', 0, vel);
        }
      }
    }, Array.from(Array(this.matrix.length).keys()), '16n');

    Transport.start();
    this.sequence.start();
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

}
