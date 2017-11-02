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
  ) {
  const playing = true;

  /**
  * [setup description]
  */
  function setup() {
    const shape = two.makeRectangle(
      two.width * 0.5,
      two.height * 0.5,
      two.width,
      two.height,
    );
    const texture = new Two.Texture(imgUrl);
    shape.visible = true;
    shape.fill = texture;
    shape.noStroke();

    const originalScale = (scale * two.height) / 500;
    texture.scale = originalScale;
    texture.opacity = opacity;
  }

  setup();

  // methods
  const resize = () => {
    setup();
  };

  const reset = () => {};

  const start = () => {};

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
