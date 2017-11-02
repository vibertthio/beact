import {
  min,
  range,
  lerp,
  map,
} from 'config/animation.config';

/**
* Animation #13, Splash Colorful
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color pallete
* @param  {array} animations It's the stack of animations
* @param  {number} [opacity = 1]
* @param  {number} [duration = 1000]
*/
export default function splashColorful(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 1000,
  ) {
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
      circle.fill = colors[i % colors.length];
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
}
