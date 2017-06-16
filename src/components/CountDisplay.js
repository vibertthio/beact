import React, { Component } from 'react'; // eslint-disable-line

/**
 * [CountDisplay description]
 * @param {[type]} props [description]
 * @return {Element}
 */
function CountDisplay(props) {
  let f = 'no any todo finished';
  let uf = 'no any todo left';

  const { finished, unfinished } = props.count;
  if (finished === 1) {
    f = '1 todo finished';
  } else if (finished > 1) {
    f = `${finished} todos finished`;
  }
  if (unfinished === 1) {
    uf = '1 todo left';
  } else if (unfinished > 1) {
    uf = `${unfinished} todos left`;
  }

  return (
    <div>
      <p className="lists-count">{f}, {uf}</p>
    </div>
  );
}

CountDisplay.propTypes = {
  count: React.PropTypes.shape({
    finished: React.PropTypes.number.isRequired,
    unfinished: React.PropTypes.number.isRequired,
  }).isRequired,
};

export default CountDisplay;
