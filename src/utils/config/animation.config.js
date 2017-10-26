import ground from '../animations/ground';
import mountainBass from '../animations/mountainBass';
import mountainSnare from '../animations/mountainSnare';
import prism from '../animations/prism';
import sunrise from '../animations/sunrise';
import strike from '../animations/strike';
import splash from '../animations/splash';
import splashColorful from '../animations/splashColorful';
import veil from '../animations/veil';
import wipe from '../animations/wipe';
import piston from '../animations/piston';
import clay from '../animations/clay';
import flash from '../animations/flash';
import timer from '../animations/timer';
import pinwheel from '../animations/pinwheel';
import glimmer from '../animations/glimmer';
import split from '../animations/split';
import moon from '../animations/moon';
import zigzag from '../animations/zigzag';
import sinewave from '../animations/sinewave';
import bubbles from '../animations/bubbles';
import corona from '../animations/corona';

import flashImage from '../animations/flashImage';
import popImage from '../animations/popImage';
import sunset from '../animations/sunset';
import brush from '../animations/brush';
import strikes from '../animations/strikes';

import landscape from '../../assets/images/animations/landscape.jpg';
import sculpture from '../../assets/images/animations/sculpture-02.png';

import crossline from '../animations/scyaAni/scya-crossline';
import firework from '../animations/scyaAni/scya-firework';
import doubleImage from '../animations/naruto/doubleImage';

import n1 from '../../assets/images/naruto/01.png';
import n1b from '../../assets/images/naruto/01-b.jpg';
import n2 from '../../assets/images/naruto/02.png';
import n2b from '../../assets/images/naruto/02-b.jpg';
import n3 from '../../assets/images/naruto/03.png';
import n3b from '../../assets/images/naruto/03-b.jpg';
import n4 from '../../assets/images/naruto/04.png';
import n4b from '../../assets/images/naruto/04-b.jpg';
import n5 from '../../assets/images/naruto/05.png';
import n5b from '../../assets/images/naruto/05-b.jpg';
import n6 from '../../assets/images/naruto/06.png';
import n6b from '../../assets/images/naruto/06-b.jpg';
import n7 from '../../assets/images/naruto/07.png';
import n7b from '../../assets/images/naruto/07-b.jpg';
import n8 from '../../assets/images/naruto/08.png';
import n8b from '../../assets/images/naruto/08-b.jpg';
import n9 from '../../assets/images/naruto/09.png';
import n9b from '../../assets/images/naruto/09-b.jpg';
import n10 from '../../assets/images/naruto/10.png';
import n10b from '../../assets/images/naruto/10-b.jpg';
import n11 from '../../assets/images/naruto/11.png';
import n11b from '../../assets/images/naruto/11-b.jpg';
import n12 from '../../assets/images/naruto/12.png';
import n12b from '../../assets/images/naruto/12-b.jpg';



/**
 * Math Definition
 */
const TWO_PI = Math.PI * 2;
const cos = Math.cos;
const sin = Math.sin;
const min = Math.min;
const max = Math.max;

/**
 * Range
 * like range function in lodash
 * @param  {number} n [description]
 * @return {Array}   [description]
 */
function range(n) {
  return Array.from(Array(n).keys());
}

/**
 * [angleBetween description]
 * @param  {[type]} v1 [description]
 * @param  {[type]} v2 [description]
 * @return {[type]}    [description]
 */
function angleBetween(v1, v2) {
  const dx = v2.x - v1.x;
  const dy = v2.y - v2.y;
  return Math.atan2(dy, dx);
}

/**
 * lerp
 * @param  {number} a [description]
 * @param  {number} b [description]
 * @param  {number} t [description]
 * @return {number}   [description]
 */
function lerp(a, b, t) {
  return ((b - a) * t) + a;
}

/**
 * [map description]
 * @param  {[type]} v  [description]
 * @param  {[type]} i1 [description]
 * @param  {[type]} i2 [description]
 * @param  {[type]} o1 [description]
 * @param  {[type]} o2 [description]
 * @return {[type]}    [description]
 */
function map(v, i1, i2, o1, o2) {
  return o1 + ((o2 - o1) * ((v - i1) / (i2 - i1)));
}

/**
 * [ease description]
 * @param  {[type]} cur  [description]
 * @param  {[type]} dest [description]
 * @param  {[type]} t    [description]
 * @return {[type]}      [description]
 */
function ease(cur, dest, t) {
  const d = dest - cur;
  if (Math.abs(d) <= 0.0001) {
    return dest;
  } else {
    return cur + (d * t);
  }
}

