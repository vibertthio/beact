import defaultImgUrl from '../../assets/images/animations/sculpture-02.png';
/**
 * Animation #0, Veil
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {string} imgUrl the src of image
 * @param  {number} [scale = 1]
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
  scale = 1,
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
    const texture = new Two.Texture(imgUrl);
    shape.visible = 0;
    shape.fill = texture;
    shape.noStroke();
    texture.scale = scale;

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
