import { TWO_PI, cos, sin, min, range } from 'config/animation.config';

/**
 * Animation #15, Timer
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function timer(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400
) {
  let playing = false;
  let direction = true;
  const amount = 32;
  let radius = min(two.width, two.height) * 0.33;
  const options = { beginning: 0, ending: 0 };

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    const points = range(amount).map(i => {
      const pct = i / (amount - 1);
      const theta = pct * TWO_PI;
      return new Two.Anchor(radius * cos(theta), radius * sin(theta));
    });

    points.push(points[0].clone());
    // test
    // const linearGradient = two.makeLinearGradient(
    //   two.width / 2,
    //   -two.height / 6,
    //   two.width / 2,
    //   two.height / 6,
    //   new Two.Stop(0, colors[3]),
    //   new Two.Stop(1, colors[0]),
    // );

    const shape = two.makeCurve(points, true);
    shape.stroke = colors[3];
    // shape.stroke = linearGradient;
    shape.cap = 'butt';
    shape.linewidth = min(two.width, two.height) / 20;
    shape.noFill();
    shape.translation.set(two.width * 0.5, two.height * 0.5);
    shape.visible = false;

    const aniOut = new TWEEN.Tween(options)
      .to({ beginning: 1 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.In)
      .onUpdate(() => {
        if (direction) {
          shape.beginning = options.beginning;
        } else {
          shape.ending = 1 - options.beginning;
        }
      })
      .onComplete(() => {
        playing = false;
      });
    const aniIn = new TWEEN.Tween(options)
      .to({ ending: 1 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(() => {
        if (direction) {
          shape.ending = options.ending;
        } else {
          shape.beginning = 1 - options.ending;
        }
      })
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

  /**
   * [setDirection description]
   */
  function setDirection() {
    direction = Math.random() > 0.5;
    shape.rotation = Math.random() * TWO_PI;
  }

  // methods
  const resize = () => {
    two.remove(shape);
    radius = min(two.width, two.height) * 0.33;
    ({ shape, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
    setDirection();
    shape.visible = false;
    aniIn.stop();
    aniOut.stop();
    options.beginning = 0;
    options.ending = 0;
    shape.beginning = direction ? 0 : 1;
    shape.ending = direction ? 0 : 1;
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
