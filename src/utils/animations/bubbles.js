import {
  TWO_PI,
  range,
  min,
} from '../config/animation.config';

/**
 * Animation #23, Bubbles
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 250]
 */
export default function bubbles(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 250,
  ) {
  let playing = false;
  const amount = 24;
  const last = amount - 1;
  let radius = min(two.width, two.height) * 0.33;
  let bubbleRadius = min(two.width, two.height) / 90;
  let direction = false;

  /**
   * [setPoints description]
   */
  function setCircles() {

  }
  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    const circles = range(amount).map((i) => {
      const pct = i / last;
      const circle = two.makeCircle(radius, 0, bubbleRadius);
      circle.theta = 0;
      circle.destination = pct * TWO_PI;
      return circle;
    });
    setCircles();
    const group = two.makeGroup(circles);
    group.noStroke();
    group.fill = colors[6];
    group.translation.set(two.width * 0.5, two.height * 0.5);
    group.visible = false;
    const aniOuts = circles.map((c, i) => {
      const next =
        (!circles[i + 1]) ?
        TWO_PI : (circles[i + 1].destination);

      return new TWEEN.Tween(c)
        .to({ theta: next }, duration / (amount - (i)))
        .onUpdate(() => {
          const theta = direction ? c.theta : -c.theta;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          c.translation.set(x, y);
        })
        .onComplete(() => {
          circles[i].visible = false;
          if (i < last) {
            aniOuts[i + 1].start();
            if (i === last - 1) {
              group.visible = false;
            }
          }
        });
    });

    const aniIns = circles.map((c, i) =>
      new TWEEN.Tween(c)
        .to({ theta: c.destination }, duration / (i + 1))
        .onStart(() => {
          circles[i].visible = true;
        })
        .onUpdate(() => {
          const theta = direction ? c.theta : -c.theta;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          c.translation.set(x, y);
        })
        .onComplete(() => {
          if (i >= last) {
            aniOuts[0].start();
            return;
          }

          const next = circles[i + 1];
          const tween = aniIns[i + 1];
          next.theta = c.theta;
          next.translation.copy(c.translation);
          tween.start();
        }),
    );


    const aniOut = {
      stop: () => {
        aniOuts.forEach(a => a.stop());
      },
    };

    const aniIn = {
      start: () => {
        aniIns[0].start();
      },
      stop: () => {
        aniIns.forEach(a => a.stop());
      },
    };


    return {
      group,
      circles,
      aniIn,
      aniOut,
    };
  }

  let { group, circles, aniIn, aniOut } = setup();

  // methods
  const resize = () => {
    group.remove(circles);
    two.remove(group);
    radius = min(two.width, two.height) * 0.33;
    bubbleRadius = min(two.width, two.height) / 90;
    direction = TWO_PI * Math.random() > 0.5;
    ({ group, circles, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
    group.visible = false;
    group.rotation = TWO_PI * Math.random();
    for (let i = 0; i < amount; i += 1) {
      const pct = i / last;
      const circle = circles[i];
      circle.translation.set(radius, 0);
      circle.theta = 0;
      circle.destination = pct * TWO_PI;
    }
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
