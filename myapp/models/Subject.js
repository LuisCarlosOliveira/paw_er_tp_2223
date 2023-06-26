const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    minlength: 1, // The name must be at least one character long.
    description: 'The name of the subject.',
  },
  courses: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Course',
    description: 'The courses that include this subject.'
  }]
});

module.exports = mongoose.model('Subject', SubjectSchema);
