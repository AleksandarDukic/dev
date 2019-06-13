const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
  user_id : {type: String },
  date: { type: Date },
  excercises: [{
    name: {type: String },
    link: { type: String },
    type: { type: String },
    s: { type: Number },
    n: { type: Number },
    w: { type: Number }
  }],
  note: { type: String },
  comment: { type: String },
  quality: { type: Number }
});

module.exports = mongoose.model('Record', recordSchema);


