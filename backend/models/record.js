const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
  user_id : {type: String },
  date: { type: Date },
  excercises: [{
    excercise_id: {type: String },
    s: { type: Number },
    n: { type: Number },
    weight: { type: Number }
  }],
  note: { type: String },
  comment: { type: String },
  done: {type: Boolean },
  quality: { type: Number }
});

module.exports = mongoose.model('Record', recordSchema);
