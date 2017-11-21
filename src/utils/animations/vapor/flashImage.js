import defaultImgUrl from 'vapor/landscape.png';

export default function flashImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl = defaultImgUrl,
  textureScale = 1,
  duration = 400,
  ) {
  let playing = false;
  let originalScale;

  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
    // const length = Math.min(two.width, two.height);
    // const shape = two.makeRectangle(
    //   two.width * 0.5,
    //   two.height * 0.5,
    //   two.width * shapeScale,
    //   two.height * shapeScale,
    // );
    // const texture = new Two.Texture(imgUrl, two.width * shapeScale, two.height * shapeScale);
    // shape.visible = 0;
    // shape.fill = texture;
    // shape.noStroke();
    //


    const shape = two.makeSprite(
      imgUrl,
      two.width * 0.5,
      two.height * 0.5,
    );

    originalScale = (textureScale * two.height) / 400;
    shape.scale = originalScale;
    shape.opacity = 0;
    let targetRatio = originalScale * (1 + (0.5 * Math.random()));

    const aniOpacity = new TWEEN.Tween(shape)
      .to({ opacity: 0 }, duration)
      .onStart(() => {
        console.log('opa start');
      })
      .easing(TWEEN.Easing.Circular.Out)
      .onStop(() => {
        shape.opacity = 0;
      });

    const ani = new TWEEN.Tween(shape)
      .to({ scale: targetRatio }, duration)
      .onStart(() => {
        targetRatio = originalScale * (1 + (0.5 * Math.random()));
        aniOpacity.start();
      })
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        shape.scale = originalScale;
      })
      .onStop(() => {
        shape.scale = originalScale;
        aniOpacity.stop();
      });

    return { shape, ani };
  }

  let { shape, ani } = setup();

  // methods
  const resize = () => {
    two.remove(shape);
    ({ shape, ani } = setup());
  };

  const reset = () => {
    ani.stop();
    shape.scale = originalScale;
  };

  const start = () => {
    reset();
    playing = true;
    shape.opacity = 1;
    ani.start();
  };

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
