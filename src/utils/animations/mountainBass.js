/**
* Animation #0, Mountain
* it will have two direction(u/d), which will be decided randomly
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color pallete
* @param  {array} animations It's the stack of animations
* @param  {number} [opacity = 1]
* @param  {number} [duration = 600]
*/
export default function mountainBass(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 600,
  ) {
  let playing = false;
  const origin = { x: 0, y: 0 };
  const dest = { y: 0 };

  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
    const low = two.height * 0.6;
    const high = two.height * 0.4;
    const shift = two.width * (0.4 + ((Math.random()) * 0.3));

    const points = [
      new Two.Anchor(0, two.height * 1.2),
      new Two.Anchor(0, low),
      new Two.Anchor(shift, high),
      new Two.Anchor(two.width, low),
      new Two.Anchor(two.width, two.height * 1.2),
    ];


    const shape = two.makePath(points, false);
    shape.opacity = 0;
    shape.noStroke();
    shape.fill = colors[1];
    origin.x = shape.translation.x;
    origin.y = shape.translation.y;
    dest.y = shape.translation.y + (two.height * 0.1);

    const aniOpacity = new TWEEN.Tween(shape)
    .to({ opacity: 0 }, duration * 2)
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(() => {
      if (shape.opacity < 0.05) {
        aniOpacity.stop();
        shape.opacity = 0;
      }
    });

    const ani = new TWEEN.Tween(shape.translation)
    .to(dest, duration)
    .easing(TWEEN.Easing.Back.In)
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
    shape.translation.set(origin.x, origin.y);
    shape.vertices[1].y = two.height * (-(0.1 * Math.random()));
    shape.vertices[2].y = two.height * (-0.2 - (0.2 * Math.random()));
    shape.vertices[2].x = two.width * (-0.3 + (Math.random() * 0.3));
    shape.vertices[3].y = two.height * (-(0.1 * Math.random()));
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
