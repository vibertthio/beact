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
    1: './assets/audio/dusa/key/ambient1.mp3',
    2: './assets/audio/dusa/key/ambient2.mp3',
    3: './assets/audio/dusa/key/DUSA.mp3',
    4: './assets/audio/dusa/key/ghostShellBell.mp3',
    5: './assets/audio/dusa/key/hand.mp3',
    6: './assets/audio/dusa/key/insist.mp3',
    7: './assets/audio/dusa/key/Key3.mp3',
    8: './assets/audio/dusa/key/Key4.mp3',
    9: './assets/audio/dusa/key/light.mp3',
    10: './assets/audio/dusa/key/OHH.mp3',
    11: './assets/audio/dusa/key/sPad1.mp3',
    12: './assets/audio/dusa/key/sPad2.mp3',
    13: './assets/audio/dusa/key/sPad3.mp3',
    14: './assets/audio/dusa/key/sPad4.mp3',
    15: './assets/audio/dusa/key/subbass1.mp3',
    16: './assets/audio/dusa/key/subbass2.mp3',
    17: './assets/audio/dusa/key/subbass3.mp3',
    18: './assets/audio/dusa/key/subbass4.mp3',
    19: './assets/audio/dusa/key/wind.mp3',
    20: './assets/audio/dusa/key/zero.mp3',
    21: './assets/audio/drum/everything/vocal-2.mp3',
    22: './assets/audio/drum/everything/vocal-3.mp3',
    23: './assets/audio/chillsaxiao/bass.mp3',
    24: './assets/audio/chillsaxiao/star.mp3',
    25: './assets/audio/chillsaxiao/pad.mp3',
    26: './assets/audio/chillsaxiao/man.mp3',
  },
	{
		1: './assets/audio/naruto/01.mp3', // a ok
		2: './assets/audio/naruto/02.mp3', // b ok
		3: './assets/audio/naruto/03.mp3', // c ok
		4: './assets/audio/naruto/04.mp3', // d ok
		5: './assets/audio/naruto/05.mp3', // e ok
		6: './assets/audio/naruto/07.mp3', // f ok
		7: './assets/audio/naruto/03.mp3', // g ok
		8: './assets/audio/naruto/08.mp3', // h ok
		9: './assets/audio/naruto/09.mp3', // i ok
		10: './assets/audio/naruto/10.mp3', // j ok
		11: './assets/audio/naruto/11.mp3', // k ok
		12: './assets/audio/naruto/01.mp3', // l ok
		13: './assets/audio/naruto/01.mp3', // m
		14: './assets/audio/naruto/02.mp3', // n
		15: './assets/audio/naruto/03.mp3', // o
		16: './assets/audio/naruto/04.mp3', // p
		17: './assets/audio/naruto/05.mp3', // q
		18: './assets/audio/naruto/07.mp3', // r
		19: './assets/audio/naruto/03.mp3', // s
		20: './assets/audio/naruto/08.mp3', // t
		21: './assets/audio/naruto/09.mp3', // u
		22: './assets/audio/naruto/10.mp3', // v
		23: './assets/audio/naruto/11.mp3', // w
		24: './assets/audio/naruto/01.mp3', // x
		25: './assets/audio/naruto/01.mp3', // y
		26: './assets/audio/naruto/02.mp3', // z
	},
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
