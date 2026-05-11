const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  case_id: { type: String, required: true, unique: true },
  location: String,
  latitude: Number,
  longitude: Number,
  date_of_sighting: Date,
  description: String,
  gender: String,
  approximate_age: Number,
  height_cm: String,
  clothing: String,
  identifying_marks: String,
  contact_info: String,
  additional_info: String,
  photo_url: String,
  status: { type: String, default: 'unidentified' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', CaseSchema);
