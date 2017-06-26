import Two from 'two.js/build/two.svg.webpack';
import TWEEN from '@tweenjs/tween.js';
import _ from 'lodash';

/**
 * Math Definition
 */
const TWO_PI = Math.PI * 2;
const cos = Math.cos;
const sin = Math.sin;
const min = Math.min;

/**
 * Range
 * like range function in lodash
 * @param  {number} n [description]
 * @return {Array}   [description]
 */
function range(n) {
  return Array.from(Array(n).keys());
}

/**
 * [angleBetween description]
 * @param  {[type]} v1 [description]
 * @param  {[type]} v2 [description]
 * @return {[type]}    [description]
 */
function angleBetween(v1, v2) {
  const dx = v2.x - v1.x;
  const dy = v2.y - v2.y;
  return Math.atan2(dy, dx);
}

/**
 * lerp
 * @param  {number} a [description]
 * @param  {number} b [description]
 * @param  {number} t [description]
 * @return {number}   [description]
 */
function lerp(a, b, t) {
  return ((b - a) * t) + a;
}

/**
 * [map description]
 * @param  {[type]} v  [description]
 * @param  {[type]} i1 [description]
 * @param  {[type]} i2 [description]
 * @param  {[type]} o1 [description]
 * @param  {[type]} o2 [description]
 * @return {[type]}    [description]
 */
function map(v, i1, i2, o1, o2) {
  return o1 + ((o2 - o1) * ((v - i1) / (i2 - i1)));
}

/**
 * [ease description]
 * @param  {[type]} cur  [description]
 * @param  {[type]} dest [description]
 * @param  {[type]} t    [description]
 * @return {[type]}      [description]
 */
