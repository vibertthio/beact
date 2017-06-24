import React from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';
import styles from '../assets/styles/Matrix.css';

let timeoutID;
let idle = false;
/**
 * [mouseTimerSetup description]
 */
function mouseTimerSetup() {
	window.addEventListener('mousemove', resetTimer, false);
	window.addEventListener('mousedown', resetTimer, false);
	window.addEventListener('keypress', resetTimer, false);
	window.addEventListener('DOMMouseScroll', resetTimer, false);
	window.addEventListener('mousewheel', resetTimer, false);
	window.addEventListener('touchmove', resetTimer, false);
	window.addEventListener('MSPointerMove', resetTimer, false);
	startTimer();
}
mouseTimerSetup();
/**
 * [goActive description]
 */
function goActive() {
	startTimer();
}
/**
 * [goInActive description]
 */
function goInactive() {
	console.log('you have idled for 3s');
	idle = true;
	startTimer();
}
/**
 * [startTimer description]
 */
function startTimer() {
	timeoutID = window.setTimeout(goInactive, 3000);
}
/**
 * [resetTimer description]
 */
function resetTimer() {
	window.clearTimeout(timeoutID);
	idle = false;
	goActive();
}

const Matrix = (props) => {
  const { data, onClick } = props;
  return (
    <div className={styles.matrix}>
      {data.map((row, i) =>
        <div
          key={uuid4()}
          className={
            `${styles.row}`
          }
        >
          {row.map((d, j) =>
            <div
              key={uuid4()}
              className={
                `${styles.rect}
                 ${(i === props.currentBeat) && props.playing ?
                   styles.current : ''}
                 ${data[i][j] === 1 ? styles.clicked : ''}
								 ${(idle === true) ? styles.idle : ''}`
              }
              onTouchTap={() => onClick(i, j)}
            />,
          )}
        </div>,
      )}
    </div>
  );
};

Matrix.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ).isRequired,
  ).isRequired,
  // currentBeat: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default Matrix;
