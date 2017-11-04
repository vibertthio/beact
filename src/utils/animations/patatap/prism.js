import {
  TWO_PI,
  cos,
  sin,
  max,
  range,
} from 'config/animation.config';

/**
 * Animation #3, 4
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [index = 3]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 500]
 */
export default function prism(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  index = 3,
  opacity = 1,
  duration = 500,
  ) {
  const origin = { x: two.width * 0.5, y: two.height * 0.5 };
  const dest = { scale: max(two.width, two.height) / 40 };

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
    shape.stroke = colors[6];
    shape.linewidth = 1;
    shape.noFill();

    const circles = range(sides).map((i) => {
      const pct = (i + 0.5) / sides;
      const theta = (TWO_PI * pct) + (Math.PI / 2);
      const x = 2 * rPolygon * cos(theta);
      const y = 2 * rPolygon * sin(theta);
      const circle = two.makeCircle(x, y, rCircle);
      circle.fill = colors[6];
      circle.noStroke();
      return circle;
    });


    const group = two.makeGroup(shape).add(circles);
    group.scale = 0;

    const ani = new TWEEN.Tween(group)
      .to(dest, duration)
      .easing(TWEEN.Easing.Circular.In);

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
}
