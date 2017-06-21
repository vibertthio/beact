import Two from 'two.js/build/two.svg.webpack';

const two = new Two({
  fullscreen: false,
  autostart: true,
}).appendTo(document.body);

const rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
two.bind('update', () => {
  rect.rotation += 0.001;
});
