import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';

/**
 * Math Definition
 */
const TWO_PI = Math.PI * 2;
const cos = Math.cos;
const sin = Math.sin;

/**
 * like range function in lodash
 * @param  {number} n [description]
 * @return {Array}   [description]
 */
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
        .easing(TWEEN.Easing.Exponential.In)
        .onComplete(() => {
          playing = false;
        });
      const aniIn = new TWEEN.Tween(shape.translation)
        .to(destIn, duration)
        .easing(TWEEN.Easing.Exponential.Out)
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
      origin.y = two.height * 0.5;
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

  /**
   * Animation #3, Prism
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makePrisms(opacity = 1, duration = 500) {
    [3, 5, 6].forEach((index) => {
      const origin = { x: two.width * 0.5, y: two.height * 0.5 };
      const dest = { scale: two.width / 50 };

      /**
       * [setPosition description]
       */
      function setPosition() {
        origin.x = two.width * 0.5;
        origin.y = two.height * 0.5;
      }

      /**
      * [setup description]
      * @return {[type]} [description]
      */
      function setup() {
        const playing = false;

        const sides = index;
        const rPolygon = 100;
        const rCircle = 3;

        const shape = two.makePolygon(
          0,
          0,
          rPolygon,
          sides,
        );
        shape.stroke = pallete[6];
        shape.linewidth = 1;
        shape.noFill();

        const circles = range(sides).map((i) => {
          const pct = (i + 0.5) / sides;
          const theta = (TWO_PI * pct) + (Math.PI / 2);
          const x = rPolygon * cos(theta);
          const y = rPolygon * sin(theta);
          const circle = two.makeCircle(x, y, rCircle);
          circle.fill = pallete[6];
          circle.noStroke();
          return circle;
        });


        const group = two.makeGroup(shape).add(circles);
        group.scale = 0;

        const ani = new TWEEN.Tween(group)
        .to(dest, duration)
        .easing(TWEEN.Easing.Circular.In)
        .onStart(() => {
          console.log('start animation');
          console.log(dest);
        })
        .onUpdate(() => {
          console.log(group.scale);
        });

        return {
          playing,
          group,
          ani,
        };
      }

      let { playing, group, ani } = setup();

      // methods
      const resize = () => {
        setPosition();
        two.remove(group);
        ({ playing, group, ani } = setup());
      };

      const reset = () => {
        playing = false;
        ani.stop();
        setPosition();
        group.scale = 0;
        group.translation.set(
          origin.x,
          origin.y,
        );
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
      return EXPORT;
    });
  }());

  /**
   * Animation #4, Piston
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makePistons(opacity = 1, duration = 500) {
    [0, 4, 8].forEach((amount) => {
      const param = { ending: 0, beginning: 0 };
      let begin;
      let end;

      /**
       * [setDirection description]
       */
      function setDirection() {
        origin.x = two.width * 0.5;
        origin.y = two.height * 0.5;
      }

      /**
      * [setup description]
      * @return {[type]} [description]
      */
      function setup() {
        let playing = false;

        const w = two.width * 0.75;
        const h = two.height * 0.5;

        const group = two.makeGroup;
        group.translation.set(two.width * 0.5, two.height * 0.5);


        const shapes = range(amount).map((i) => {
          const d = (h / amount) - (h / (amount * 3));
          const x = 0;
          const y = (-h / 2) + ((i + 1) * (h / (amount + 1)));

          const shape = two.makeRectangle(x, y, w, d);
          shape.fill(pallete[7]);
          shape.noStroke();

          group.add(shape);
          return shape;
        });

        const aniOut = new TWEEN.Tween(param)
          .to({ beginning: 1.0 }, duration * 0.125)
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .onUpdate(() => {
            for (let i = 0; i < amount; i += 1) {
              const points = shapes[i].vertices;
              points[1].x = end * param.beginning;
              points[2].x = end * param.beginning;
            }
          });

        const aniIn = new TWEEN.Tween(param)
          .to({ ending: 1.0 }, duration * 0.125)
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .onStart(() => {
            playing = true;
          })
          .onUpdate(() => {
            for (let i = 0; i < amount; i += 1) {
              const points = shapes[i].vertices;
              points[3].x = end * param.ending;
              points[0].x = end * param.ending;
            }
          })
          .onComplete(() => {
            aniOut.start();
          });

        return {
          playing,
          group,
          shapes,
          aniIn,
          aniOut,
        };
      }

      let { playing, group, shapes, aniIn, aniOut } = setup();

      // methods
      const resize = () => {
        setDirection();
        two.remove(group);
        ({ playing, group, shapes, aniIn, aniOut } = setup());
      };

      const reset = () => {
        playing = false;
        ani.stop();
        setDirection();
        group.scale = 0;
        group.translation.set(
          origin.x,
          origin.y,
        );
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
      return EXPORT;
    });
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
