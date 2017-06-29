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
];

// original
// 'rgb(28, 52, 53)',
// 'rgb(238, 205, 204)',
// 'rgb(204, 238, 205)',
// 'rgb(204, 237, 238)',
// 'rgb(204, 237, 204)',
// 'rgb(205, 204, 238)',
// 'rgb(88, 95, 96)',
// 'rgb(238, 204, 237)',

const animationNameList = [
  // #0
  {
    name: 'veil',
    key: 's',
  },
  // #1
  {
    name: 'wipe',
    key: 'x',
  },
  // #2
  {
    name: 'prism-1',
    key: 'u',
  },
  // #3
  {
    name: 'prism-2',
    key: 'j',
  },
  // #4
  {
    name: 'prism-3',
    key: 'm',
  },
  // #5
  {
    name: 'piston-1',
    key: 'r',
  },
  // #6
  {
    name: 'piston-2',
    key: 'f',
  },
  // #7
  {
    name: 'piston-3',
    key: 'v',
  },
  // #8
  {
    name: 'clay',
    key: 'w',
  },
  // #9
  {
    name: 'flash-1',
    key: 'q',
  },
  // #10
  {
    name: 'flash-2',
    key: 'a',
  },
  // #11
  {
    name: 'flash-3',
    key: 'z',
  },
  // #12
  {
    name: 'splash',
    key: 'y',
  },
  // #13
  {
    name: 'splash-color',
    key: 'n',
  },
  // #14
  {
    name: 'sunrise',
    key: 'd',
  },
  // #15
  {
    name: 'timer',
    key: 't',
  },
  // #16
  {
    name: 'pinwheel',
    key: 'k',
  },
  // #17
  {
    name: 'glimmer',
    key: 'o',
  },
  // #18
  {
    name: 'splits',
    key: 'c',
  },
  // #19
  {
    name: 'moon',
    key: 'e',
  },
  // #20
  {
    name: 'strike',
    key: 'h',
  },
  // #21
  {
    name: 'zigzag',
    key: 'l',
  },
  // #22
  {
    name: 'sinewave',
    key: 'i',
  },
  // #23
  {
    name: 'bubbles',
    key: 'g',
  },
  // #24
  {
    name: 'corona',
    key: 'b',
  },
  // #25
  {
    name: 'corona-2',
    key: 'p',
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
  animationNameList,
  animationKey2IndexMapping,
  animationDrum2IndexMapping,
};
