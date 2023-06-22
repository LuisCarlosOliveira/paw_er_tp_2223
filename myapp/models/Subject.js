const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
});

module.exports = mongoose.model('Subject', SubjectSchema);
