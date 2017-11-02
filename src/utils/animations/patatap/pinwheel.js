import {
  TWO_PI,
  min,
  range,
} from 'config/animation.config';

/**
 * Animation #16, Pinwheel
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 300]
 */
export default function pinwheel(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 300,
  ) {
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
    shape.fill = colors[3];
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

    range(amount).forEach((i) => {
      const index = i + 1;
      const center = Math.PI * (index / amount);
      const parallel = [];
      range(amount).forEach((j) => {
        const pct = min(j / index, 1.0);
        const theta = (pct * endAngle) + startAngle + center + drift;
        const p = points[j];
        const xpos = distance * Math.cos(theta);
        const ypos = distance * Math.sin(theta);

        const tween = new TWEEN.Tween(p)
          .to({ x: xpos, y: ypos }, duration * 0.3)
          .easing(TWEEN.Easing.Sinusoidal.Out);

        parallel.push(tween);
      });
      const tween = parallel[0];
      tween.onComplete(() => {
        const paral = sequence[index];
        if (Array.isArray(paral)) {
          paral.forEach(p => p.start());
        } else {
          aniOut.start();
        }
      });
      sequence.push(parallel);
    });

    const aniIn = {
      start: () => {
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
}
