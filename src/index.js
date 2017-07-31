import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';
import './index.css';

injectTapEventPlugin();

const rootElement = document.getElementById('root');

let app;
if (module.hot) {
  const { AppContainer } = require('react-hot-loader');
  app = (
    <AppContainer>
      <App />
    </AppContainer>
  );

  module.hot.accept('./components/App', () => {
    window.location.reload(true);
    // const NewApp = require('./components/App').default;
    // render(
    //   <AppContainer>
    //     <NewApp />
    //   </AppContainer>,
    //   rootElement,
    // );
  });
} else {
  app = <App />;
}

render(app, rootElement);
