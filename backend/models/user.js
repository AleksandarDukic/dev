const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, requred: true },
  apol: { type: Boolean },
  aVisina: { type: Number },
  aTezina: { type: Number },
  bIkada: { type: Boolean},
  bZadnjih6: { type: Boolean},
  cBolovi: { type: mongoose.Types.Decimal128 },
  cBolesti: { type: mongoose.Types.Decimal128 },
  dPusac: { type: Boolean },
  dAlkohol: { type: Number },
  dRadno: { type: Number },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
