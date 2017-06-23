import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';
import _ from 'lodash';

function range(n) {
	return Array.from(Array(n).keys());
}

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
   * it will have four direction, which will be decided randomly
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
      origin.x = two.width * 0.5;
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

	(function makeGlimmer(opacity = 1, duration = 400) {
    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      let playing = false;
			const amount = 12, r1 = two.height * 20 / 900, r2 = two.height * 40 / 900;

			let longest = 0;

			const circles = _.map(_.range(amount), () => {
				// const r = Math.round(map(Math.random(), 0, 1, r1, r2));
				const r = Math.floor(Math.random() * 30);
        const delay = Math.random() * duration * 0.5;
				const circle = two.makeCircle(two.width * Math.random(), two.height * Math.random(), r);
        circle.noFill();
        circle.linewidth = 0;
        circle.ani = new TWEEN.Tween(circle)
          .to({ scale: 1, linewidth: 0 }, duration * 1.5)
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .delay(delay)
          .onComplete(() => {
            circle.visible = false;
          });

        if (longest < delay) {
          longest = delay;
        }

        return circle;
			});

      return {
        playing,
        circles,
      };
    }

    let { playing, circles } = setup();

    // methods
    const resize = () => {
      two.remove(circles);
      ({ playing, circles } = setup());
    };

		// let j;
    const reset = () => {
      playing = false;
			// for (j = 0; j < circles.length; j++) {
			// 	circles[j].visible = false;
			// }
      circles.opacity = 0;
    };

    let i;
    let c;
    const start = () => {
      reset();
      playing = true;
      for (i = 0; i < circles.length; i++) {
        c = circles[i];
				c.translation.set(two.width * Math.random(), two.height * Math.random());
        c.visible = true;
				c.stroke = pallete[Math.floor(Math.random() * 8)];
				c.linewidth = 5;
        c.ani.start();
      }
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
