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
 * @param  {number} [textureScale = 1]
 * @param  {number} [shapeScale = 1]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 200]
 */
export default function singleFlashImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl = defaultImgUrl,
  textureScale = 1,
  opacity = 1,
  duration = 200,
  ) {
  let playing = false;
  const param = { t: 0 };

  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
    // const length = Math.min(two.width, two.height);
    const shape = two.makeSprite(
      imgUrl,
      two.width * 0.52,
      two.height * 0.6,
    );

    const originalScale = (textureScale * two.height) / 500;
    shape.opacity = 1;
    shape.scale = originalScale;
    shape.visible = false;
    let targetRatio;

    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        targetRatio = 0.15;
        shape.visible = true;
        // targetRatio = 0.2 * Math.random();
      })
      .onUpdate((t) => {
        // shape.scale = originalScale * (1 + (targetRatio * t));
        shape.visible = Math.random() > 0.25;
        // shape.visible = true;
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
