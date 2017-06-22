import mongoose, { Schema } from 'mongoose';

const DrumSchema = new Schema({
  title: String,
  content: Array,
});

const Drum = mongoose.model('notes', DrumSchema);

module.exports = Drum;
