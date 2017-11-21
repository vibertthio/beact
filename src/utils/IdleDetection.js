/**
 * [mouseTimerSetup description]
 * @param  {Function} setIdle
 * @return {Object}
 * it takes on param, for setting the idle state
 */
function idleDetection(setIdle) {
	// window.addEventListener('mousemove', resetTimer, false);
	window.addEventListener('mousedown', resetTimer, false);
	let timeoutID = window.setTimeout(firstGoInactive, 12000);

  function resetTimer() {
  	window.clearTimeout(timeoutID);
		setIdle(false);
    startTimer();
  }

  function startTimer() {
  	timeoutID = window.setTimeout(goInactive, 3500);
  }

  function goInactive() {
  	// console.log('you have idled for 3s');
  	setIdle(true);
  	startTimer();
  }

  function firstGoInactive() {
  	// console.log('you have idled for 12s');
    setIdle(true);
  	startTimer();
  }

	function deleteTimer() {
		window.clearTimeout(timeoutID);
	}

	return {
		deleteTimer,
	};
}

export default idleDetection;