/**
 * [toRGB description]
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
function toRGB(o) {
  return `rgb(${Math.round(o.r)},${Math.round(o.g)},${Math.round(o.b)}`;
}

const pallete = [
  [
    { r: 215, g: 205, b: 190 }, // background
    { r: 100, g: 200, b: 175 }, // middleground
    { r: 255, g: 240, b: 50 },  // foreground
    { r: 255, g: 100, b: 130 }, // highlight
    { r: 100, g: 75, b: 120 },  // accent
    { r: 255, g: 255, b: 255 }, // white
    { r: 33, g: 33, b: 33 },    // black
  ],
  [
    { r: 181, g: 181, b: 181 },
    { r: 141, g: 164, b: 170 },
    { r: 227, g: 79, b: 12 },
    { r: 163, g: 141, b: 116 },
    { r: 255, g: 197, b: 215 },
    { r: 255, g: 255, b: 255 },
    { r: 0, g: 0, b: 0 },
  ],
  [
    { r: 39, g: 6, b: 54 },
    { r: 69, g: 26, b: 87 },
    { r: 252, g: 25, b: 246 },
    { r: 52, g: 255, b: 253 },
    { r: 133, g: 102, b: 193 },
    { r: 253, g: 228, b: 252 },
    { r: 255, g: 255, b: 255 },
  ],
  [
    { r: 28, g: 52, b: 53 },
    { r: 238, g: 205, b: 204 },
    { r: 204, g: 238, b: 205 },
    { r: 204, g: 237, b: 238 },
    { r: 204, g: 237, b: 204 },
    { r: 205, g: 204, b: 238 },
    { r: 88, g: 95, b: 96 },
    { r: 238, g: 204, b: 237 },
  ],
];

// const animationNameList = [
//   // #0
//   {
//     name: 'veil',
//     key: 's',
//   },
//   // #1
//   {
//     name: 'wipe',
//     key: 'x',
//   },
//   // #2
//   {
//     name: 'prism-1',
//     key: 'u',
//   },
//   // #3
//   {
//     name: 'prism-2',
//     key: 'j',
//   },
//   // #4
//   {
//     name: 'prism-3',
//     key: 'm',
//   },
//   // #5
//   {
//     name: 'piston-1',
//     key: 'r',
//   },
//   // #6
//   {
//     name: 'piston-2',
//     key: 'f',
//   },
//   // #7
//   {
//     name: 'piston-3',
//     key: 'v',
//   },
//   // #8
//   {
//     name: 'clay',
//     key: 'w',
//   },
//   // #9
//   {
//     name: 'flash-1',
//     key: 'q',
//   },
//   // #10
//   {
//     name: 'flash-2',
//     key: 'a',
//   },
//   // #11
//   {
//     name: 'flash-3',
//     key: 'z',
//   },
//   // #12
//   {
//     name: 'splash',
//     key: 'y',
//   },
//   // #13
//   {
//     name: 'splash-color',
//     key: 'n',
//   },
//   // #14
//   {
//     name: 'sunrise',
//     key: 'd',
//   },
//   // #15
//   {
//     name: 'timer',
//     key: 't',
//   },
//   // #16
//   {
//     name: 'pinwheel',
//     key: 'k',
//   },
//   // #17
//   {
//     name: 'glimmer',
//     key: 'o',
//   },
//   // #18
//   {
//     name: 'splits',
//     key: 'c',
//   },
//   // #19
//   {
//     name: 'moon',
//     key: 'e',
//   },
//   // #20
//   {
//     name: 'strike',
//     key: 'h',
//   },
//   // #21
//   {
//     name: 'zigzag',
//     key: 'l',
//   },
//   // #22
//   {
//     name: 'sinewave',
//     key: 'i',
//   },
//   // #23
//   {
//     name: 'bubbles',
//     key: 'g',
//   },
//   // #24
//   {
//     name: 'corona',
//     key: 'b',
//   },
//   // #25
//   {
//     name: 'corona-2',
//     key: 'p',
//   },
// ];

const animationNameList = [
  // #0
  {
    key: 'a',
  },
  // #1
  {
    key: 'b',
  },
  // #2
  {
    key: 'c',
  },
  // #3
  {
    key: 'd',
  },
  // #4
  {
    key: 'e',
  },
  // #5
  {
    key: 'f',
  },
  // #6
  {
    key: 'g',
  },
  // #7
  {
    key: 'h',
  },
  // #8
  {
    key: 'i',
  },
  // #9
  {
    key: 'j',
  },
  // #10
  {
    key: 'k',
  },
  // #11
  {
    key: 'l',
  },
  // #12
  {
    key: 'm',
  },
  // #13
  {
    key: 'n',
  },
  // #14
  {
    key: 'o',
  },
  // #15
  {
    key: 'p',
  },
  // #16
  {
    key: 'q',
  },
  // #17
  {
    key: 'r',
  },
  // #18
  {
    key: 's',
  },
  // #19
  {
    key: 't',
  },
  // #20
  {
    key: 'u',
  },
  // #21
  {
    key: 'v',
  },
  // #22
  {
    key: 'w',
  },
  // #23
  {
    key: 'x',
  },
  // #24
  {
    key: 'y',
  },
  // #25
  {
    key: 'z',
  },
];


const animationKey2IndexMapping = {};
animationNameList.forEach((l, i) => {
  animationKey2IndexMapping[l.key] = i;
});

const animationDrum2IndexMapping = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
];

const sequencerAnimationsSet = [
  [
    { animation: flashImage, options: [landscape] },
    // { animation: flashImage },
    { animation: popImage, options: [sculpture] },
    // { animation: popImage },
    { animation: timer },
    { animation: prism, options: [3] },
    { animation: prism, options: [7] },
    { animation: sunset },
    { animation: strikes },
    { animation: brush, options: [4] },
  ],
  [
    { animation: ground },
    { animation: mountainBass },
    { animation: mountainSnare },
    { animation: prism, options: [3] },
    { animation: prism, options: [7] },
    { animation: sunrise },
    { animation: strike },
    { animation: splash },
  ],
];

const keyAnimationsSet = [
  [
    { animation: flash, options: [1] },
    { animation: corona },
    { animation: split },
    { animation: sunrise },
    { animation: moon },
    { animation: piston, options: [4] },
    { animation: bubbles },
    { animation: strike },
    { animation: sinewave },
    { animation: prism, options: [5] },
    { animation: pinwheel },
    { animation: zigzag },
    { animation: prism, options: [6] },
    { animation: splashColorful },
    { animation: glimmer },
		{ animation: mountainSnare },
    { animation: flash, options: [0] },
    { animation: piston, options: [1] },
    { animation: veil },
    { animation: timer },
    { animation: prism, options: [3] },
    { animation: piston, options: [8] },
    { animation: clay },
    { animation: flash, options: [2] },
    { animation: splash },
    { animation: wipe },
  ],
	[
		{ animation: doubleImage, options: [[n1b, n1]]},
    { animation: doubleImage, options: [[n2b, n2]]},
    { animation: doubleImage, options: [[n3b, n3]]},
    { animation: doubleImage, options: [[n4b, n4]]},
    { animation: doubleImage, options: [[n5b, n5]]},
    { animation: doubleImage, options: [[n6b, n6]]},
    { animation: doubleImage, options: [[n7b, n7]]},
    { animation: doubleImage, options: [[n8b, n8]]},
		{ animation: doubleImage, options: [[n9b, n9]]},
    { animation: doubleImage, options: [[n10b, n10]]},
    { animation: doubleImage, options: [[n11b, n11]]},
    { animation: doubleImage, options: [[n12b, n12]]},
		{ animation: doubleImage, options: [[n1b, n1]]},
    { animation: doubleImage, options: [[n2b, n2]]},
    { animation: doubleImage, options: [[n3b, n3]]},
    { animation: doubleImage, options: [[n4b, n4]]},
    { animation: doubleImage, options: [[n5b, n5]]},
    { animation: doubleImage, options: [[n6b, n6]]},
    { animation: doubleImage, options: [[n7b, n7]]},
    { animation: doubleImage, options: [[n8b, n8]]},
		{ animation: doubleImage, options: [[n9b, n9]]},
    { animation: doubleImage, options: [[n10b, n10]]},
    { animation: doubleImage, options: [[n11b, n11]]},
    { animation: doubleImage, options: [[n12b, n12]]},
		{ animation: doubleImage, options: [[n1b, n1]]},
    { animation: doubleImage, options: [[n2b, n2]]},
	],
];

export {
  pallete,
  TWO_PI,
  cos,
  sin,
  min,
  max,
  range,
  angleBetween,
  lerp,
  map,
  ease,
  toRGB,
  animationKey2IndexMapping,
  sequencerAnimationsSet,
  keyAnimationsSet,
};
