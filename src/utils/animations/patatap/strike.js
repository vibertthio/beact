import {
  TWO_PI,
  min,
  lerp,
  map,
} from 'config/animation.config';

/**
* Animation #20, Strike
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color pallete
* @param  {array} animations It's the stack of animations
* @param  {number} [opacity = 1]
* @param  {number} [duration = 200]
*/
export default function strike(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 200,
  ) {
  let playing = false;
  const amount = 32;
  let distance = min(two.width, two.height) * 0.5;
  const startPoint = { x: 0, y: 0 };
  const endPoint = { x: 0, y: 0 };
  let points;

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    // first hemisphere
    const line = two.makePolygon(
      two.width * 0.5,
      two.height * 0.5,
      distance,
      amount,
    );
    points = line.vertices;
    line.noFill();
    line.stroke = colors[6];
    line.cap = 'round';
    line.visible = false;

    const aniOut = new TWEEN.Tween(line)
      .to({ beginning: 1.0 }, duration)
      .easing(TWEEN.Easing.Circular.Out);

    const aniIn = new TWEEN.Tween(line)
      .to({ ending: 1.0 }, duration)
      .easing(TWEEN.Easing.Circular.In)
      .onComplete(() => {
        aniOut.start();
      });

    return {
      line,
      aniIn,
      aniOut,
    };
  }

  let { line, aniIn, aniOut } = setup();

  // methods
  const resize = () => {
    two.remove(line);
    ({ line, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
    aniIn.stop();
    aniOut.stop();
    const rando = Math.random();

    line.linewidth = Math.round(rando * 7) + 3;
    line.visible = false;
    distance = Math.round(map(rando, 0, 1, two.height * 0.5, two.width));

    let theta;
    theta = Math.random() * TWO_PI;
    startPoint.x = distance * Math.cos(theta);
    startPoint.y = distance * Math.sin(theta);

    theta += Math.PI * (1 + (0.3 * rando));
    endPoint.x = distance * Math.cos(theta);
    endPoint.y = distance * Math.sin(theta);

    for (let i = 0; i < amount; i += 1) {
      const p = points[i];
      const pct = i / (amount - 1);
      p.x = lerp(startPoint.x, endPoint.x, pct);
      p.y = lerp(startPoint.y, endPoint.y, pct);
    }

    line.beginning = 0;
    line.ending = 0;
    aniIn.stop();
    aniOut.stop();
  };

  const start = () => {
    reset();
    playing = true;
    line.visible = true;
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
