import React from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';
import styles from '../assets/styles/Matrix.css';


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
                 ${data[i][j] === 1 ? styles.clicked : ''}`
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
