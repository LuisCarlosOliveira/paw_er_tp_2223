
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: { type: String, required: true },
  attachments: [{ name: String, file: Buffer }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  voters: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  hidden: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Post', PostSchema);
