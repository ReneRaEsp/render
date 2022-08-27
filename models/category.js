import mongoose from 'mongoose'

const { Schema } = mongoose

const categorySchema = new Schema({
  name: { type: String, required: true },
  projects: [
    {
      type: Schema.ObjectId,
      ref: 'project',
    },
  ],
  publications: [
    {
      type: Schema.ObjectId,
      ref: 'publication',
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
})

const Category = mongoose.model('category', categorySchema)

export default Category
