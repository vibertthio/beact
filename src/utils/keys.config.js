import { animationNameList } from './animation.config';

const head = './assets/audio/keys/A/';
const keysNotes = animationNameList.map(ls => ls.name);
const keysUrls = {};
animationNameList.forEach((ls) => {
  const ad = head.concat(ls.name).concat('.mp3');
  keysUrls[ls.name] = ad;
});

export {
  keysUrls,
  keysNotes,
};
