import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';
import styles from '../styles/Matrix.css';
import idleDetection from '../utils/IdleDetection';

class Matrix extends Component {
  constructor() {
    super();
    this.state = {
      idle: false,
      hover: { i: -1, j: -1 },
      isDown: false,
    };
    this.setIdle = this.setIdle.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.setIsDown = this.setIsDown.bind(this);
  }

  componentDidMount() {
    this.timer = idleDetection(this.setIdle);
  }

  setIdle(isIdle) {
    this.setState({
      idle: isIdle,
    });
  }

  setIsDown(isDown) {
    this.setState({
      isDown,
    });
  }

  mouseEnter(i, j) {
    const { isDown } = this.state;
    const { onClick } = this.props;
    this.setIdle(false);
    this.setState({
      hover: { i, j },
    });
    if (isDown) {
      console.log(`dragclicking ${i}, ${j}`);
      onClick(i, j);
    }
  }

  mouseDown(i, j) {
    const { onClick } = this.props;
    onClick(i, j);
    this.setIsDown(true);
  }

  componentWillUnmout() {
    this.setState({
      idle: true,
    });
    this.timer.deleteTimer();
  }

  render() {
		const { idle, hover } = this.state;
    const { data } = this.props;
    return (
      <div
        className={
          `${styles.matrix}
          ${(idle === true) ? styles.idle : ''}`}
      >
        {data.map((row, i) => (
          <div
            key={uuid4()}
            className={
              `${styles.row}`
            }
          >
            {row.map((d, j) => (
              <button
                key={uuid4()}
                className={
                  `${styles.rect}
                   ${(i === this.props.currentBeat) && this.props.playing ?
                    styles.current : ''}
                   ${data[i][j] === 1 ? styles.clicked : ''}
									 ${(hover.i === i && hover.j === j) ? styles.hover : ''}`
                  }
                onMouseEnter={() => this.mouseEnter(i, j)}
                onMouseDown={() => this.mouseDown(i, j)}
                onMouseUp={() => this.setIsDown(false)}
                // onTouchTap={() => onClick(i, j)}
              />))}
          </div>))}
      </div>
    );
  }
}

Matrix.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number).isRequired).isRequired,
  playing: PropTypes.bool.isRequired,
  currentBeat: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Matrix;
