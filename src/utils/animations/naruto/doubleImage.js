import defaultImgUrl1 from 'vapor/landscape.jpg';
import defaultImgUrl2 from 'vapor/sculpture-01.jpg';
import showImage from './showImage';

/**
* Animation for Naruto, double image
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color palette
* @param  {array} animations It's the stack of animations
* @param  {array} imgUrls
* @param  {amount} [scales = [1, 0.1]]
* @param  {number} [opacity = 1]
* @param  {number} [duration = 200]
* @param  {number} [ratios = [0.5, 0.2]]
*/
export default function doubleImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrls = [defaultImgUrl1, defaultImgUrl2],
  // scales = [0.4, 0.5],
	scales = [0.4, 0.55],
  opacity = 1,
  duration = 400,
  ratios = [1, 0.2],
  ) {
  let playing = false;

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    const shapes = [];
    imgUrls.forEach((img, i) =>
      showImage(
        Two,
        two,
        TWEEN,
        colors,
        shapes,
        img,
        scales[i],
        opacity,
        duration,
        ratios[i],
      ));
    return {
      shapes,
    };
  }

  const { shapes } = setup();

  // methods
  const resize = () => {
    shapes.forEach(s => s.resize());
  };

  const reset = () => {
    playing = false;
    shapes.forEach(s => s.reset());
  };

  const start = () => {
    playing = true;
    shapes.forEach(s => s.start());
  };

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
