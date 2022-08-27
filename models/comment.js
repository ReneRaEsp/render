import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.ObjectId,
    ref: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

const Comment = mongoose.model('comment', commentSchema)

export default Comment
