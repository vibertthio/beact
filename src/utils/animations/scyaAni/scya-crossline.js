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
export default function crossline(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  index = 0,
  opacity = 1,
  duration = 400
) {
  let playing = false;
  const param = { t: 0 };

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    const lineA = two.makeLine(
      Math.random() * two.width,
      0,
      Math.random() * two.width,
      two.height
    );
    lineA.visible = 0;
    lineA.linewidth = 4;
    lineA.stroke = 'rgb(255, 255, 255)';

    const lineB = two.makeLine(
      0,
      Math.random() * two.width,
      two.width,
      Math.random() * two.width
    );
    lineB.visible = 0;
    lineB.linewidth = 4;
    lineB.stroke = 'rgb(255, 255, 255)';

    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        lineA.visible = Math.random() > 0.5;
        lineB.visible = Math.random() > 0.5;
      })
      .onComplete(() => {
        lineA.visible = 0;
        lineB.visible = 0;
      });
    return { lineA, lineB, ani };
  }

  let { lineA, lineB, ani } = setup();

  // methods
  const resize = () => {
    two.remove(lineA, lineB);
    ({ lineA, lineB, ani } = setup());
  };

  const reset = () => {
    ani.stop();
    resize();
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
