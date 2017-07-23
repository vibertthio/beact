import { animationNameList } from './animation.config';

// const head = './assets/audio/keys/F/';
// const keysNotes = animationNameList.map(ls => ls.name);
// const keysUrls = {};
// animationNameList.forEach((ls) => {
//   const ad = head.concat(ls.name).concat('.mp3');
//   keysUrls[ls.name] = ad;
// });

const keysNotes = Array.from(Array(26).keys()).map((i) => (i + 1).toString());
const keysUrls = [
  {
    1: './assets/audio/drum/bedford/kick.mp3',
    2: './assets/audio/drum/bedford/hat.mp3',
    3: './assets/audio/drum/bedford/rim.mp3',
    4: './assets/audio/drum/everything/vocal-4.mp3',
    5: './assets/audio/drum/bedford/stab01.mp3',
    6: './assets/audio/drum/bedford/stab02.mp3',
    7: './assets/audio/drum/bedford/stab03.mp3',
    8: './assets/audio/drum/chip/bass.mp3',
    9: './assets/audio/drum/chip/bloop.mp3',
    10: './assets/audio/drum/chip/bong.mp3',
    11: './assets/audio/drum/chip/frog.mp3',
    12: './assets/audio/drum/chip/kick.mp3',
    13: './assets/audio/drum/chip/noise.mp3',
    14: './assets/audio/drum/chip/power-up.mp3',
    15: './assets/audio/drum/chip/snare.mp3',
    16: './assets/audio/drum/dusty/vocal-1.mp3',
    17: './assets/audio/drum/dusty/vocal-2.mp3',
    18: './assets/audio/drum/dusty/vocal-3.mp3',
    19: './assets/audio/drum/dusty/vocal-4.mp3',
    20: './assets/audio/drum/everything/vocal-1.mp3',
    21: './assets/audio/drum/everything/vocal-2.mp3',
    22: './assets/audio/drum/everything/vocal-3.mp3',
    23: './assets/audio/chillsaxiao/bass.mp3',
    24: './assets/audio/chillsaxiao/star.mp3',
    25: './assets/audio/chillsaxiao/pad.mp3',
    26: './assets/audio/chillsaxiao/man.mp3',
  },
];

export {
  keysUrls,
  keysNotes,
};
