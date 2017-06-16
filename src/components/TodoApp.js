import React, { Component } from 'react'; // eslint-disable-line
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../styles/App.css';
import TodoList from './TodoList';
import CountDisplay from './CountDisplay';

// Tap event for mobile
injectTapEventPlugin();

const data = require('./lists.json');

/**
 * TodoApp
 */
class TodoApp extends Component {

  /**
   * [constructor description]
   */
  constructor() {
    super();
    if (data.lists) {
      this.state = {
        lists: data.lists,
      };
    } else {
      this.state = {
        lists: [],
      };
    }
  }

  /**
   * Handle click event of new List
   */
  handleClickNewList() {
    let lists = this.state.lists.slice();
    const newList = {
      name: 'new list',
      items: [],
      inputValue: '',
      editingName: false,
    };
    lists = lists.concat(newList);
    this.setState({
      lists,
    });

    console.log('New List!');
    console.log(`number of lists : ${this.state.lists.length}`);
  }

  /**
   * [handleRemoveList description]
   * @param  {[type]} idList [description]
   */
  handleRemoveList(idList) {
    const lists = this.state.lists;
    lists.splice(idList, 1);
    this.setState({
      lists,
    });
  }

  /**
  * [handleNewItem description]
  * @param  {[type]} idList [description]
  */
  handleNewItem(idList) {
    const input = (this.state.lists[idList]).inputValue;
    if (input !== '') {
      const lists = this.state.lists.slice(); // TODO test if slice is needed
      const list = lists[idList];
      const item = {
        content: input,
        finished: false,
      };
      list.items = list.items.concat(item);
      list.inputValue = '';
      lists[idList] = list;

      this.setState({
        lists,
      });
    }
  }

  /**
   * [handleRemoveItem description]
   * @param  {[type]} idList [description]
   * @param  {[type]} idItem [description]
   */
  handleRemoveItem(idList, idItem) {
    const lists = this.state.lists;
    lists[idList].items.splice(idItem, 1);

    this.setState({
      lists,
    });
  }

  /**
   * [handleEdit description]
   * @param  {[type]} idList [description]
   * @param  {[type]} input  [description]
   */
  handleEdit(idList, input) {
    const lists = this.state.lists; // TODO test if slice is neededs
    lists[idList].inputValue = input;
    this.setState({
      lists,
    });
  }

  /**
   * [handleCheck description]
   * @param  {[type]} idList [description]
   * @param  {[type]} idItem [description]
   */
  handleChecked(idList, idItem) {
    const lists = this.state.lists;
    lists[idList].items[idItem].finished =
      !lists[idList].items[idItem].finished;
    this.setState({
      lists,
    });
  }

  /**
   * [handleStartEditName description]
   * @param  {number} idList id of the list entering edit mode
   */
  handleStartEditName(idList) { // TODO the name of this function should be 'trigger'
    const lists = this.state.lists;
    lists[idList].editingName = !lists[idList].editingName;
    this.setState({
      lists,
    });
  }

  /**
   * [handleEditName description]
   * @param  {[type]} idList [description]
   * @param  {[type]} input  [description]
   */
  handleEditName(idList, input) {
    const lists = this.state.lists;
    lists[idList].name = input;
    this.setState({
      lists,
    });
  }

  /**
   * [itemsCount description]
   * @return {[type]} [description]
   */
  itemsCount() {
    let finished = 0;
    let unfinished = 0;

    const lists = this.state.lists;
    const nOfLists = lists.length;
    for (let i = 0; i < nOfLists; i += 1) {
      const list = lists[i];
      const nOfItems = list.items.length;
      for (let j = 0; j < nOfItems; j += 1) {
        console.log('check');
        console.log(list[j]);
        if (list.items[j].finished) {
          finished += 1;
        } else {
          unfinished += 1;
        }
      }
    }

    console.log(`finished : ${finished}`);
    console.log(`unfinished : ${unfinished}`);

    return {
      finished,
      unfinished,
    };
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const n = this.state.lists.length;
    const list = Array(n).fill().map((x, i) => i);
    const count = this.itemsCount();
    return (
      <div className="App">

        <div className="App-header">
          <h1>TODOSS</h1>
        </div>

        <CountDisplay count={count} />

        <RaisedButton
          label="New Todo List"
          onClick={() => this.handleClickNewList()}
        />

        <ul className="Lists">
          {list.map(i =>
            <li key={i.toString()}>
              <TodoList
                id={i}
                list={this.state.lists[i]}
                handleEdit={(idl, input) => this.handleEdit(idl, input)}
                handleClick={idl => this.handleNewItem(idl)}
                handleRemoveList={idl => this.handleRemoveList(idl)}
                handleRemove={(idl, idi) => this.handleRemoveItem(idl, idi)}
                handleChecked={(idl, idi) => this.handleChecked(idl, idi)}
                handleStartEditName={idl => this.handleStartEditName(idl)}
                handleEditName={(idl, input) => this.handleEditName(idl, input)}
              />
            </li>)
          }
        </ul>

      </div>
    );
  }
}

export default TodoApp;
