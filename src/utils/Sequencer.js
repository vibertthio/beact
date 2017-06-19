import Tone, { MultiPlayer, Sequence } from 'tone';

/**
 * Sequencer
 */
export default class Sequencer {
  samples: Object;
  sequence: Object;
  notes: Array<String>;
  matrix: Array<Array<number>>;

  /**
   * [constructor description]
   * @param  {[type]} matrix [description]
   */
  constructor(matrix) {
    this.matrix = matrix;

    this.notes = ['F#', 'E', 'C#', 'A'];

    this.samples = new MultiPlayer({
      urls: {
        A: './audio/casio/A1.mp3',
        'C#': './audio/casio/Cs2.mp3',
        E: './audio/casio/E2.mp3',
        'F#': './audio/casio/Fs2.mp3',
      },
      volume: -10,
      fadeOut: 0.1,
    }).toMaster();

    this.sequence = new Sequence((time, col) => {
      console.log(`time : ${time}`);
      console.log(`col : ${col}`);
      console.log(`matrix : ${this.matrix}`);
      const column = this.matrix[col];
      for (let i = 0; i < 4; i += 1) {
        if (column[i] === 1) {
          const vel = (Math.random() * 0.5) + 0.5;
          this.samples.start(this.notes[i], time, 0, '32n', 0, vel);
        }
      }
    }, [0, 1, 2, 3], '16n');

    Tone.Transport.start();
    this.sequence.start();
  }

}
