import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';

/**
 * [animation description]
 * @return {[type]} [description]
 */
function Animation() {
  /**
   * setup
   */
  const animations = [];
  const canvas = document.getElementById('animation');
  const params = { fullscreen: true };
  const two = new Two(params).appendTo(canvas);
  two.bind('update', () => {
    TWEEN.update();
  }).play();


  /**
   * Animation #0, Veil
   * it will have four direction, which will be decided randomly
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  const veil = (function makeVeil(opacity = 1, duration = 400) {
    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      let playing = false;
      const origin = {
        x: two.width / 2,
        y: two.height * 1.5,
      };
      const shape = two.makeRectangle(
        origin.x,
        origin.y,
        two.width,
        two.height,
      );
      shape.opacity = 0;

      const aniOut = new TWEEN.Tween(shape.translation)
        .to({ y: two.height * (-0.5) }, duration)
        .easing(TWEEN.Easing.Exponential.Out)
        .onComplete(() => {
          playing = false;
        });
      const aniIn = new TWEEN.Tween(shape.translation)
        .to({ y: two.height * 0.5 }, duration)
        .easing(TWEEN.Easing.Exponential.In)
        .onComplete(() => {
          aniOut.start();
        });
      return {
        playing,
        origin,
        shape,
        aniIn,
        aniOut,
      };
    }

    let { playing, origin, shape, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      ({ origin, shape, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      aniIn.stop();
      aniOut.stop();
      shape.opacity = 0;
      shape.translation.set(
        origin.x,
        origin.y,
      );
    };

    const start = () => {
      reset();
      playing = true;
      shape.opacity = opacity;
      aniIn.start();
    };

    const EXPORT = {
      playing,
      start,
      reset,
      resize,
    };

    return EXPORT;
  }());

  animations.push(veil);

  const trigger = (index) => {
    animations[index].start();
  };

  const resize = (w, h) => {
    two.renderer.setSize(w, h);
    two.width = w;
    two.height = h;
    animations.forEach((ani) => {
      ani.resize();
    });
  };

  /**
   * export
   */
  return {
    resize,
    trigger,
  };
}

export default Animation;
