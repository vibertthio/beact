import React, { Component } from 'react'; // eslint-disable-line

/**
 * [TodoItem description]
 * @param {String} props the specific content of todo item
 * @return {Element} react element
 */
function TodoItem(props) {
  const cls = props.item.finished ? 'item-finished' : '';
  return (
    <div className={cls}>
      {props.item.content}
    </div>
  );
}

const p = React.PropTypes;
TodoItem.propTypes = {
  item: p.shape({
    content: p.string.isRequired,
    finished: p.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
