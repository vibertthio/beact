import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';

/**
 * [animation description]
 * @return {[type]} [description]
 */
function Animation() {
  const canvas = document.getElementById('animation');
  const params = { fullscreen: true };
  const two = new Two(params).appendTo(canvas);
  two.bind('update', () => {
    TWEEN.update();
  }).play();

  const veil = ((opacity = 1, duration = 400) => {
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
        console.log('finish aniOut');
        playing = false;
      });

    const aniIn = new TWEEN.Tween(shape.translation)
      .to({ y: two.height * 0.5 }, duration)
      .easing(TWEEN.Easing.Exponential.In)
      .onComplete(() => {
        console.log('finish aniIn');
        aniOut.start();
      });

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

    return {
      playing,
      start,
      reset,
    };
  })();


  return {
    start: veil.start,
    reset: veil.reset,
  };
}

export default Animation;
