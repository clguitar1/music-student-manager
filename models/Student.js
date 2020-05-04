const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // reference the users collection in MongoDB
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // TODO: lessonSlot info comes from react-datepicker
  lessonSlot: {
    type: Date,
    required: true,
    default: Date.now,
  },
  instrument: {
    type: String,
    default: 'violin',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('student', StudentSchema);
