export default function singleStaticImage(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  imgUrl,
  textureScale = 1,
  duration = 400,
  ) {
  let playing = false;
  let originalScale;
  let rotateDest = { rotation: 0.25 };
  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
    // const length = Math.min(two.width, two.height);
    // const shape = two.makeRectangle(
    //   two.width * 0.5,
    //   two.height * 0.5,
    //   two.width * 0.2,
    //   two.height * 0.2,
    // );
    // const texture = new Two.Texture(imgUrl, two.width * 0.2, two.height * 0.2);
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
      .easing(TWEEN.Easing.Circular.Out);

    const aniRotation = new TWEEN.Tween(shape)
      .to(rotateDest, duration)
      .easing(TWEEN.Easing.Exponential.Out);

    const ani = new TWEEN.Tween(shape)
      .to({ scale: targetRatio }, duration)
      .onStart(() => {
        targetRatio = originalScale * (1 + (0.5 * Math.random()));
        aniRotation.start();
      })
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        aniOpacity.start();
      })
      .onStop(() => {
        aniRotation.stop();
      });

    return { shape, ani, aniOpacity };
  }

  let { shape, ani, aniOpacity } = setup();

  // methods
  const resize = () => {
    two.remove(shape);
    ({ shape, ani, aniOpacity } = setup());
  };

  const reset = () => {
    ani.stop();
    aniOpacity.stop();
    shape.scale = originalScale;
    rotateDest.rotation *= (Math.random(1) > 0.5) ? 1 : -1;
  };

  const start = () => {
    reset();
    playing = true;
    shape.opacity = 1;
    shape.rotation = 0;
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
