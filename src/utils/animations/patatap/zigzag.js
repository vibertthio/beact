import {
  TWO_PI,
  min,
  map,
} from 'config/animation.config';

/**
 * Animation #21, Zigzag
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 200]
 */
export default function zigzag(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 200,
  ) {
  let playing = false;
  const amount = 120;
  let phi = 6;
  const offset = Math.PI * 0.5;
  let points;

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    // first hemisphere
    const shape = two.makePolygon(two.width * 0.5, two.height * 0.5, 1, amount);
    points = shape.vertices;
    shape.noFill();
    shape.closed = false;
    shape.stroke = colors[6];
    shape.linewidth = min(two.width, two.height) * 0.033;
    shape.join = 'miter';
    shape.miter = 4;
    shape.cap = 'butt';
    shape.visible = false;

    const aniOut = new TWEEN.Tween(shape)
      .to({ beginning: 1.0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out);

    const aniIn = new TWEEN.Tween(shape)
      .to({ ending: 1.0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onComplete(() => {
        aniOut.start();
      });

    return {
      shape,
      aniIn,
      aniOut,
    };
  }

  let { shape, aniIn, aniOut } = setup();

  // methods
  const resize = () => {
    two.remove(shape);
    ({ shape, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;

    // left or right
    if (Math.random() > 0.5) {
      shape.translation.set(
        two.width * 0.85,
        two.height * 0.5,
      );
    } else {
      shape.translation.set(
        two.width * 0.15,
        two.height * 0.5,
      );
    }

    const index = Math.random() * 4;
    if (index > 3) {
      phi = 5;
    } else if (index > 2) {
      phi = 4;
    } else if (index > 1) {
      phi = 2;
    } else {
      phi = 1;
    }

    shape.rotation = Math.random() > 0.5 ? Math.PI : 0;
    shape.beginning = 0;
    shape.ending = 0;

    const w = two.width / 16;
    const h = two.height * 0.66;
    for (let i = 0; i < amount; i += 1) {
      const p = points[i];
      const pct = i / amount;
      const theta =
        Math.abs(((((2 * ((pct * TWO_PI * phi) + offset)) / Math.PI) - 1) % 4) - 2) - 1;
      const x = (theta * w) / 2;
      const y = map(pct, 0, 1, -h / 2, h / 2);
      p.set(x, y);
    }

    aniIn.stop();
    aniOut.stop();
  };

  const start = () => {
    reset();
    playing = true;
    shape.visible = true;
    aniIn.start();
  };

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
