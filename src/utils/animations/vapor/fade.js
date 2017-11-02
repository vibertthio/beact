
/**
 * Animation #9, 10, 11, Fade
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [index = 0] 0 ~ 2
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 * @param  {number} [mode = 0]
 */
export default function fade(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  index = 0,
  opacity = 1,
  duration = 400,
  mode = 0,
  ) {
  let playing = false;
  const param = { t: 0 };

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
    console.log('setup!');
    shape.visible = true;
    // shape.visible = false;
    shape.noStroke();
    shape.fill = colors[0];

    let twn;
    switch (mode) {
      case 0:
        twn = TWEEN.Easing.Exponential.Out;
        break;
      case 1:
        twn = TWEEN.Easing.Exponential.In;
        break;
      case 2:
        twn = TWEEN.Easing.Circular.Out;
        break;
      default:
        break;
    }
    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(twn)
      .onStart(() => { shape.visible = true; })
      .onUpdate((t) => {
        shape.opacity = t;
        // shape.opacity = 1 - t;
      })
      .onComplete(() => {
        shape.visible = true;
        // shape.visible = false;
      });

    return { shape, ani };
  }

  let { shape, ani } = setup();

  // methods
  const resize = () => {
    two.remove(shape);
    ({ shape, ani } = setup());
  };

  const reset = () => {
    ani.stop();
  };

  const start = () => {
    reset();
    playing = true;
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
