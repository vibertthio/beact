import React from 'react';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import TodoApp from './components/TodoApp';

const App = () => (
  <MuiThemeProvider>
    <TodoApp />
  </MuiThemeProvider>
);

export default App;
