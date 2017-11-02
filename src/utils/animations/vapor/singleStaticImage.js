import defaultImgUrl from 'vapor/landscape.jpg';

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
 * @param  {number} [spriteScale = 1]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function singleStaticImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl = defaultImgUrl,
  textureScale = 1,
  spriteScale = 1.3,
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
    const shape = two.makeSprite(
      imgUrl,
      two.width * 0.5,
      two.height * 0.5,
    );
    shape.scale = (textureScale * two.height) / 3000;
    shape.opacity = 1;

    const originalScale = (textureScale * two.height) / 500;
    shape.scale = originalScale;
    let targetRatio;
    let rotateRatio;

    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        targetRatio = 0.15;
        rotateRatio = (Math.random() > 0.5) ? 0.05 : -0.05;
      })
      .onUpdate((t) => {
        shape.scale = originalScale * (1 + (targetRatio * t));
        shape.rotation = Math.PI * rotateRatio * t;
        shape.visible = true;
      })
      .onComplete(() => {
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
