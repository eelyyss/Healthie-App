const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  documentType: { type: String, required: true },
  documentNumber: { type: String, required: true, unique: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  terms: { type: Boolean, required: true },
});

module.exports = mongoose.model('User',User);
