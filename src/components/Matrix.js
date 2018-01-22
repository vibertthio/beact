import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';
import styles from '../styles/Matrix.sass';
import idleDetection from '../utils/IdleDetection';

class Matrix extends Component {
  constructor() {
    super();
    this.state = {
      idle: false,
      hover: { i: -1, j: -1 },
    };
    this.setIdle = this.setIdle.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  componentDidMount() {
    this.timer = idleDetection(this.setIdle);
  }

  setIdle(isIdle) {
    this.setState({
      idle: isIdle,
    });
  }

  mouseEnter(e, i, j) {
    const { onClick } = this.props;
    this.setIdle(false);
    this.setState({
      hover: { i, j },
    });
    // console.log(`e.buttons: ${e.buttons}`);
    // console.log(`e.nativeEvent.which: ${e.nativeEvent.which}`);
    // only when dragging; polyfilling safari, which doesn't support e.buttons
    if (
      (e.buttons === undefined && e.nativeEvent.which === 1) ||
      e.buttons === 1
    ) {
      onClick(i, j);
    }
  }

  componentWillUnmout() {
    this.setState({
      idle: true,
    });
    this.timer.deleteTimer();
  }

  render() {
    const { idle, hover } = this.state;
    const { data, onClick } = this.props;
    return (
      <div className={`${styles.cont}`}>
        <div
          className={`${styles.matrix}
            ${idle === true ? styles.idle : ''}`}
        >
          {data.map((col, i) => (
            <div key={uuid4()} className={`${styles.col}`}>
              {col.map((d, j) => (
                <button
                  key={uuid4()}
                  className={`${styles.rect}
                     ${
                       i === this.props.currentBeat && this.props.playing
                         ? styles.current
                         : ''
                     }
                     ${data[i][j] === 1 ? styles.clicked : ''}
                     ${hover.i === i && hover.j === j ? styles.hover : ''}`}
                  onMouseEnter={e => this.mouseEnter(e, i, j)}
                  onMouseDown={() => onClick(i, j)}
                  // onTouchTap={() => onClick(i, j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Matrix.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number).isRequired)
    .isRequired,
  playing: PropTypes.bool.isRequired,
  currentBeat: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Matrix;
