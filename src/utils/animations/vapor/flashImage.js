import defaultImgUrl from 'vapor/landscape.png';

/**
 * Animation #0, Veil
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {string} imgUrl the src of image
 * @param  {number} [textureScale = 1]
 * @param  {number} [shapeScale = 1]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function flashImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl = defaultImgUrl,
  textureScale = 1,
  duration = 400,
  ) {
  let playing = false;
  const param = { t: 0 };
  let dest = { x: two.width * 0.5, y: two.height * 1.5 };

  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
    // const length = Math.min(two.width, two.height);
    // const shape = two.makeRectangle(
    //   two.width * 0.5,
    //   two.height * 0.5,
    //   two.width * shapeScale,
    //   two.height * shapeScale,
    // );
    // const texture = new Two.Texture(imgUrl, two.width * shapeScale, two.height * shapeScale);
    // shape.visible = 0;
    // shape.fill = texture;
    // shape.noStroke();
    //


    const shape = two.makeSprite(
      imgUrl,
      two.width * 0.5,
      two.height * 0.5,
    );

    dest = { x: two.width * 0.5, y: two.height * 0.5 };
    const originalScale = (textureScale * two.height) / 400;
    shape.scale = originalScale;
    shape.opacity = 0;
    const targetRatio = originalScale * (1 + (0.3 * Math.random()));

    const aniScale = new TWEEN.Tween(shape)
      .to({ scale: targetRatio }, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onComplete(() => {
        shape.scale = originalScale;
      });

    const ani = new TWEEN.Tween(shape.translation)
      .to(dest, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => { aniScale.start(); })
      .onUpdate(() => {
        if (Math.random() > 0.5) {
          shape.opacity = 0;
        } else {
          shape.opacity = 1;
        }
      })
      .onComplete(() => {
        shape.opacity = 0;
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
    shape.opacity = 0;
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
