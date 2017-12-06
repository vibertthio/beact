import {
  TWO_PI,
  range,
  angleBetween,
  lerp,
} from 'config/animation.config';

/**
* Animation #8, Clay
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color palette
* @param  {array} animations It's the stack of animations
* @param  {number} [opacity = 1]
* @param  {number} [duration = 1000]
*/
export default function clay(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 1000,
  ) {
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

    const shape = two.makeCurve(points);
    // shape.fill = colors[1];
    shape.fill = colors[4];
    shape.noStroke();
    shape.visible = false;
    points = shape.vertices;

    const ani = new TWEEN.Tween(param)
      .to({ ending: 1 }, duration)
      .easing(TWEEN.Easing.Circular.In)
      .onUpdate(() => {
        const t = param.ending;
        for (let i = 0; i < amount; i += 1) {
          const v = points[i];
          const d = destinations[i];
          const x = lerp(v.x, d.x, t);
          const y = lerp(v.y, d.y, t);
          v.set(x, y);
        }
      })
      .onComplete(() => {
        shape.visible = false;
      });

    return {
      shape,
      ani,
    };
  }

  let { shape, ani } = setup();

  // methods
  const resize = () => {
    two.remove(shape);
    ({ shape, ani } = setup());
  };

  const reset = () => {
    shape.visible = false;
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

    shape.translation.set(x, y);
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
    shape.visible = true;
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
}
