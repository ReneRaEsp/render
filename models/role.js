import mongoose from 'mongoose'

const { Schema } = mongoose

const roleSchema = new Schema({
  name: { type: String, required: true },
})

const Role = mongoose.model('role', roleSchema)

export default Role
