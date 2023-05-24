const mongoose = require('mongoose');

const time = new mongoose.Schema({
  time: { type: String, trim: true, required: true },
});

module.exports = mongoose.model('time', time);
