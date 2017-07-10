/**
 * Animation #1, Wipe
 * it will have two direction(l/r), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function makeWipe(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400,
  ) {
  const origin = { x: two.width * (-0.5), y: two.height * 0.5 };
  const destIn = { x: two.width * 0.5 };
  const destOut = { x: two.width * 1.5 };

  /**
   * [setDirection description]
   */
  function setDirection() {
    const direction = (Math.random() > 0.5);
    origin.x = two.width * (direction ? 1.5 : -0.5);
    origin.y = two.height * 0.5;
    destIn.x = two.width * 0.5;
    destOut.x = two.width * (direction ? -0.5 : 1.5);
  }

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    let playing = false;

    const shape = two.makeRectangle(
      origin.x,
      origin.y,
      two.width,
      two.height,
    );
    shape.opacity = 0;
    shape.noStroke();
    shape.fill = colors[3];

    const aniOut = new TWEEN.Tween(shape.translation)
      .to(destOut, duration)
      .easing(TWEEN.Easing.Exponential.In)
      .onComplete(() => {
        playing = false;
      });
    const aniIn = new TWEEN.Tween(shape.translation)
      .to(destIn, duration)
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

  // methods
  const resize = () => {
    setDirection();
    two.remove(shape);
    ({ playing, shape, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
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
    playing = true;
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
