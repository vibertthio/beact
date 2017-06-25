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
      destIn.y = two.height * 0.5;
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
      // console.log(destOut);
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
