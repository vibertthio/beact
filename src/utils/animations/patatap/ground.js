/**
* Animation #2, Ground Flash
* it will have two direction(u/d), which will be decided randomly
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color palette
* @param  {array} animations It's the stack of animations
* @param  {number} [opacity = 1]
* @param  {number} [duration = 400]
*/
export default function ground(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400,
  ) {
  let playing = false;
  const dest = { x: 0 };

  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
    const shape = two.makeRectangle(
      two.width * 0.5,
      two.height * 0.5,
      two.width,
      two.height,
    );
    shape.opacity = 0;
    shape.noStroke();
    shape.fill = colors[3];

    const aniOpacity = new TWEEN.Tween(shape)
    .to({ opacity: 0 }, duration)
    .easing(TWEEN.Easing.Exponential.In);

    const ani = new TWEEN.Tween(shape.translation)
    .to(dest, duration)
    .easing(TWEEN.Easing.Exponential.In)
    .onStart(() => {
      aniOpacity.start();
    });

    return {
      shape,
      ani,
      aniOpacity,
    };
  }

  let { shape, ani, aniOpacity } = setup();

  /**
  * [setDirection description]
  */
  function setDirection() {
    const direction = (Math.random() > 0.5);
    shape.translation.set(two.width * 0.5, two.height * 0.5);
    dest.x = two.width * (direction ? 1.5 : -0.5);
  }

  // methods
  const resize = () => {
    two.remove(shape);
    ({ shape, ani, aniOpacity } = setup());
  };

  const reset = () => {
    playing = false;
    setDirection();
    ani.stop();
    aniOpacity.stop();
    shape.opacity = 0;
  };

  const start = () => {
    reset();
    playing = true;
    shape.opacity = opacity;
    ani.start();
  };

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
