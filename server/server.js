import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import apiRouter from './api/routes';

const server = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Beact');
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
