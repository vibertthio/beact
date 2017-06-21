import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';

/**
 * [two description]
 * @type {object}
 */
class Animation {
  two: Object;
  shape: Object;
  /**
   * [constructor description]
   */
  constructor() {
    const canvas = document.getElementById('animation');
    if (canvas === undefined || canvas === null) {
      console.error('not found animation div');
    }
    const params = {
      fullscreen: true,
    };
    this.two = new Two(params).appendTo(canvas);

    this.shape = this.two.makeRectangle(
      this.two.width / 2,
      this.two.height + 250,
      this.two.width,
      500,
    );

    this.two.bind('update', () => {
      TWEEN.update();
    }).play();
  }

  /**
   * [aniIn description]
   */
  start() {
    new TWEEN.Tween(this.shape.translation)
      .to({ y: 400 }, 3000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        console.log('finish in');
        new TWEEN.Tween(this.shape.translation)
          .to({ y: this.two.height + 250 }, 3000)
          .easing(TWEEN.Easing.Exponential.Out)
          .onComplete(() => {
            console.log('finish out');
          })
          .start();
      })
      .start();
  }

  /**
   * [aniOut description]
   */
  reverse() {
    // new TWEEN.Tween(this.shape.translation)
    //   .to({ y: this.two.height + 250 }, 3000)
    //   .easing(TWEEN.Easing.Exponential.Out)
    //   .onComplete(() => {
    //     console.log('finish ani');
    //   })
    //   .start();
  }
}

export default Animation;
