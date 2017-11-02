/******
Animaition import
******/
// patatap
import ground from 'animations/patatap/ground';
import mountainBass from 'animations/patatap/mountainBass';
import mountainSnare from 'animations/patatap/mountainSnare';
import prism from 'animations/patatap/prism';
import sunrise from 'animations/patatap/sunrise';
import strike from 'animations/patatap/strike';
import splash from 'animations/patatap/splash';
import splashColorful from 'animations/patatap/splashColorful';
import veil from 'animations/patatap/veil';
import wipe from 'animations/patatap/wipe';
import piston from 'animations/patatap/piston';
import clay from 'animations/patatap/clay';
import flash from 'animations/patatap/flash';
import timer from 'animations/patatap/timer';
import pinwheel from 'animations/patatap/pinwheel';
import glimmer from 'animations/patatap/glimmer';
import split from 'animations/patatap/split';
import moon from 'animations/patatap/moon';
import zigzag from 'animations/patatap/zigzag';
import sinewave from 'animations/patatap/sinewave';
import bubbles from 'animations/patatap/bubbles';
import corona from 'animations/patatap/corona';
import sunset from 'animations/patatap/sunset';
import brush from 'animations/patatap/brush';
import strikes from 'animations/patatap/strikes';

// vapor
import flashImage from 'animations/vapor/flashImage';
import singleFlashImage from 'animations/vapor/singleFlashImage';
import popImage from 'animations/vapor/popImage';
import staticImage from 'animations/vapor/staticImage';
import singleStaticImage from 'animations/vapor/singleStaticImage';
import fade from 'animations/vapor/fade';
import gradientTimer from 'animations/vapor/gradientTimer';

// scya
import crossline from 'animations/scyaAni/scya-crossline';
import firework from 'animations/scyaAni/scya-firework';
import doubleImage from 'animations/naruto/doubleImage';

/******
Image import
******/
// vapor
import landscape from 'vapor/landscape.jpg';
import sculpture from 'vapor/sculpture-02.png';

// naruto
import n1 from 'naruto/01.png';
import n1b from 'naruto/01-b.jpg';
import n2 from 'naruto/02.png';
import n2b from 'naruto/02-b.jpg';
import n3 from 'naruto/03.png';
import n3b from 'naruto/03-b.jpg';
import n4 from 'naruto/04.png';
import n4b from 'naruto/04-b.jpg';
import n5 from 'naruto/05.png';
import n5b from 'naruto/05-b.jpg';
import n6 from 'naruto/06.png';
import n6b from 'naruto/06-b.jpg';
import n7 from 'naruto/07.png';
import n7b from 'naruto/07-b.jpg';
import n8 from 'naruto/08.png';
import n8b from 'naruto/08-b.jpg';
import n9 from 'naruto/09.png';
import n9b from 'naruto/09-b.jpg';
import n10 from 'naruto/10.png';
import n10b from 'naruto/10-b.jpg';
import n11 from 'naruto/11.png';
import n11b from 'naruto/11-b.jpg';
import n12 from 'naruto/12.png';
import n12b from 'naruto/12-b.jpg';

// yuen
import bg from 'yuen/bg.jpg';
import heart from 'yuen/heart.png';
import cube from 'yuen/cube.png';

const sequencerAnimationsSet = [
  [
    [
      { animation: fade, options: [0] },
      { animation: singleStaticImage, options: [heart, 0.8, 0.4] },
    ],
    { animation: singleFlashImage, options: [cube, 0.9, 0.3] },
    { animation: gradientTimer },
    { animation: prism, options: [3] },
    { animation: prism, options: [7] },
    { animation: sunset },
    { animation: strikes },
    { animation: brush, options: [4] },
  ],
  // [
  //   [
  //     { animation: fade, options: [0] },
  //     { animation: singleStaticImage, options: [heart, 0.8, 0.4] },
  //   ],
  //   { animation: singleFlashImage, options: [cube, 0.9, 0.3] },
  //   { animation: gradientTimer },
  //   { animation: prism, options: [3] },
  //   { animation: prism, options: [7] },
  //   { animation: sunset },
  //   { animation: strikes },
  //   { animation: brush, options: [4] },
  // ],
  [
    { animation: flashImage, options: [landscape] },
    { animation: popImage, options: [sculpture, 4.5] },
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

const setBackgroundImage = () => {
  console.log('set background');
  const s = document.body.style;
  s.backgroundImage = "url('bg.jpg')";
};
const setBackgroundColor = () => {
  console.log('set background none');
  const s = document.body.style;
  s.backgroundImage = "";
  s.background = "";
  s.backgroundColor = "rgba(39, 6, 54, 1)";
};
const none = () => {};
const sequencerCustomSettings = [
  setBackgroundImage,
  setBackgroundColor,
  setBackgroundColor,
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
  sequencerCustomSettings,
  keyAnimationsSet,
};
