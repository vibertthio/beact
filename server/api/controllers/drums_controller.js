import Drum from '../models/Drum';

module.exports = {

  create(req, res, next) {
    const noteProps = req.body;

    Drum.create(noteProps)
      .then(note => res.send(note))
      .catch(next);
  },

  edit(req, res, next) {
    const noteId = req.params.id;
    const noteProps = req.body;

    Drum.findByIdAndUpdate({ _id: noteId }, noteProps)
      .then(() => Drum.findById({ _id: noteId }))
      .then(note => res.send(note))
      .catch(next);
  },

  delete(req, res, next) {
    const noteId = req.params.id;

    Drum.findByIdAndRemove({ _id: noteId })
      .then(note => res.status(204).send(note))
      .catch(next);
  },

  getposts(req, res, next) {
    Drum.find({})
      .then(notes => res.send(notes))
      .catch(next);
  },

  getpost(req, res, next) {
    const noteId = req.params.id;
    Drum.findOne({ _id: noteId })
      .then(note => res.send(note))
      .catch(next);
  },
};
