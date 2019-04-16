const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  admin : {type : Boolean },
  email: { type: String, required: true, unique: true },
  password: { type: String, requred: true },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  ever: { type: Boolean},
  mth: { type: Boolean},
  hurt: { type: Number },
  diss: { type: Number },
  smoke: { type: Boolean },
  alch: { type: Boolean },
  work: { type: Number },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
