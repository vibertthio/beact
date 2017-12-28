import {
  min,
  range,
} from 'config/animation.config';

/**
 * Animation #17, Glimmer
 * random size, x, y, color circles.
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function makeGlimmer(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400,
  ) {
  let playing = false;
  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
		const amount = 12;
		let longest = 0;

    const anis = [];

		const circles = range(amount).map(() => {
			const r = Math.floor(min(two.width, two.height) *
        ((1 + (Math.random() * 0.5)) / 40));
      const delay = Math.random() * duration * 0.5;
			const circle = two.makeCircle(two.width * Math.random(), two.height * Math.random(), r);
      circle.noFill();
      circle.linewidth = 0;
      circle.visible = false;
      anis.push(new TWEEN.Tween(circle)
        .to({ scale: 1, linewidth: 0 }, duration * 1.5)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onComplete(() => {
          circle.visible = false;
        })
        .onStop(() => {
          circle.visible = false;
        }));

      if (longest < delay) {
        longest = delay;
      }

      return circle;
		});
    const ani = {
      start: () => {
        anis.forEach(a => a.start());
      },
      stop: () => {
        anis.forEach(a => a.stop());
      },
    };

    return {
      circles,
      ani,
    };
  }

  let { circles, ani } = setup();

  // methods
  const resize = () => {
    two.remove(circles);
    ({ circles, ani } = setup());
  };

  const reset = () => {
    playing = false;
    ani.stop();
    for (let i = 0; i < circles.length; i += 1) {
      const c = circles[i];
      c.visible = false;
      c.translation.set(two.width * Math.random(), two.height * Math.random());
      c.stroke = colors[i % colors.length];
      c.scale = (Math.random() * 0.5) + 0.2;
      c.linewidth = ((Math.random() + 0.5) + 1) * 8;
    }
  };

  const start = () => {
    reset();
    playing = true;
    for (let i = 0; i < circles.length; i += 1) {
      const c = circles[i];
      c.visible = true;
    }
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
