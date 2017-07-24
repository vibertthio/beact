
/**
 * Animation #9, 10, 11, Flash
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [index = 0] 0 ~ 2
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function firework(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  index = 0,
  opacity = 1,
  duration = 400,
  ) {
  let playing = false;
  const param = { t: 0 };

  /**
  * [setup description]
  * @return {[type]} [description]
  */
  function setup() {
		const w = two.width;
		const h = two.height;
		const r = 15;

		let xA = (0.5 * w);
		let yA = (0.75 * h);
		let xB = (0.5 * w);
		let yB = (0.75 * h);
		let xC = (0.5 * w);
		let yC = (0.75 * h);
		let xD = (0.5 * w);
		let yD = (0.75 * h);
		let xE = (0.5 * w);
		let yE = (0.75 * h);
		let xF = (0.5 * w);
		let yF = (0.75 * h);
		let xG = (0.5 * w);
		let yG = (0.75 * h);
		let v = 0;
		const g = 3;

		const circleA = two.makeCircle(
			xA,
			yA,
			r,
		);
		const circleB = two.makeCircle(
			xB,
			yB,
			r,
		);
		const circleC = two.makeCircle(
			xC,
			yC,
			r,
		);
		const circleD = two.makeCircle(
			xD,
			yD,
			r,
		);
		const circleE = two.makeCircle(
			xE,
			yE,
			r,
		);
		const circleF = two.makeCircle(
			xF,
			yF,
			r,
		);
		const circleG = two.makeCircle(
			xG,
			yG,
			r,
		);
    circleA.fill = 'rgb(255, 105, 255)';
		circleB.fill = 'rgb(25, 255, 255)';
		circleC.fill = 'rgb(255, 255, 255)';
		circleD.fill = 'rgb(255, 255, 25)';
		circleE.fill = 'rgb(25, 125, 25)';
		circleF.fill = 'rgb(25, 255, 185)';
		circleG.fill = 'rgb(150, 255, 25)';
		const circles = [circleA, circleB, circleC, circleD, circleE, circleF, circleG];
		for (let i = 0; i < circles.length; i += 1) {
			circles[i].linewidth = 0;
		}


    const ani = new TWEEN.Tween(param)
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        // circleA.scale += 0.1;
        v += g;
				xA += 30;
			  yA += v - 30;
				xB += 20;
			  yB += v - 40;
				xC += 10;
			  yC += v - 45;
				xD += 0;
			  yD += v - 50;
				xE -= 30;
			  yE += v - 30;
				xF -= 20;
			  yF += v - 40;
				xG -= 10;
			  yG += v - 45;
				for (let i = 0; i < circles.length; i += 1) {
					circles[i].scale -= 0.02;
				}
				circleA.translation.set(xA, yA);
				circleB.translation.set(xB, yB);
				circleC.translation.set(xC, yC);
				circleD.translation.set(xD, yD);
				circleE.translation.set(xE, yE);
				circleF.translation.set(xF, yF);
				circleG.translation.set(xG, yG);
      })
      .onComplete(() => {
        circleA.visible = false;
				circleB.visible = false;
				circleC.visible = false;
				circleD.visible = false;
				circleE.visible = false;
				circleF.visible = false;
				circleG.visible = false;
      });
    return { circleA, circleB, circleC, circleD, circleE, circleF, circleG, ani };
  }

  let { circleA, circleB, circleC, circleD, circleE, circleF, circleG, ani } = setup();

  // methods
  const resize = () => {
    two.remove(circleA, circleB, circleC, circleD, circleE, circleF, circleG);
    ({ circleA, circleB, circleC, circleD, circleE, circleF, circleG, ani } = setup());
  };

  const reset = () => {
    ani.stop();
		resize();
  };

  const start = () => {
    reset();
    playing = true;
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
