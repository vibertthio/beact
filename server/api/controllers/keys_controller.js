import { Key } from '../models/Key';

module.exports = {
  create(req, res, next) {
    const keyProps = req.body;
    Key.create(keyProps)
      .then(key => res.send(key))
      .catch(next);
  },

  delete(req, res, next) {
    const keyId = req.params.id;
    Key.findOneAndRemove({ id: keyId })
      .then(key => res.status(204).send(key))
      .catch(next);
  },

  getKeys(req, res, next) {
    Key.find({})
      .then(keys => res.send(keys))
      .catch(next);
  },

  getKey(req, res, next) {
    const keyId = req.params.id;
    Key.findOne({ id: keyId })
      .then(key => res.send(key))
      .catch(next);
  },
};
