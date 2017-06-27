import { animationNameList } from './Animation';

const head = './assets/audio/papatap/A/';
const notes = animationNameList.map(ls => ls.name);
const urls = {};
animationNameList.forEach((ls) => {
  const ad = head.concat(ls.name).concat('.mp3');
  urls[ls.name] = ad;
});

export {
  urls,
  notes,
};
