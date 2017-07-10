let timeoutID;
const state = { idle: false };

(function mouseTimerSetup() {
	// window.addEventListener('mousemove', resetTimer, false);
	window.addEventListener('mousedown', resetTimer, false);
	timeoutID = window.setTimeout(firstGoInactive, 12000);
	// startTimer();
}());

/**
 * [resetTimer description]
 */
function resetTimer() {
	window.clearTimeout(timeoutID);
	state.idle = false;
	goActive();
}

/**
 * [startTimer description]
 */
function startTimer() {
	timeoutID = window.setTimeout(goInactive, 3000);
}

/**
 * [goInActive description]
 */
function goInactive() {
	console.log('you have idled for 3s');
	state.idle = true;
	startTimer();
}

/**
 * [goActive description]
 */
function goActive() {
	startTimer();
}

/**
 * [firstGoInActive description]
 * wait 12s if mouse idle at first
 */
function firstGoInactive() {
	console.log('you have idled for 12s');
	state.idle = true;
	startTimer();
}

export default state;
