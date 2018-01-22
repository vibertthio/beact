import { min } from 'config/animation.config';

/**
 * Animation #7, Sunrise
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function sunrise(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400
) {
  let playing = false;
  const origin = { x: two.width * 0.5, y: two.height * 1.5 };
  const dest = { y: two.height * 0.5 };

  /**
   * [setDirection description]
   */
  function setOrigin() {
    if (Math.random() > 0.5) {
      origin.x = two.width * (1 / 3);
    } else {
      origin.x = two.width * (2 / 3);
    }

    if (Math.random() > 0.5) {
      origin.y = two.height * -0.5;
    } else {
      origin.y = two.height * 1.5;
    }

    dest.y = two.height * 0.5;
  }

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    const radius = min(two.width, two.height) * 0.25;

    const circle = two.makeCircle(origin.x, origin.y, radius);
    circle.noStroke();
    circle.fill = colors[4];

    const aniOut = new TWEEN.Tween(circle)
      .to({ scale: 0 }, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onComplete(() => {
        playing = false;
      });
    const aniIn = new TWEEN.Tween(circle.translation)
      .to(dest, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        circle.scale = 1;
      })
      .onComplete(() => {
        aniOut.start();
      });
    return {
      circle,
      aniIn,
      aniOut,
    };
  }

  let { circle, aniIn, aniOut } = setup();

  // methods
  const resize = () => {
    setOrigin();
    two.remove(circle);
    ({ circle, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
    aniIn.stop();
    aniOut.stop();
    setOrigin();
    circle.translation.set(origin.x, origin.y);
  };

  const start = () => {
    reset();
    playing = true;
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
