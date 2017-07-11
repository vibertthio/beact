import Two from 'two.js/build/two.min';
import TWEEN from '@tweenjs/tween.js';
import {
  toRGB,
  pallete,
  animationNameList,
  animationKey2IndexMapping,
  animationDrum2IndexMapping,
} from './config/animation.config';

// import ground from './animations/ground';
// import mountainBass from './animations/mountainBass';
import mountainSnare from './animations/mountainSnare';
import prism from './animations/prism';
import sunrise from './animations/sunrise';
import strike from './animations/strike';
import splash from './animations/splash';
import splashColorful from './animations/splashColorful';
import veil from './animations/veil';
import wipe from './animations/wipe';
import piston from './animations/piston';
import clay from './animations/clay';
import flash from './animations/flash';
import timer from './animations/timer';
import pinwheel from './animations/pinwheel';
import glimmer from './animations/glimmer';
import split from './animations/split';
import moon from './animations/moon';
import zigzag from './animations/zigzag';
import sinewave from './animations/sinewave';
import bubbles from './animations/bubbles';
import corona from './animations/corona';

import flashImage from './animations/flashImage';

import landscape from '../assets/images/animations/landscape.jpg';
import sculpture from '../assets/images/animations/sculpture-02.png';


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

  /**
   * Animations of Sequencer
   */
  // ground(Two, two, TWEEN, colors, sequencerAnimations);
  // mountainBass(Two, two, TWEEN, colors, sequencerAnimations);
  // mountainSnare(Two, two, TWEEN, colors, sequencerAnimations);
  // prism(Two, two, TWEEN, colors, sequencerAnimations, 3);
  // prism(Two, two, TWEEN, colors, sequencerAnimations, 7);
  // sunrise(Two, two, TWEEN, colors, sequencerAnimations);
  // strike(Two, two, TWEEN, colors, sequencerAnimations);
  // splash(Two, two, TWEEN, colors, sequencerAnimations);

  flashImage(Two, two, TWEEN, colors, sequencerAnimations, landscape);
  flashImage(Two, two, TWEEN, colors, sequencerAnimations, sculpture, 0.25);
  mountainSnare(Two, two, TWEEN, colors, sequencerAnimations);
  prism(Two, two, TWEEN, colors, sequencerAnimations, 3);
  prism(Two, two, TWEEN, colors, sequencerAnimations, 7);
  sunrise(Two, two, TWEEN, colors, sequencerAnimations);
  strike(Two, two, TWEEN, colors, sequencerAnimations);
  splash(Two, two, TWEEN, colors, sequencerAnimations);

  /**
   * Animations of Keyboard
   */
  veil(Two, two, TWEEN, colors, keyAnimations);
  wipe(Two, two, TWEEN, colors, keyAnimations);
  prism(Two, two, TWEEN, colors, keyAnimations, 3);
  prism(Two, two, TWEEN, colors, keyAnimations, 5);
  prism(Two, two, TWEEN, colors, keyAnimations, 6);
  piston(Two, two, TWEEN, colors, keyAnimations, 1);
  piston(Two, two, TWEEN, colors, keyAnimations, 4);
  piston(Two, two, TWEEN, colors, keyAnimations, 8);
  clay(Two, two, TWEEN, colors, keyAnimations);
  flash(Two, two, TWEEN, colors, keyAnimations, 0);
  flash(Two, two, TWEEN, colors, keyAnimations, 1);
  flash(Two, two, TWEEN, colors, keyAnimations, 2);
  splash(Two, two, TWEEN, colors, keyAnimations);
  splashColorful(Two, two, TWEEN, colors, keyAnimations);
  sunrise(Two, two, TWEEN, colors, keyAnimations);
  timer(Two, two, TWEEN, colors, keyAnimations);
  pinwheel(Two, two, TWEEN, colors, keyAnimations);
  glimmer(Two, two, TWEEN, colors, keyAnimations);
  split(Two, two, TWEEN, colors, keyAnimations);
  moon(Two, two, TWEEN, colors, keyAnimations);
  strike(Two, two, TWEEN, colors, keyAnimations);
  zigzag(Two, two, TWEEN, colors, keyAnimations);
  sinewave(Two, two, TWEEN, colors, keyAnimations);
  bubbles(Two, two, TWEEN, colors, keyAnimations);
  corona(Two, two, TWEEN, colors, keyAnimations);
  mountainSnare(Two, two, TWEEN, colors, keyAnimations);

  const triggerKeyAnimation = (index) => {
    const i = index % keyAnimations.length;
    keyAnimations[i].start();
  };
  const triggerSequencerAnimation = (index) => {
    const i = index % sequencerAnimations.length;
    sequencerAnimations[i].start();
  };
  const resize = (w, h) => {
    two.clear();
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

  return {
    resize,
    triggerKeyAnimation,
    triggerSequencerAnimation,
  };
}

export {
  animationNameList,
	animationKey2IndexMapping,
  animationDrum2IndexMapping,
};

export default Animation;
