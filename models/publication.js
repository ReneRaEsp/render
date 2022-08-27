import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const publicationSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    countrySide: { type: String, required: true },
    type: { type: String, required: true },
    likes: {
      type: Number,
      default: 0,
    },
    categories: [
      {
        type: Schema.ObjectId,
        ref: 'category',
      },
    ],
    comments: [
      {
        type: Schema.ObjectId,
        ref: 'comment',
      },
    ],
    author: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

publicationSchema.plugin(mongoosePaginate)

const Publication = mongoose.model('publication', publicationSchema)

export default Publication