function ease(cur, dest, t) {
  const d = dest - cur;
  if (Math.abs(d) <= 0.0001) {
    return dest;
  } else {
    return cur + (d * t);
  }
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
      shape.noStroke();
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

    /**
     * [setDirection description]
     */
    function setDirection() {
      const direction = (Math.random() > 0.5);
      origin.x = two.width * 0.5;
      origin.y = two.height * (direction ? 1.5 : -0.5);
      destIn.y = two.height * 0.5;
      destOut.y = two.height * (direction ? -0.5 : 1.5);
    }

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
      shape.noStroke();
      shape.fill = pallete[3];

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
   * Animation #2, 3, 4, Prisms
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
   * Animation #5, 6, 7, Pistons
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makePistons(opacity = 1, duration = 2000) {
   [1, 4, 8].forEach((amount) => {
     const param = { ending: 0, beginning: 0 };
     const origin = { x: two.width * 0.5, y: two.height * 0.5 };
     let begin;
     let end;

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
       let playing = false;

       const w = two.width * 0.75;
       const h = two.height * 0.5;
       begin = -w / 2;
       end = w / 2; // do random here

       const group = two.makeGroup();
       group.translation.set(two.width * 0.5, two.height * 0.5);

       const shapes = range(amount).map((i) => {
         const d = (h / amount) - (h / (amount * 3));
         const x = 0;
         const y = (-h / 2) + ((i + 1) * (h / (amount + 1)));

         const shape = two.makeRectangle(x, y, w, d);
         shape.fill = pallete[6];
         shape.noStroke();
         shape.visible = false;

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
       setPosition();
       group.remove(shapes);
       two.remove(group);
       ({ playing, group, shapes, aniIn, aniOut } = setup());
     };

     const reset = () => {
       param.beginning = 0;
       param.ending = 0;

       for (let i = 0; i < amount; i += 1) {
         const s = shapes[i];
         s.visible = true;
         s.vertices[0].x = begin;
         s.vertices[1].x = begin;
         s.vertices[2].x = begin;
         s.vertices[3].x = begin;
       }

       playing = false;
       aniIn.stop();
       aniOut.stop();
       setPosition();
       group.translation.set(
         origin.x,
         origin.y,
       );
     };


     const start = () => {
       reset();
       playing = true;
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
   });
  }());

  /**
  * Animation #8, Clay
  * @param  {number} [opacity = 1]
  * @param  {number} [duration = 400]
  * @return {Object}
  */
  (function makeClay(opacity = 1, duration = 1000) {
    let playing = false;
    const amount = (Math.floor(Math.random()) * 8) + 8;
    const param = { ending: 0 };
    let points = [];
    const destinations = [];
    let distance = two.height;

    /**
    * [setup description]
    * @return {[type]} [description]
    */
    function setup() {
      points = range(amount).map((i) => {
        const pct = i / amount;
        const theta = TWO_PI * pct;
        const x = distance * Math.sin(theta);
        const y = distance * Math.cos(theta);
        destinations.push(new Two.Vector(x, y));
        return new Two.Anchor(x, y);
      });

      const clay = two.makeCurve(points);
      clay.fill = pallete[7];
      clay.noStroke();
      points = clay.vertices;

      const ani = new TWEEN.Tween(param)
        .to({ ending: 1 }, duration)
        .easing(TWEEN.Easing.Circular.In)
        .onUpdate(() => {
          const t = param.ending;
          console.log(t);
          for (let i = 0; i < amount; i += 1) {
            const v = points[i];
            const d = destinations[i];
            const x = lerp(v.x, d.x, t);
            const y = lerp(v.y, d.y, t);
            v.set(x, y);
          }
        })
        .onComplete(() => {
          clay.visible = false;
        });

      return {
        clay,
        ani,
      };
    }

    const { clay, ani } = setup();

    // methods
    const resize = () => {};

    const reset = () => {
      clay.visible = false;
      const impact = new Two.Vector(
        Math.random() * two.width,
        Math.random() * two.height,
      );
      let x;
      let y;
      const pos = Math.random() * 8;

      if (pos > 7) {
        // north
        x = two.width / 2;
        y = 0;
      } else if (pos > 6) {
        // north-west
        x = 0;
        y = 0;
      } else if (pos > 5) {
        // west
        x = 0;
        y = two.height / 2;
      } else if (pos > 4) {
        // south-west
        x = 0;
        y = two.height;
      } else if (pos > 3) {
        // south
        x = two.width / 2;
        y = two.height;
      } else if (pos > 2) {
        // south-east
        x = two.width;
        y = two.height;
      } else if (pos > 1) {
        // east
        x = two.width;
        y = two.height / 2;
      } else {
        x = two.width;
        y = 0;
      }

      clay.translation.set(x, y);
      param.ending = 0;
      distance = two.height;

      for (let i = 0; i < amount; i += 1) {
        const v = points[i];
        const pct = i / amount;
        const ptheta = pct * TWO_PI;
        v.set(distance * Math.cos(ptheta), distance * Math.sin(ptheta));
        const theta = angleBetween(v, impact) - ptheta;
        const d = v.distanceTo(impact);
        const a = (10 * distance) / Math.sqrt(d);
        x = (a * Math.cos(theta)) + v.x;
        y = (a * Math.sin(theta)) + v.y;
        destinations[i].set(x, y);
      }

      ani.stop();
      playing = false;
    };

    const start = () => {
      reset();
      playing = true;
      clay.visible = true;
      ani.start();
    };

    reset();
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
   * Animation #9, 10, 11, Flash
   * it will have two direction(u/d), which will be decided randomly
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeFlashes(opacity = 1, duration = 400) {
    range(3).map(() => {
      let playing = false;
      const param = { t: 0 };

      /**
      * [setup description]
      * @return {[type]} [description]
      */
      function setup() {
        const shape = two.makeRectangle(
          two.width * 0.5,
          two.height * 0.5,
          two.width,
          two.height,
        );
        shape.visible = 0;
        shape.noStroke();
        shape.fill = pallete[5];

        const ani = new TWEEN.Tween(param)
          .to({ t: 1 }, duration)
          .easing(TWEEN.Easing.Linear.None)
          .onUpdate(() => {
            shape.visible = Math.random() > 0.5;
          })
          .onComplete(() => {
            shape.visible = false;
          });

        return { shape, ani };
      }

      let { shape, ani } = setup();

      // methods
      const resize = () => {
        two.remove(shape);
        ({ shape, ani } = setup());
      };

      const reset = () => {
        ani.stop();
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
  * Animation #12, Splash
  * @param  {number} [opacity = 1]
  * @param  {number} [duration = 400]
  * @return {Object}
  */
  (function makeSplash(opacity = 1, duration = 1000) {
    let playing = false;
    const amount = 16;
    const param = { t: 0 };
    let circles = [];
    const destinations = [];

    /**
    * [setup description]
    * @return {[type]} [description]
    */
    function setup() {
      const rMin = min(two.width, two.height) * (12 / 900);
      const rMax = min(two.width, two.height) * (20 / 900);

      const group = two.makeGroup();
      group.translation.set(two.width * 0.5, two.height * 0.5);

      circles = range(amount).map(() => {
        const r = Math.round(map(Math.random(), 0, 1, rMin, rMax));
        const circle = two.makeCircle(0, 0, r);
        circle.fill = pallete[4];
        circle.noStroke();
        destinations.push(new Two.Vector());

        group.add(circle);
        return circle;
      });

      group.visible = false;

      const ani = new TWEEN.Tween(param)
      .to({ t: 1.0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(() => {
        const t = param.t;
        for (let i = 0; i < amount; i += 1) {
          const c = circles[i];
          const d = destinations[i];
          const x = lerp(c.translation.x, d.x, t);
          const y = lerp(c.translation.y, d.y, t);
          c.translation.set(x, y);
        }
      })
      .onComplete(() => {
        group.visible = false;
      });

      return {
        group,
        ani,
      };
    }

    let { group, ani } = setup();

    // methods
    const resize = () => {
      group.remove(circles);
      two.remove(group);
      ({ group, ani } = setup());
    };

    const reset = () => {
      playing = false;
      group.visible = false;
      ani.stop();
      const theta = Math.random() * TWO_PI;
      const deviation = map(Math.random(), 0, 1, Math.PI / 4, Math.PI / 2);
      param.t = 0;
      for (let i = 0; i < amount; i += 1) {
        const c = circles[i];
        const t = theta + (((Math.random() * 2) - 1) * deviation);
        const a = Math.random() * two.height;
        const x = a * Math.cos(t);
        const y = a * Math.sin(t);
        destinations[i].set(x, y);

        c.visible = false;
        c.translation.set(0, 0);
      }

      group.translation.set(
        two.width * 0.5,
        two.height * 0.5,
      );
    };


    const start = () => {
      reset();
      playing = true;
      group.visible = true;
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
  }());

  /**
  * Animation #13, Splash Colorful
  * @param  {number} [opacity = 1]
  * @param  {number} [duration = 400]
  * @return {Object}
  */
  (function makeSplashColorful(opacity = 1, duration = 1000) {
    let playing = false;
    const amount = 32;
    const param = { t: 0 };
    let circles = [];
    const destinations = [];

    /**
    * [setup description]
    * @return {[type]} [description]
    */
    function setup() {
      const rMin = min(two.width, two.height) * (12 / 900);
      const rMax = min(two.width, two.height) * (20 / 900);

      const group = two.makeGroup();
      group.translation.set(two.width * 0.5, two.height * 0.5);

      circles = range(amount).map((i) => {
        const r = Math.round(map(Math.random(), 0, 1, rMin, rMax));
        const circle = two.makeCircle(0, 0, r);
        circle.fill = pallete[i % pallete.length];
        circle.noStroke();
        destinations.push(new Two.Vector());

        group.add(circle);
        return circle;
      });

      group.visible = false;

      const ani = new TWEEN.Tween(param)
      .to({ t: 1.0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(() => {
        const t = param.t;
        for (let i = 0; i < amount; i += 1) {
          const c = circles[i];
          const d = destinations[i];
          const x = lerp(c.translation.x, d.x, t);
          const y = lerp(c.translation.y, d.y, t);
          c.translation.set(x, y);
        }
      })
      .onComplete(() => {
        group.visible = false;
      });

      return {
        group,
        ani,
      };
    }

    let { group, ani } = setup();

    // methods
    const resize = () => {
      group.remove(circles);
      two.remove(group);
      ({ group, ani } = setup());
    };

    const reset = () => {
      playing = false;
      group.visible = false;
      ani.stop();
      const pos = Math.random() * 4;
      let ox;
      let oy;
      if (pos > 3) {
        // west
        ox = -two.width * 0.125;
        oy = two.height * 0.5;
      } else if (pos > 2) {
        // east
        ox = two.width * 1.125;
        oy = two.height * 0.5;
      } else if (pos > 1) {
        // north
        ox = two.width * 0.5;
        oy = -two.height * 0.125;
      } else {
        // west
        ox = two.width * 0.5;
        oy = two.height * 1.125;
      }

      const theta = Math.atan2((two.height * 0.5) - oy, (two.width * 0.5) - ox);
      const deviation = map(Math.random(), 0, 1, Math.PI / 4, Math.PI / 2);
      param.t = 0;
      for (let i = 0; i < amount; i += 1) {
        const c = circles[i];
        const t = theta + (((Math.random() * 2) - 1) * deviation);
        const a = Math.random() * two.height;
        const x = a * Math.cos(t);
        const y = a * Math.sin(t);
        destinations[i].set(x, y);

        c.visible = false;
        c.translation.set(0, 0);
      }

      group.translation.set(ox, oy);
    };


    const start = () => {
      reset();
      playing = true;
      group.visible = true;
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
  }());

  /**
   * Animation #14, Sunrise
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeSunrise(opacity = 1, duration = 400) {
    let playing = false;
    const origin = { x: two.width * 0.5, y: two.height * 1.5 };
    const dest = { y: two.height * 0.5 };

    /**
     * [setDirection description]
     */
    function setOrigin() {
      if (Math.random() > 0.5) {
        origin.x = two.width * (1 / 3);
      } else {
        origin.x = two.width * (2 / 3);
      }

      if (Math.random() > 0.5) {
        origin.y = two.height * (-0.5);
      } else {
        origin.y = two.height * (1.5);
      }

      dest.y = two.height * 0.5;
    }

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      const radius = min(two.width, two.height) * 0.25;

      const circle = two.makeCircle(origin.x, origin.y, radius);
      circle.noStroke();
      circle.fill = pallete[4];

      const aniOut = new TWEEN.Tween(circle)
        .to({ scale: 0 }, duration)
        .easing(TWEEN.Easing.Circular.Out)
        .onComplete(() => {
          playing = false;
        });
      const aniIn = new TWEEN.Tween(circle.translation)
        .to(dest, duration)
        .easing(TWEEN.Easing.Circular.Out)
        .onStart(() => {
          circle.scale = 1;
          console.log('circle start');
          console.log(`opacity : ${circle.opacity}`);
          console.log(`scale : ${circle.scale}`);
          console.log(`x : ${circle.translation.x}`);
          console.log(`y : ${circle.translation.y}`);
        })
        .onComplete(() => {
          aniOut.start();
        });
      return {
        circle,
        aniIn,
        aniOut,
      };
    }

    let { circle, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      setOrigin();
      two.remove(circle);
      ({ circle, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      aniIn.stop();
      aniOut.stop();
      setOrigin();
      circle.translation.set(
        origin.x,
        origin.y,
      );
    };

    const start = () => {
      reset();
      playing = true;
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
   * Animation #15, Timer
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeTimer(opacity = 1, duration = 400) {
    let playing = false;
    let direction = true;
    const amount = 32;
    let radius = min(two.width, two.height) * 0.33;
    const options = { beginning: 0, ending: 0 };

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      const points = range(amount).map((i) => {
        const pct = i / (amount - 1);
        const theta = pct * TWO_PI;
        return new Two.Anchor(
          radius * cos(theta),
          radius * sin(theta),
        );
      });

      points.push(
        points[0].clone(),
        // points[1].clone(),
      );

      const timer = two.makeCurve(points, true);
      timer.stroke = pallete[4];
      timer.cap = 'butt';
      timer.linewidth = min(two.width, two.height) / 10;
      timer.noFill();
      timer.translation.set(two.width * 0.5, two.height * 0.5);
      timer.visible = false;

      const aniOut = new TWEEN.Tween(options)
        .to({ beginning: 1 }, duration)
        .easing(TWEEN.Easing.Sinusoidal.In)
        .onUpdate(() => {
          if (direction) {
            timer.beginning = options.beginning;
          } else {
            timer.ending = 1 - options.beginning;
          }
        })
        .onComplete(() => {
          playing = false;
        });
      const aniIn = new TWEEN.Tween(options)
        .to({ ending: 1 }, duration)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => {
          if (direction) {
            timer.ending = options.ending;
          } else {
            timer.beginning = 1 - options.ending;
          }
        })
        .onComplete(() => {
          aniOut.start();
        });
      return {
        timer,
        aniIn,
        aniOut,
      };
    }

    let { timer, aniIn, aniOut } = setup();

    /**
     * [setDirection description]
     */
    function setDirection() {
      direction = (Math.random() > 0.5);
      timer.rotation = Math.random() * TWO_PI;
    }

    // methods
    const resize = () => {
      two.remove(timer);
      radius = min(two.width, two.height) * 0.33;
      ({ timer, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      setDirection();
      timer.visible = false;
      aniIn.stop();
      aniOut.stop();
      options.beginning = 0;
      options.ending = 0;
      timer.beginning = direction ? 0 : 1;
      timer.ending = direction ? 0 : 1;
    };

    const start = () => {
      reset();
      playing = true;
      timer.visible = true;
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
   * Animation #16, Pinwheel
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makePinwheel(opacity = 1, duration = 300) {
    let playing = false;
    let distance = two.height / 5;
    const amount = 8;
    const startAngle = 0;
    const endAngle = TWO_PI;
    const drift = Math.random() * TWO_PI;

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      const shape = two.makePolygon(
        two.width * 0.5,
        two.height * 0.5,
        distance,
        amount,
      );
      shape.fill = pallete[4];
      shape.noStroke();
      const points = shape.vertices;
      shape.visible = false;

      const sequence = [];

      const aniOut = new TWEEN.Tween(shape)
        .to({ scale: 0 }, duration)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onComplete(() => {
          playing = false;
        });

      _.each(_.range(amount), (i) => {
        const index = i + 1;
        const center = Math.PI * (index / amount);
        const parallel = [];
        _.each(_.range(amount), (j) => {
          const pct = min(j / index, 1.0);
          const theta = (pct * endAngle) + startAngle + center + drift;
          const p = points[j];
          const xpos = distance * Math.cos(theta);
          const ypos = distance * Math.sin(theta);

          const tween = new TWEEN.Tween(p)
            .to({ x: xpos, y: ypos }, duration * 0.3)
            .onStart(() => {
              if (j === 0) {
                console.log(`${i} animation start`);
              } else {
                console.log(j);
              }
            })
            .onUpdate(() => {
              if (j === 0) {
                // console.log(`x : ${p.x}`);
                console.log(`y : ${p.y}`);
              }
            })
            .easing(TWEEN.Easing.Sinusoidal.Out);

          parallel.push(tween);
        });
        const tween = parallel[0];
        tween.onComplete(() => {
          const paral = sequence[index];
          if (_.isArray(paral)) {
            _.each(paral, p => p.start());
          } else {
            aniOut.start();
          }
        });
        sequence.push(parallel);
      });

      const aniIn = {
        start: () => {
          console.log('aniIn start');
          for (let i = 0, n = sequence[0].length; i < n; i += 1) {
            const tween = sequence[0][i];
            tween.start();
          }
        },
        stop: () => {
          sequence.forEach((p) => {
            p.forEach((t) => {
              t.stop();
            });
          });
        },
      };

      return {
        shape,
        points,
        aniIn,
        aniOut,
      };
    }

    let { shape, points, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      two.remove(shape);
      distance = two.height / 5;
      ({ shape, points, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      points.forEach((p) => {
        p.set(
          distance * Math.cos(startAngle),
          distance * Math.sin(startAngle),
        );
      });
      shape.visible = false;
      shape.rotation = Math.random() * TWO_PI;
      shape.scale = 1;
      // shape._update();
      aniIn.stop();
      aniOut.stop();
    };

    const start = () => {
      reset();
      playing = true;
      shape.visible = true;
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
   * Animation #17, Glimmer
   * random size, x, y, color circles.
   */
	(function makeGlimmer(opacity = 1, duration = 400) {
    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      const playing = false;
			const amount = 12;
      // const r1 = (two.height * 20) / 900;
      // const r2 = (two.height * 40) / 900;

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
      for (i = 0; i < circles.length; i += 1) {
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

  /**
   * Animation #18, Split
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeSplit(opacity = 1, duration = 500) {
    let playing = false;
    let distance = two.height / 5;
    const amount = 25;
    const last = amount - 1;
    const param = { ending: 0, beginning: 0 };

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      const shapes = [];
      let points;
      const radius = min(two.width, two.height) * 0.33;

      // first hemisphere
      shapes[0] = two.makePolygon(
        0,
        0,
        distance,
        amount,
      );


      points = shapes[0].vertices;
      points.forEach((p, i) => {
        const pct = i / last;
        const theta = pct * Math.PI;
        p.set(
          radius * Math.cos(theta),
          radius * Math.sin(theta),
        );
      });
      shapes[0].origin = new Two.Vector().copy(shapes[0].translation);

      // second hemisphere
      shapes[1] = two.makePolygon(
        0,
        0,
        distance,
        amount,
      );

      points = shapes[1].vertices;
      points.forEach((p, i) => {
        const pct = i / last;
        const theta = (pct + 1) * Math.PI;
        p.set(
          radius * Math.cos(theta),
          radius * Math.sin(theta),
        );
      });
      shapes[1].origin = new Two.Vector().copy(shapes[1].translation);

      const group = two.makeGroup(shapes);
      group.translation.set(two.width * 0.5, two.height * 0.5);
      group.fill = pallete[4];
      group.stroke = pallete[4];
      group.visible = false;
      const aniOut = new TWEEN.Tween(param)
        .to({ beginning: 0 }, duration)
        .easing(TWEEN.Easing.Circular.Out)
        .delay(duration * 0.5)
        .onUpdate((t) => {
          shapes[0].translation.y =
            ease(shapes[0].translation.y, shapes[0].origin.y + distance, 0.3);
          shapes[1].translation.y =
            ease(shapes[1].translation.y, shapes[1].origin.y - distance, 0.3);
          group.opacity = 1 - t;
        });

      const aniIn = new TWEEN.Tween(param)
        .to({ ending: 1.0 }, duration)
        .easing(TWEEN.Easing.Circular.In)
        .onUpdate((t) => {
          group.visible = Math.random() < t;
        })
        .onComplete(() => {
          group.visible = true;
          aniOut.start();
        });

      return {
        group,
        shapes,
        aniIn,
        aniOut,
      };
    }

    let { group, shapes, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      group.remove(shapes);
      two.remove(group);
      distance = two.height / 5;
      ({ group, shapes, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      param.ending = 0;
      param.beginning = 0;
      group.rotation = Math.random() * TWO_PI;
      group.visible = false;
      group.opacity = 1;
      shapes[0].translation.copy(shapes[0].origin);
      shapes[1].translation.copy(shapes[1].origin);
      aniIn.stop();
      aniOut.stop();
    };

    const start = () => {
      reset();
      playing = true;
      group.visible = true;
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
   * Animation #19, Moon
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeMoon(opacity = 1, duration = 500) {
    let playing = false;
    const amount = 42;
    const half = amount * 0.5;
    let radius = min(two.width, two.height) * 0.33;
    const param = { ending: 0, beginning: 0 };

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      // first hemisphere
      const moon = two.makePolygon(
        two.width * 0.5,
        two.height * 0.5,
        radius,
        amount,
      );
      moon.fill = pallete[4];
      moon.noStroke();

      const points = moon.vertices;
      const destinations = [];
      points.forEach((p, i) => {
        const pct = i / (amount - 1);
        const theta = pct * TWO_PI;
        const x = radius * Math.cos(theta);
        const y = radius * Math.sin(theta);
        p.set(x, Math.abs(y));
        destinations.push(new Two.Anchor(x, y));
      });

      const aniOut = new TWEEN.Tween(param)
        .to({ beginning: 0 }, duration)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate((t) => {
          for (let i = 0; i < half; i += 1) {
            points[i].y = lerp(points[i].y, -(destinations[i].y), t);
          }
        });

      const aniIn = new TWEEN.Tween(param)
        .to({ ending: 1.0 }, duration)
        .easing(TWEEN.Easing.Sinusoidal.In)
        .onUpdate((t) => {
          for (let i = half; i < amount; i += 1) {
            points[i].y = lerp(points[i].y, destinations[i].y, t);
          }
        })
        .onComplete(() => {
          aniOut.start();
        });

      return {
        moon,
        points,
        destinations,
        aniIn,
        aniOut,
      };
    }

    let { moon, points, destinations, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      two.remove(moon);
      radius = min(two.width, two.height) * 0.33;
      ({ moon, points, destinations, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      moon.visible = false;
      moon.rotation = Math.random() * TWO_PI;
      param.beginning = 0;
      param.ending = 0;
      for (let i = 0; i < amount; i += 1) {
        const v = points[i];
        const pct = i / (amount - 1);
        const theta = pct * TWO_PI;
        const x = radius * Math.cos(theta);
        const y = radius * Math.sin(theta);
        destinations[i].x = x;
        destinations[i].y = y;
        v.set(x, Math.abs(y));
      }

      aniIn.stop();
      aniOut.stop();
    };

    const start = () => {
      reset();
      playing = true;
      moon.visible = true;
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
   * Animation #20, Strike
   * @param  {number} [opacity = 1]
   * @param  {number} [duration = 400]
   * @return {Object}
   */
  (function makeStrike(opacity = 1, duration = 200) {
    let playing = false;
    const amount = 32;
    let distance = min(two.width, two.height) * 0.5;
    const startPoint = { x: 0, y: 0 };
    const endPoint = { x: 0, y: 0 };
    let points;

    /**
     * [setup description]
     * @return {[type]} [description]
     */
    function setup() {
      // first hemisphere
      const line = two.makePolygon(
        two.width * 0.5,
        two.height * 0.5,
        distance,
        amount,
      );
      points = line.vertices;
      line.noFill();
      line.stroke = pallete[4];
      line.cap = 'round';
      line.visible = false;

      const aniOut = new TWEEN.Tween(line)
        .to({ beginning: 1.0 }, duration)
        .easing(TWEEN.Easing.Circular.Out);

      const aniIn = new TWEEN.Tween(line)
        .to({ ending: 1.0 }, duration)
        .easing(TWEEN.Easing.Circular.In)
        .onComplete(() => {
          aniOut.start();
        });

      return {
        line,
        aniIn,
        aniOut,
      };
    }

    let { line, aniIn, aniOut } = setup();

    // methods
    const resize = () => {
      two.remove(line);
      ({ line, aniIn, aniOut } = setup());
    };

    const reset = () => {
      playing = false;
      const rando = Math.random();

      line.linewidth = Math.round(rando * 7) + 3;
      line.visible = false;
      distance = Math.round(map(rando, 0, 1, two.height * 0.5, two.width));

      let theta;
      theta = Math.random() * TWO_PI;
      startPoint.x = distance * Math.cos(theta);
      startPoint.y = distance * Math.sin(theta);
      aniIn.stop();
      aniOut.stop();
      theta += Math.PI;
      endPoint.x = distance * Math.cos(theta);
      endPoint.y = distance * Math.sin(theta);

      for (let i = 0; i < amount; i += 1) {
        const p = points[i];
        const pct = i / (amount - 1);
        p.x = lerp(startPoint.x, endPoint.x, pct);
        p.y = lerp(startPoint.y, endPoint.y, pct);
      }

      line.beginning = 0;
      line.ending = 0;
      aniIn.stop();
      aniOut.stop();
    };

    const start = () => {
      reset();
      playing = true;
      line.visible = true;
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
