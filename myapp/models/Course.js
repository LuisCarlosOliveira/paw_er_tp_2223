const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

module.exports = mongoose.model('Course', courseSchema);