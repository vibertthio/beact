import {
  TWO_PI,
  min,
  map,
} from 'config/animation.config';

/**
 * Animation #22, Sinewave
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function sinewave(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400,
  ) {
  let playing = false;
  const amount = 200;
  let points;

  /**
   * [setPoints description]
   */
  function setPoints() {
    const phi = Math.round(Math.random() * 6) + 1;
    const offset = Math.PI / 2;

    for (let i = 0; i < amount; i += 1) {
      const v = points[i];
      const pct = i / amount;
      const theta = (TWO_PI * phi * pct) + offset;
      const w = two.width * 0.5;
      const h = two.height * 0.33;
      v.set(
        map(pct, 0, 1, -w / 2, w / 2),
        h * Math.sin(theta),
      );
    }
  }
  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    // first hemisphere
    const shape = two.makePolygon(
      two.width * 0.5,
      two.height * 0.5,
      0,
      amount,
    );
    points = shape.vertices;
    shape.noFill();
    shape.stroke = colors[4];
    shape.linewidth = min(two.width, two.height) * 0.025;
    shape.cap = 'round';
    shape.join = 'round';
    shape.closed = false;
    shape.visible = false;
    shape.noFill();
    setPoints();

    const aniOut = new TWEEN.Tween(shape)
      .to({ beginning: 1.0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.In)
      .onComplete(() => {
        shape.visible = false;
      })
      ;

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
    shape.visible = false;
    shape.beginning = 0;
    shape.ending = 0;
    shape.rotation = (Math.random() > 0.5 ? 0 : Math.PI);
    setPoints();
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
