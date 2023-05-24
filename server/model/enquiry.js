const mongoose = require('mongoose');

const enquiry = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  message: { type: String, trim: true, required: true },
  status: {
    type: String,
    enum: ['unread', 'read'],
    required: false,
    default: 'unread',
  },
});

module.exports = mongoose.model('enquiry', enquiry);
