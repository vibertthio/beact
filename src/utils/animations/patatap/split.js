import {
  TWO_PI,
  cos,
  sin,
  min,
  ease,
} from 'config/animation.config';

/**
 * Animation #18, Split
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 500]
 */
export default function split(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 500,
  ) {
  let playing = false;
  let distance = two.height / 5;
  const amount = 30;
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
    points = [];
    for (let i = 0; i < amount; i += 1) {
      const pct = i / last;
      const theta = pct * Math.PI;
      const x = radius * cos(theta);
      const y = radius * sin(theta);
      const p = new Two.Anchor(x, y);
      points.push(p);
    }
    shapes[0] = two.makePath(points);
    shapes[0].origin = new Two.Vector().copy(shapes[0].translation);

    // second hemisphere
    points = [];
    for (let i = 0; i < amount; i += 1) {
      const pct = i / last;
      const theta = (pct + 1) * Math.PI;
      const x = radius * cos(theta);
      const y = radius * sin(theta);
      const p = new Two.Anchor(x, y);
      points.push(p);
    }
    shapes[1] = two.makePath(points);
    shapes[1].origin = new Two.Vector().copy(shapes[1].translation);

    const group = two.makeGroup(shapes);
    group.translation.set(two.width * 0.5, two.height * 0.5);
    group.fill = colors[2];
    group.stroke = colors[2];
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
}
