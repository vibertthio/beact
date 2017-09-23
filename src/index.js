import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DrumMachine from './components/DrumMachine';
import './index.css';

injectTapEventPlugin();

const rootElement = document.getElementById('root');

let app;
if (module.hot) {
  const { AppContainer } = require('react-hot-loader');
  app = (
    <AppContainer>
      <DrumMachine />
    </AppContainer>
  );

  module.hot.addStatusHandler((status) => {
    // React to the current status...
    console.log(`status : ${status}`);
  });

  module.hot.accept('./components/DrumMachine', () => {
    window.location.reload(true);
    console.log('test');
    // const NewApp = require('./components/App').default;
    // render(
    //   <AppContainer>
    //     <NewApp />
    //   </AppContainer>,
    //   rootElement,
    // );
  });
} else {
  app = <DrumMachine />;
}

render(app, rootElement);
