import mongoose, { Schema } from 'mongoose';

const DrumSchema = new Schema({
  id: Number,
  title: String,
  content: Array,
});

const Drum = mongoose.model('notes', DrumSchema);
const DrumPattern = mongoose.model('patterns', DrumSchema);

module.exports = { Drum, DrumPattern };
