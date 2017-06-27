import { Drum, DrumPattern } from '../models/Drum';

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

    Drum.findOneAndUpdate({ id: noteId }, noteProps)
      .then(() => Drum.findOne({ id: noteId }))
      .then(note => res.send(note))
      .catch(next);
  },

  delete(req, res, next) {
    const noteId = req.params.id;

    Drum.findOneAndRemove({ id: noteId })
      .then(note => res.status(204).send(note))
      .catch(next);
  },

  getnotes(req, res, next) {
    Drum.find({})
      .then(notes => res.send(notes))
      .catch(next);
  },

  getnote(req, res, next) {
    const noteId = req.params.id;
    Drum.findOne({ id: noteId })
      .then(note => res.send(note))
      .catch(next);
  },

  createPattern(req, res, next) {
    const noteProps = req.body;

    DrumPattern.create(noteProps)
      .then(note => res.send(note))
      .catch(next);
  },

  editPattern(req, res, next) {
    const noteId = req.params.id;
    const noteProps = req.body;

    DrumPattern.findByIdAndUpdate({ _id: noteId }, noteProps)
      .then(() => Drum.findOne({ _id: noteId }))
      .then(note => res.send(note))
      .catch(next);
  },

  deletePattern(req, res, next) {
    const noteId = req.params.id;

    DrumPattern.findByIdAndRemove({ _id: noteId })
      .then(note => res.status(204).send(note))
      .catch(next);
  },

  getPatterns(req, res, next) {
    DrumPattern.find({})
      .then(notes => res.send(notes))
      .catch(next);
  },

  getPattern(req, res, next) {
    const noteId = req.params.id;
    DrumPattern.findOne({ id: noteId })
      .then(note => res.send(note))
      .catch(next);
  },
};
