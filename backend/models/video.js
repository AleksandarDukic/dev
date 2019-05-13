const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  name: { type: String },
  link: { type: String },
  note: { type: String },
  type: { type: Number }
});

module.exports = mongoose.model('Video', videoSchema);
