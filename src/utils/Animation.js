import Two from 'two.js/build/two.svg.webpack';

/**
 * [two description]
 * @type {object}
 */
class Animation {
  two: Object;
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
  }

  /**
   * [start description]
   */
  start() {
    const rect = this.two.makeRectangle(this.two.width / 2, this.two.height / 2, 50, 50);
    this.two.bind('update', () => {
      rect.rotation += 0.001;
    }).play();
  }

  /**
   * [bangCircle description]
   */
  bangCircle() {
    const two = this.two;
  }
}

export default Animation;
