// import Two from 'two.js/build/two.min';
import Two from 'two.js/build/two';
import TWEEN from '@tweenjs/tween.js';
import {
  toRGB,
  palette,
  animationKey2IndexMapping,
  sequencerAnimationsSet,
  sequencerCustomSettings,
  keyAnimationsSet,
} from 'config/animation.config';

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
  let currentKeyAnimationsIndex = 0;
  let currentSequencerAnimationsIndex = 2;
  const colors = palette[2].map(toRGB);
  const canvas = document.getElementById('animation');
  const params = { fullscreen: true };
  // const params = { type: Two.Types.canvas, fullscreen: true };
  const two = new Two(params).appendTo(canvas);
  two.bind('update', () => { TWEEN.update(); }).play();

  // set includes both key and sequencer animations.
  const setAnimation = (index, set, animation) => {
    const i = index % (set.length);
    set[i].forEach((s, j) => {
      if (Array.isArray(s)) {
        animation.push([]);
        s.forEach((a) => {
          const opt = a.options ? a.options : [];
          const param = [Two, two, TWEEN, colors, animation[j]];
          // elements in animation array are filled in animation files
          a.animation(...param, ...opt);
        });
      } else {
        const opt = s.options ? s.options : [];
        const param = [Two, two, TWEEN, colors, animation];
        s.animation(...param, ...opt);
      }
    });
  };

  const setSequencerAnimations = () => {
    sequencerAnimations.splice(0, sequencerAnimations.length);
    // console.log(`set animation: ${currentSequencerAnimationsIndex}`);
    setAnimation(
      currentSequencerAnimationsIndex,
      sequencerAnimationsSet,
      sequencerAnimations,
    );
  };

  const setSequencerAnimationsCustomSettings = () => {
    sequencerCustomSettings[currentSequencerAnimationsIndex](currentSequencerAnimationsIndex);
  };

  const setKeyAnimation = () => {
    keyAnimations.splice(0, keyAnimations.length);
    setAnimation(
      currentKeyAnimationsIndex,
      keyAnimationsSet,
      keyAnimations,
    );
  };

  const reset = () => {
    two.clear();
  };

  const triggerKeyAnimation = (index) => {
    const i = index % keyAnimations.length;
    if (Array.isArray(keyAnimations[i])) {
      keyAnimations[i].forEach((a) => {
        a.start();
      });
    } else {
      keyAnimations[i].start();
    }
  };

  // index of clicked element in each column
  const triggerSequencerAnimation = (index) => {
    const i = index % sequencerAnimations.length;
    if (Array.isArray(sequencerAnimations[i])) {
      sequencerAnimations[i].forEach((a) => {
        a.start();
      });
    } else {
      sequencerAnimations[i].start();
    }
  };

  const resize = (w, h) => {
    two.clear();
    two.renderer.setSize(w, h);
    two.width = w;
    two.height = h;
    sequencerAnimations.forEach((ani) => {
      if (Array.isArray(ani)) {
        ani.forEach((a) => {
          a.resize();
        });
      } else {
        ani.resize();
      }
    });
    keyAnimations.forEach((ani) => {
      ani.resize();
    });
  };

  const changeSequencerAnimations = (up) => {
    const n = sequencerAnimationsSet.length;
    currentSequencerAnimationsIndex += (up ? 1 : -1);
    if (currentSequencerAnimationsIndex < 0) {
      currentSequencerAnimationsIndex += n;
    } else if (currentSequencerAnimationsIndex > n - 1) {
      currentSequencerAnimationsIndex = 0;
    }
    reset();
    setSequencerAnimations();
    setSequencerAnimationsCustomSettings();
    setKeyAnimation();
  };

	const changeKeyAnimations = (up) => {
    const n = keyAnimations.length;
    currentKeyAnimationsIndex += (up ? 1 : -1);
    if (currentKeyAnimationsIndex < 0) {
      currentKeyAnimationsIndex += n;
    } else if (currentKeyAnimationsIndex > n - 1) {
      currentKeyAnimationsIndex = 0;
    }
    reset();
    setSequencerAnimations();
    setKeyAnimation();
  };

  const startNaruto = () => {
    currentKeyAnimationsIndex = 1;
    reset();
    setSequencerAnimations();
    setKeyAnimation();
  };

	const startNormal = () => {
    currentKeyAnimationsIndex = 0;
    reset();
    setSequencerAnimations();
    setKeyAnimation();
  };

  setSequencerAnimations();
  setKeyAnimation();

  return {
    triggerKeyAnimation,
    triggerSequencerAnimation,
    changeSequencerAnimations,
		changeKeyAnimations,
    resize,
    startNaruto,
		startNormal,
    setSequencerAnimationsCustomSettings,
  };
}

export {
	animationKey2IndexMapping,
};

export default Animation;
