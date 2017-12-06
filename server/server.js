import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import apiRouter from './api/routes';

const path = require('path');

const server = express();

if (process.env.NODE_ENV === 'dev') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const webpackDevConfig = require('../webpack.dev.config.js');
  const compiler = webpack(webpackDevConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: { colors: true },
  });
  server.use(middleware);
  server.use(webpackHotMiddleware(compiler));
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
} else {
  server.use(express.static('public'));
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Beact',
    { useMongoClient: true },
  );
}

server.use(bodyParser.json());

apiRouter(server);
server.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
  next();
});

server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
