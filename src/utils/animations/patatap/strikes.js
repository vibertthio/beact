import { range } from 'config/animation.config';
import strike from './strike';

/**
* Animation #20, Strike
* @param  {objct} Two
* @param  {object} two instance of two
* @param  {object} TWEEN the library for tweening
* @param  {object} colors color palette
* @param  {array} animations It's the stack of animations
* @param  {amount} [amount = 2]
* @param  {number} [opacity = 1]
* @param  {number} [duration = 200]
*/
export default function strikes(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  amount = 2,
  opacity = 1,
  duration = 200,
  ) {
  let playing = false;

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    const shapes = [];
    range(amount).forEach(() =>
      strike(
        Two,
        two,
        TWEEN,
        colors,
        shapes,
        opacity,
        duration,
      ),
    );
    return {
      shapes,
    };
  }

  const { shapes } = setup();

  // methods
  const resize = () => {
    shapes.forEach(s => s.resize());
  };

  const reset = () => {
    playing = false;
    shapes.forEach(s => s.reset());
  };

  const start = () => {
    playing = true;
    shapes.forEach(s => s.start());
  };

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
