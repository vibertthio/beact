import defaultImgUrl from 'vapor/landscape.jpg';

/**
 * Animation #0, Veil
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {string} imgUrl the src of image
 * @param  {number} [scale = 1]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 * @param  {number} [ratio = 0.5]
 */
export default function flashImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl = defaultImgUrl,
  scale = 1,
  opacity = 1,
  duration = 400,
  ratio = 0.5
) {
  let playing = false;
  const param = { t: 0 };

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    // const shape = two.makeRectangle(
    //   two.width * 0.5,
    //   two.height * 0.5,
    //   two.width,
    //   two.height,
    // );
    // const texture = new Two.Texture(imgUrl);
    // shape.visible = 0;
    // shape.fill = texture;
    // shape.noStroke();
    const shape = two.makeSprite(imgUrl, two.width * 0.5, two.height * 0.5);
    shape.scale = scale * two.height / 3000;
    shape.visible = 0;

    const originalScale = scale * two.height / 500;
    let targetRatio;
    // texture.scale = originalScale;

    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        targetRatio = ratio;
        shape.visible = 1;
      })
      .onUpdate(t => {
        // texture.scale = originalScale * (1 + (targetRatio * t));
        shape.scale = originalScale * (1 + targetRatio * t.t);
        // shape.visible = Math.random() > 0.5;
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
