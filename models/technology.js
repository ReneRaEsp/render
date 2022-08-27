import mongoose from 'mongoose'

const { Schema } = mongoose

const technologySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  projects: [
    {
      type: Schema.ObjectId,
      ref: 'project',
      unique: true
    },
  ],
})

const Technology = mongoose.model('technology', technologySchema)

export default Technology
