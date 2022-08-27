import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    rolDes: { type: String, required: false },
    role: { type: String },
    avatar: { type: String, required: false },
    description: { type: String, required: false },
    projects: [{ type: Schema.ObjectId, ref: 'project' }],
    teams: [{ type: Schema.ObjectId, ref: 'team' }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.passwordCode = async (password) => {
  const encryp = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, encryp)
}

userSchema.statics.comparePassword = async (password, passwordRecep) => {
  return await bcrypt.compare(password, passwordRecep)
}

userSchema.plugin(mongoosePaginate)

const User = mongoose.model('user', userSchema)

export default User
