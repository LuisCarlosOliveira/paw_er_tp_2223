const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  attachments: [{ name: String, file: Buffer }],
  tags: [String],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  hidden: { type: Boolean, default: false },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Thread", ThreadSchema);
