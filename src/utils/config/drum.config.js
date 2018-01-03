const drumNotes =  Array.from(Array(8).keys()).map((i) => (i + 1).toString());
const drumUrls = [
  {
    1: './assets/audio/dusa/seq/kick.mp3',
    2: './assets/audio/dusa/seq/crash.mp3',
    3: './assets/audio/dusa/seq/snare.mp3',
    4: './assets/audio/dusa/seq/hh.mp3',
    5: './assets/audio/dusa/seq/key1.mp3',
    6: './assets/audio/dusa/seq/key2.mp3',
    7: './assets/audio/dusa/seq/key5.mp3',
    8: './assets/audio/dusa/seq/key6.mp3',
  },
  {
    1: './assets/audio/chillsaxiao/kick.mp3',
    2: './assets/audio/chillsaxiao/snare.mp3',
    3: './assets/audio/chillsaxiao/dn.mp3',
    4: './assets/audio/chillsaxiao/hh.mp3',
    5: './assets/audio/chillsaxiao/bass.mp3',
    6: './assets/audio/chillsaxiao/man.mp3',
    7: './assets/audio/chillsaxiao/pad.mp3',
    8: './assets/audio/chillsaxiao/star.mp3',
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
    1: './assets/audio/drum/really-wanna/kick.mp3',
    2: './assets/audio/drum/really-wanna/snare.mp3',
    3: './assets/audio/drum/really-wanna/splash.mp3',
    4: './assets/audio/drum/really-wanna/hat.mp3',
    5: './assets/audio/drum/really-wanna/vocal-1.mp3',
    6: './assets/audio/drum/really-wanna/vocal-2.mp3',
    7: './assets/audio/drum/really-wanna/vocal-3.mp3',
    8: './assets/audio/drum/really-wanna/vocal-4.mp3',
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
    1: './assets/audio/porn/kick.mp3',
    2: './assets/audio/porn/clap.mp3',
    3: './assets/audio/porn/perc-gong.mp3',
    4: './assets/audio/porn/perc-short.mp3',
    5: './assets/audio/porn/bass.mp3',
    6: './assets/audio/porn/vocal.mp3',
    7: './assets/audio/porn/synth.mp3',
    8: './assets/audio/porn/zheng.mp3',
  },
  // {
  //   1: './assets/audio/drum/let-go/kick.mp3',
  //   2: './assets/audio/drum/let-go/snare.mp3',
  //   3: './assets/audio/drum/let-go/stab-1.mp3',
  //   4: './assets/audio/drum/let-go/hat.mp3',
  //   5: './assets/audio/drum/let-go/stab-2.mp3',
  //   6: './assets/audio/drum/let-go/stab-3.mp3',
  //   7: './assets/audio/drum/let-go/stab-4.mp3',
  //   8: './assets/audio/drum/let-go/stab-5.mp3',
  // },
  // {
  //   1: './assets/audio/drum/chip/bass.mp3',
  //   2: './assets/audio/drum/chip/bloop.mp3',
  //   3: './assets/audio/drum/chip/bong.mp3',
  //   4: './assets/audio/drum/chip/frog.mp3',
  //   5: './assets/audio/drum/chip/kick.mp3',
  //   6: './assets/audio/drum/chip/noise.mp3',
  //   7: './assets/audio/drum/chip/power-up.mp3',
  //   8: './assets/audio/drum/chip/snare.mp3',
  // },
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
    [1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 0, 0], //4
    [1, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0],
  ],
  // 8
  [
    [1, 0, 1, 1, 1, 0, 0, 0], //1
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0], //2
    [0, 0, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0], //3
    [0, 0, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 0, 0], //4
    [1, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0],
  ],
];

export {
  drumNotes,
  drumUrls,
  presets,
};
