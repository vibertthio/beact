import { range } from 'config/animation.config';

/**
 * Animation #5, 6, 7, Pistons
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color palette
 * @param  {array} animations It's the stack of animations
 * @param  {number} [amount = 1]
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 200]
 */
export default function brush(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  amount = 4,
  opacity = 1,
  duration = 200
) {
  const param = { ending: 0, beginning: 0 };
  const origin = { x: two.width * 0.5, y: two.height * 0.5 };
  let begin;
  let end;

  /**
   * [setPosition description]
   */
  function setPosition() {
    origin.x = two.width * 0.6;
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

    const group = two.makeGroup();
    group.translation.set(two.width * 0.5, two.height * 0.5);

    const shapes = range(amount).map(i => {
      const d = h / amount * 0.3;
      const x = 0;
      const y = -h / 2 + (i + 1) * (h / (amount + 1));

      const shape = two.makeRectangle(x, y, w, d);
      const linearGradient = two.makeLinearGradient(
        two.width / 5,
        two.height / 2,
        -two.width / 5,
        two.height / 2,
        new Two.Stop(0, colors[2]),
        new Two.Stop(1, colors[4])
      );
      shape.fill = linearGradient;
      // shape.fill = colors[5];
      shape.noStroke();
      shape.visible = false;

      group.add(shape);
      return shape;
    });

    const aniOut = new TWEEN.Tween(param)
      .to({ beginning: 1.0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(() => {
        for (let i = 0; i < amount; i += 1) {
          const points = shapes[i].vertices;
          points[1].x = end * param.beginning;
          points[2].x = end * param.beginning;
        }
      });

    const aniIn = new TWEEN.Tween(param)
      .to({ ending: 1.0 }, duration)
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
    const w = two.width * 0.75;
    if (Math.random() > 0.5) {
      begin = -w / 2;
      end = w / 2;
    } else {
      begin = w / 2;
      end = -w / 2;
    }

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
    group.rotation = Math.PI * 0.18;
    group.translation.set(origin.x, origin.y);
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
}
