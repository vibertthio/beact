
/**
 * Animation #9, 10, 11, Flash
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {number} [index = 0] 0 ~ 2
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function flash(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  index = 0,
  opacity = 1,
  duration = 400,
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
    shape.visible = 0;
    shape.noStroke();
    const colorIndex = [4, 5, 2];
    shape.fill = colors[colorIndex[index]];

    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        shape.visible = Math.random() > 0.5;
      })
      .onComplete(() => {
        shape.visible = false;
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
