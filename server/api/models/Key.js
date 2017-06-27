import mongoose, { Schema } from 'mongoose';

const KeySchema = new Schema({
  id: String,
  content: Array,
  startTime: Number,
});

const Key = mongoose.model('keys', KeySchema);

module.exports = { Key };
