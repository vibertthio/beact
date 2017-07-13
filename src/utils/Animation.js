import Two from 'two.js/build/two.min';
import TWEEN from '@tweenjs/tween.js';
import {
  toRGB,
  pallete,
  animationKey2IndexMapping,
  sequencerAnimationsSet,
  keyAnimationsSet,
} from './config/animation.config';

/**
 * [animation description]
 * @return {[type]} [description]
 */
function Animation() {
  /**
   * setup
   */
  const keyAnimations = [];
  const sequencerAnimations = [];
  const colors = pallete[2].map(toRGB);
  const canvas = document.getElementById('animation');
  const params = { fullscreen: true };
  // const params = { type: Two.Types.canvas, fullscreen: true };
  const two = new Two(params).appendTo(canvas);
  two.bind('update', () => { TWEEN.update(); }).play();

  const setAnimation = (index, set, animation) => {
    const i = index % (set.length);
    set[i].forEach((s) => {
      const opt = s.options ? s.options : [];
      const param = [Two, two, TWEEN, colors, animation];
      s.animation(...param, ...opt);
    });
  };
  const reset = () => {
    two.clear();
  };
  const triggerKeyAnimation = (index) => {
    const i = index % keyAnimations.length;
    keyAnimations[i].start();
  };
  const triggerSequencerAnimation = (index) => {
    const i = index % sequencerAnimations.length;
    sequencerAnimations[i].start();
  };
  const resize = (w, h) => {
    reset();
    two.renderer.setSize(w, h);
    two.width = w;
    two.height = h;
    sequencerAnimations.forEach((ani) => {
      ani.resize();
    });
    keyAnimations.forEach((ani) => {
      ani.resize();
    });
  };

  setAnimation(0, sequencerAnimationsSet, sequencerAnimations);
  setAnimation(0, keyAnimationsSet, keyAnimations);

  return {
    triggerKeyAnimation,
    triggerSequencerAnimation,
    resize,
  };
}

export {
	animationKey2IndexMapping,
};

export default Animation;
