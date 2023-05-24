const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const consultation = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  hospitalId: {
    type: ObjectId,
    ref: 'hospital',
    required: true,
    trim: true,
  },
  departmentId: {
    type: ObjectId,
    ref: 'department',
    required: true,
    trim: true,
  },
  doctorId: {
    type: ObjectId,
    ref: 'doctor',
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  transactionId: {
    type: ObjectId,
    ref: 'transaction',
    required: false,
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'consulted'],
  },
});

module.exports = mongoose.model('consultation', consultation);
