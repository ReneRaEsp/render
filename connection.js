import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL

const connectToDB = () => {
  mongoose.connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Mongoose Is Connected')
    },
  )
}

export default connectToDB
