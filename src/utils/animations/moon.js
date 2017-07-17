import {
  TWO_PI,
  min,
  lerp,
} from '../config/animation.config';

/**
 * Animation #19, Moon
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 500]
 */
export default function moon(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 500,
  ) {
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
    const shape = two.makePolygon(
      two.width * 0.5,
      two.height * 0.5,
      radius,
      amount,
    );
    shape.fill = colors[2];
    shape.noStroke();
    shape.visible = false;
    // shape.visible = true;

    const points = shape.vertices;
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
      shape,
      points,
      destinations,
      aniIn,
      aniOut,
    };
  }

  let { shape, points, destinations, aniIn, aniOut } = setup();

  // methods
  const resize = () => {
    two.remove(shape);
    radius = min(two.width, two.height) * 0.33;
    ({ shape, points, destinations, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
    shape.visible = false;
    shape.rotation = Math.random() * TWO_PI;
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
}
