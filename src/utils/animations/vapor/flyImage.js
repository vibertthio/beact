import { TWO_PI, map } from 'config/animation.config';
import sculpture from 'vapor/sculpture-02.png';

/**
 * Animation #0, Veil
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {string} imgUrl the src of image
 * @param  {number} [scale = 0.5]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function flyImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl = sculpture,
  scale = 1,
  opacity = 1,
  duration = 400,
  ) {
  const origin = { x: 0, y: 0 };
  const destIn = { x: 0, y: 0 };
  const destOut = { x: 0, y: 0 };

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    let playing = false;

    const shape = two.makeSprite(
      imgUrl,
      origin.x,
      origin.y,
    );
    shape.scale = (scale * Math.min(two.height, two.width)) / 300;
    shape.opacity = 0;

    const aniOut = new TWEEN.Tween(shape.translation)
      .to(destOut, duration)
      .easing(TWEEN.Easing.Exponential.In)
      .onComplete(() => {
        playing = false;
        shape.opacity = 0;
      });
    const aniIn = new TWEEN.Tween(shape.translation)
      .to(destIn, duration)
      .onStart(() => { playing = true; })
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        aniOut.start();
      });
    return {
      playing,
      shape,
      aniIn,
      aniOut,
    };
  }

  let { playing, shape, aniIn, aniOut } = setup();

  /**
   * [setDirection description]
   */
  function setDirection() {
    const direction = (Math.random() > 0.5);
    // origin.x = two.width * 0.5;
    origin.x = two.width * (0.3 + (0.4 * Math.random()));
    origin.y = two.height * (direction ? 1.8 : -0.8);
    destIn.y = two.height * 0.5;
    destOut.y = two.height * (direction ? -0.8 : 1.8);

    const rando = Math.random();
    const distance = Math.round(map(rando, 0, 1, two.height * 0.5, two.width));
    let theta;
    theta = Math.random() * TWO_PI;
    shape.rotation = theta + (Math.PI * 0.5);
    origin.x = (distance * Math.cos(theta)) + (two.width * 0.5);
    origin.y = (distance * Math.sin(theta)) + (two.height * 0.5);

    theta += Math.PI * (1 + (0.3 * rando));
    destOut.x = (distance * Math.cos(theta)) + (two.width * 0.5);
    destOut.y = (distance * Math.sin(theta)) + (two.height * 0.5);
    destIn.x = (origin.x + destOut.x) * 0.5;
    destIn.y = (origin.y + destOut.y) * 0.5;
  }

  // methods
  const resize = () => {
    two.remove(shape);
    ({ playing, shape, aniIn, aniOut } = setup());
  };

  const reset = () => {
    aniIn.stop();
    aniOut.stop();
    setDirection();
    shape.opacity = 0;
    shape.translation.set(
      origin.x,
      origin.y,
    );
  };

  const start = () => {
    reset();
    shape.opacity = opacity;
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
