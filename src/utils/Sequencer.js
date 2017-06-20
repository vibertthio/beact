import { MultiPlayer, Sequence, Transport } from 'tone';

/**
 * Sequencer
 */
export default class Sequencer {
  samples: Object;
  sequence: Object;
  beat: number;
  notes: Array<String>;
  matrix: Array<Array<number>>;

  /**
   * [constructor description]
   * @param  {[type]} matrix [description]
   * @param  {[type]} setCurrentBeat [description]
   */
  constructor(matrix, setCurrentBeat) {
    this.matrix = matrix;
    this.number = 0;
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
        kk: './audio/505/kick.mp3',
        sn: './audio/505/snare.mp3',
        hh: './audio/505/hh.mp3',
        ho: './audio/505/hho.mp3',
        A: './audio/casio/A1.mp3',
        'C#': './audio/casio/Cs2.mp3',
        E: './audio/casio/E2.mp3',
        'F#': './audio/casio/Fs2.mp3',
      },
      volume: -10,
      fadeOut: 0.1,
    }).toMaster();

    this.sequence = new Sequence((time, col) => {
      // console.log(`time : ${time}`);
      // console.log(`col : ${col}`);
      // console.log(`matrix : ${this.matrix}`);
      this.beat = col;
      setCurrentBeat(this.beat);
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

}
