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

  const veil =  rect(two) {
    let playing = false;
    // let direction = true;
    const shape = two.makePolygon(
      two.width / 2,
      two.height / 2,
      two.width,
      two.height,
    );

    const aniOut = new TWEEN.Tween(shape.translation)
      .to({ y: this.two.height + 250 }, 3000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        console.log('finish ani');
      });

    const aniIn = new TWEEN.Tween(shape.translation)
      .to({ y: 400 }, 3000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        console.log('finish aniIn');
        aniOut.start();
      });

    const start = () => {
      playing = true;
      shape.opacity = 1;
      aniIn.start();
    };

    const reset = () => {
      playing = false;
      shape.opacity = 0;
      shape.translation.set(
        two.width / 2,
        two.height / 2,
      );
      aniIn.stop();
      aniOut.stop();
    };

    return {
      start,
      reset,
    };
  }(two));

  return {
    start: veil.start,
    reset: veil.reset,
  };
}

export default Animation;
