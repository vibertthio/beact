const drumNotes =  Array.from(Array(8).keys()).map((i) => (i + 1).toString());
const drumUrls = [
  {
    1: './assets/audio/drum/bedford/kick.mp3',
    2: './assets/audio/drum/bedford/snare.mp3',
    3: './assets/audio/drum/bedford/rim.mp3',
    4: './assets/audio/drum/bedford/hat.mp3',
    5: './assets/audio/drum/bedford/bell.mp3',
    6: './assets/audio/drum/bedford/stab01.mp3',
    7: './assets/audio/drum/bedford/stab02.mp3',
    8: './assets/audio/drum/bedford/stab03.mp3',
  },
  {
    1: './assets/audio/drum/chip/bass.mp3',
    2: './assets/audio/drum/chip/bloop.mp3',
    3: './assets/audio/drum/chip/bong.mp3',
    4: './assets/audio/drum/chip/frog.mp3',
    5: './assets/audio/drum/chip/kick.mp3',
    6: './assets/audio/drum/chip/noise.mp3',
    7: './assets/audio/drum/chip/power-up.mp3',
    8: './assets/audio/drum/chip/snare.mp3',
  },
  {
    1: './assets/audio/drum/dusty/kick.mp3',
    2: './assets/audio/drum/dusty/snare.mp3',
    3: './assets/audio/drum/dusty/clicks.mp3',
    4: './assets/audio/drum/dusty/hat.mp3',
    5: './assets/audio/drum/dusty/vocal-1.mp3',
    6: './assets/audio/drum/dusty/vocal-2.mp3',
    7: './assets/audio/drum/dusty/vocal-3.mp3',
    8: './assets/audio/drum/dusty/vocal-4.mp3',
  },
  {
    1: './assets/audio/drum/everything/kick.mp3',
    2: './assets/audio/drum/everything/snare.mp3',
    3: './assets/audio/drum/everything/shaker.mp3',
    4: './assets/audio/drum/everything/hat.mp3',
    5: './assets/audio/drum/everything/vocal-1.mp3',
    6: './assets/audio/drum/everything/vocal-2.mp3',
    7: './assets/audio/drum/everything/vocal-3.mp3',
    8: './assets/audio/drum/everything/vocal-4.mp3',
  },
  {
    1: './assets/audio/drum/let-go/kick.mp3',
    2: './assets/audio/drum/let-go/snare.mp3',
    3: './assets/audio/drum/let-go/stab-1.mp3',
    4: './assets/audio/drum/let-go/hat.mp3',
    5: './assets/audio/drum/let-go/stab-2.mp3',
    6: './assets/audio/drum/let-go/stab-3.mp3',
    7: './assets/audio/drum/let-go/stab-4.mp3',
    8: './assets/audio/drum/let-go/stab-5.mp3',
  },
  {
    1: './assets/audio/drum/really-wanna/kick.mp3',
    2: './assets/audio/drum/really-wanna/snare.mp3',
    3: './assets/audio/drum/really-wanna/splash.mp3',
    4: './assets/audio/drum/really-wanna/hat.mp3',
    5: './assets/audio/drum/really-wanna/vocal-1.mp3',
    6: './assets/audio/drum/really-wanna/vocal-2.mp3',
    7: './assets/audio/drum/really-wanna/vocal-3.mp3',
    8: './assets/audio/drum/really-wanna/vocal-4.mp3',
  },
];
const presets = [
  // 1
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // 2
  [
    [1, 0, 1, 1, 1, 0, 0, 0], //1
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0], //2
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0], //3
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1], //4
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
  ],
  // 3
  [
    [1, 0, 1, 0, 1, 0, 0, 0], //1
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0], //2
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0], //3
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1], //4
    [1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
  ],
  // 4
  [
    [1, 0, 0, 1, 1, 0, 0, 0], //1
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //2
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0], //3
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1], //4
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ],
  // 5
  [
    [1, 0, 0, 1, 1, 0, 1, 0], //1
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //2
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1], //4
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // 6
  [
    [1, 0, 0, 1, 1, 0, 0, 0], //1
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //2
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0], //3
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //4
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ],
  // 7
  [
    [1, 0, 0, 1, 1, 0, 0, 0], //1
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //2
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1], //3
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0], //4
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ],
  // 8
  [
    [1, 0, 1, 1, 1, 0, 0, 0], //1
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //2
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0], //3
    [0, 0, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 0], //4
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 0, 0, 0],
  ],
];

export {
  drumNotes,
  drumUrls,
  presets,
};
