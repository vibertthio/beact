import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';
import styles from '../styles/Matrix.css';
import idleDetection from '../utils/IdleDetection';

/**
 * [className description]
 */
class Matrix extends Component {
  /**
   * [constructor description]
   */
  constructor() {
    super();
    this.state = {
      idle: false,
      hover: { i: '', j: '' },
    };
    this.setIdle = this.setIdle.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    this.timer = idleDetection(this.setIdle);
  }

  /**
   * [setIdle description]
   * @param {Boolean} isIdle [description]
   */
  setIdle(isIdle) {
    this.setState({
      idle: isIdle,
    });
  }

  /**
   * [componentWillUnmout description]
   */
  componentWillUnmout() {
    this.setState({
      idle: true,
    });
    this.timer.deleteTimer();
  }

  /**
   * [mouseOver description]
   * @param {number} i [description]
   * @param {number} j [description]
   */
  mouseOver(i, j) {
    this.setState({
      hover: { i, j },
    });
  }

  /**
   * [render description]
   * @return {Element} [description]
   */
  render() {
		const { hover } = this.state;
    const { data, onClick } = this.props;
    return (
      <div
        className={
          `${styles.matrix}
          ${(this.state.idle === true) ? styles.idle : ''}`}
      >
        {data.map((row, i) =>
          <div
            key={uuid4()}
            className={
              `${styles.row}`
            }
          >
            {row.map((d, j) =>
              <button
                key={uuid4()}
                className={
                  `${styles.rect}
                   ${(i === this.props.currentBeat) && this.props.playing ?
                    styles.current : ''}
                   ${data[i][j] === 1 ? styles.clicked : ''}
									 ${hover.i === i && hover.j === j ? styles.hover : ''}`
                  }
                onMouseEnter={() => this.mouseOver(i, j)}
                onTouchTap={() => onClick(i, j)}
              />,
              )}
          </div>,
        )}
      </div>
    );
  }
}

Matrix.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ).isRequired,
  ).isRequired,
  playing: PropTypes.bool.isRequired,
  currentBeat: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Matrix;
