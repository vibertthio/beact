import React, { Component } from 'react'; // eslint-disable-line
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import removeSVG from 'material-ui/svg-icons/action/delete';
import editSvg from './../svg/edit.svg';
import deleteSvg from './../svg/delete.svg';
import addSvg from './../svg/add.svg';

import TodoItem from './TodoItem';

/**
 * TodoList
 */
class TodoList extends React.Component {
  /**
   * [constructor description]
   */
  constructor() {
    super();

    this.handleEdit = this.handleEdit.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  /**
   * list
   * @type {[type]}
   * @return {Element}
   */
  list() {
    const n = this.props.list.items.length;
    const list = Array(n).fill().map((x, i) => i);
    return (
      list.map(
        i => (
          <ListItem
            className="todo-item"
            key={i.toString()}
            hoverColor="rgba(200, 240, 200, 0.4)"
            leftIcon={<Checkbox
              checked={this.props.list.items[i].finished}
              onTouchTap={() => this.props.handleChecked(this.props.id, i)}
            />}
            rightIcon={
              <NavigationClose
                onTouchTap={() => {
                  this.handleRemove(i);
                }}
              />
            }
          >
            <TodoItem
              item={this.props.list.items[i]}
            />
          </ListItem>
        ),
        this,
      )
    );
  }

  /**
   * [title description]
   * @return {[type]} [description]
   */
  title() {
    const list = this.props.list;
    let name = null;
    if (list.editingName) {
      name = (
        <TextField
          className="edit-name"
          id="edit-name-text"
          value={list.name}
          onChange={e =>
            this.props.handleEditName(
              this.props.id,
              e.currentTarget.value,
            )
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.props.handleEditName(
                this.props.id,
                list.name,
              );
              this.props.handleStartEditName(this.props.id);
            }
          }}
        />
      );
    } else {
      name = list.name;
    }

    return (
      <div className="list-title">
        <h2>
          {name}
        </h2>
      </div>
    );
  }

  /**
   * [editNameButton description]
   * @return {[type]} [description]
   */
  editNameButton() {
    return (
      <button
        className="edit-btn"
        onClick={() => this.props.handleStartEditName(this.props.id)}
      >
        <img
          src={editSvg}
          className="edit-svg"
          alt="edit"
        />
      </button>
    );
  }

  /**
   * [removeButton description]
   * @return {[type]} [description]
   */
  removeButton() {
    return (
      <button
        className="delete-list-btn"
        onClick={() => this.props.handleRemoveList(this.props.id)}
      >
        <img
          src={deleteSvg}
          className="delete-svg"
          alt="edit"
        />
      </button>
    );
  }

  /**
   * [addItemButton description]
   * @return {[type]} [description]
   */
  addItemButton() {
    return (
      <button
        className="add-item-btn"
        onClick={() => {
          const id = this.props.id;
          this.props.handleClick(id);
        }}
      >
        <img
          src={addSvg}
          className="add-item-svg"
          alt="edit"
        />
      </button>
    );
  }

  /**
   * Handle remove event of new item.
   * @param {int} idx
   */
  handleRemove(idx) {
    console.log(`remove item #${idx}`);
    const id = this.props.id;
    this.props.handleRemove(id, idx);
  }

  /**
   * Handle edit event of new item.
   * @param {Event} e edit event
   */
  handleEdit(e) {
    this.props.handleEdit(this.props.id, e.currentTarget.value);
  }

  /**
   * Handle key event of new item.
   * @param {Event} e edit event
   */
  handleKey(e) {
    if (e.key === 'Enter') {
      const id = this.props.id;
      this.props.handleClick(id);
    }
  }

  /**
   * [unfinishedCount description]
   * @return {[type]} [description]
   */
  unfinishedCount() {
    const items = this.props.list.items;
    const n = items.length;
    let count = 0;
    for (let i = 0; i < n; i += 1) {
      if (items[i].finished === false) {
        count += 1;
      }
    }
    return count;
  }

  /**
   * Rendering
   * @return {Element}
   */
  render() {
    const list = this.props.list;
    return (
      <div className="container">
        {this.removeButton()}
        {this.editNameButton()}
        <hr className="divider-up" />

        {this.title()}
        <hr className="divider-bottom" />
        <ItemCount nOfItems={this.unfinishedCount()} />
        <List className="List">
          {this.list()}
        </List>

        <TextField
          hintText="new todo item"
          value={list.inputValue}
          onChange={this.handleEdit}
          onKeyUp={this.handleKey}
        />

        {this.addItemButton()}

        <br />
      </div>
    );
  }
}

const p = React.PropTypes;

TodoList.propTypes = {
  id: p.number.isRequired,
  list: p.shape({
    name: p.string.isRequired,
    items: p.arrayOf(p.shape({
      content: p.string.isRequired,
      finished: p.bool.isRequired,
    })).isRequired,
    inputValue: p.string.isRequired,
    editingName: p.bool.isRequired,
  }).isRequired,
  handleEdit: p.func.isRequired,
  handleChecked: p.func.isRequired,
  handleClick: p.func.isRequired,
  handleRemove: p.func.isRequired,
  handleRemoveList: p.func.isRequired,
  handleStartEditName: p.func.isRequired,
  handleEditName: p.func.isRequired,
};


/**
 * ItemCount
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
function ItemCount(props) {
  let setence = 'no todo left';
  if (props.nOfItems === 1) {
    setence = '1 todo left';
  } else if (props.nOfItems > 1) {
    setence = `${props.nOfItems} todos left`;
  }
  return (
    <div>
      <p className="item-count">{setence}</p>
    </div>
  );
}

ItemCount.propTypes = {
  nOfItems: p.number.isRequired,
};

export default TodoList;
