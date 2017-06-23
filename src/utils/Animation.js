import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';


const pallete = [
  'rgb(28, 52, 53)',
  'rgb(238, 205, 204)',
  'rgb(204, 238, 205)',
  'rgb(204, 237, 238)',
  'rgb(204, 237, 204)',
  'rgb(205, 204, 238)',
  'rgb(88, 95, 96)',
  'rgb(238, 204, 237)',
];

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
   * it will have two direction(u/d), which will be decided randomly
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeVeil(opacity = 1, duration = 400) {
    const origin = { x: two.width * 0.5, y: two.height * 1.5 };
    const destIn = { y: two.height * 0.5 };
    const destOut = { y: two.height * -0.5 };

    /**
     * [setDirection description]
     */
    function setDirection() {
      const direction = (Math.random() > 0.5);
      origin.y = two.height * (direction ? 1.5 : -0.5);
      destOut.y = two.height * (direction ? -0.5 : 1.5);
    }

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      let playing = false;

      const shape = two.makeRectangle(
        origin.x,
        origin.y,
        two.width,
        two.height,
      );
      shape.opacity = 0;
      shape.fill = pallete[4];

      const aniOut = new TWEEN.Tween(shape.translation)
        .to(destOut, duration)
        .easing(TWEEN.Easing.Exponential.Out)
        .onComplete(() => {
          playing = false;
        });
      const aniIn = new TWEEN.Tween(shape.translation)
        .to(destIn, duration)
        .easing(TWEEN.Easing.Exponential.In)
        .onComplete(() => {
          aniOut.start();
        });
      return {
        playing,
        shape,
        aniIn,
        aniOut,
      };
    }

    let { playing, shape, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      setDirection();
      two.remove(shape);
      ({ playing, shape, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      aniIn.stop();
      aniOut.stop();
      setDirection();
      shape.opacity = 0;
      shape.translation.set(
        origin.x,
        origin.y,
      );
    };

    const start = () => {
      reset();
      playing = true;
      console.log(destOut);
      shape.opacity = opacity;
      aniIn.start();
    };

    const EXPORT = {
      playing,
      start,
      reset,
      resize,
    };
    animations.push(EXPORT);
    return EXPORT;
  }());

  /**
   * Animation #1, Wipe
   * it will have two direction(l/r), which will be decided randomly
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeWipe(opacity = 1, duration = 400) {
    const origin = { x: two.width * (-0.5), y: two.height * 0.5 };
    const destIn = { x: two.height * 0.5 };
    const destOut = { x: two.height * 1.5 };

    /**
     * [setDirection description]
     */
    function setDirection() {
      const direction = (Math.random() > 0.5);
      origin.x = two.width * (direction ? 1.5 : -0.5);
      destOut.x = two.width * (direction ? -0.5 : 1.5);
    }

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      let playing = false;

      const shape = two.makeRectangle(
        origin.x,
        origin.y,
        two.width,
        two.height,
      );
      shape.opacity = 0;
      shape.fill = pallete[4];

      const aniOut = new TWEEN.Tween(shape.translation)
        .to(destOut, duration)
        .easing(TWEEN.Easing.Exponential.Out)
        .onComplete(() => {
          playing = false;
        });
      const aniIn = new TWEEN.Tween(shape.translation)
        .to(destIn, duration)
        .easing(TWEEN.Easing.Exponential.In)
        .onComplete(() => {
          aniOut.start();
        });
      return {
        playing,
        shape,
        aniIn,
        aniOut,
      };
    }

    let { playing, shape, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      setDirection();
      two.remove(shape);
      ({ playing, shape, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      aniIn.stop();
      aniOut.stop();
      setDirection();
      shape.opacity = 0;
      shape.translation.set(
        origin.x,
        origin.y,
      );
    };

    const start = () => {
      reset();
      playing = true;
      console.log(destOut);
      shape.opacity = opacity;
      aniIn.start();
    };

    const EXPORT = {
      playing,
      start,
      reset,
      resize,
    };
    animations.push(EXPORT);
    return EXPORT;
  }());

  // animations.push(veil);

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
