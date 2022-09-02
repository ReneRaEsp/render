import jwt from 'jsonwebtoken'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import roles from './../helpers/roles'

dotenv.config()

const SECRET = process.env.SECRET
const { USER, ADMIN, MODERATOR } = roles

const signUp = async (req, res) => {
  const { email, password, rolDes, firstName, lastName, phone } = req.body
  try {
    const passwordHash = await User.passwordCode(password)
    const newUser = new User({
      email: email,
      password: passwordHash,
      role: USER.name,
      rolDes: rolDes,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      isActive: true,
    })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '12d' })
    const user = {
      token: token,
      email: newUser.email,
      id: newUser.id,
    }
    res.status(200).json({ msg: 'User created', user })
  } catch (error) {
    res.status(500).json({
      message: 'Error while creating a new user',
    })
  }
}

const signUpModerator = async (req, res) => {
  const { email, password, rolDes, firstName, lastName, phone } = req.body
  try {
    const passwordHash = await User.passwordCode(password)
    const newUser = new User({
      email: email,
      password: passwordHash,
      role: MODERATOR.name,
      rolDes: rolDes,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      isActive: true,
    })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '12d' })
    const user = {
      token: token,
      email: newUser.email,
      id: newUser.id,
    }
    res.status(200).json({ msg: 'User created', user })
  } catch (error) {
    res.status(500).json({
      message: 'Error while creating a new user',
    })
  }
}

const signUpAdmin = async (req, res) => {
  const { email, password, rolDes, firstName, lastName, phone } = req.body
  try {
    const passwordHash = await User.passwordCode(password)
    const newUser = new User({
      email: email,
      password: passwordHash,
      role: ADMIN.name,
      rolDes: rolDes,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      isActive: true,
    })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '12d' })
    const user = {
      token: token,
      email: newUser.email,
      id: newUser.id,
    }
    res.status(200).json({ msg: 'User created', user })
  } catch (error) {
    res.status(500).json({
      message: 'Error while creating a new user',
    })
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const searchEmail = await User.findOne({ email: email })
    if (searchEmail) {
      const searchPass = await bcrypt.compare(password, searchEmail.password)
      if (searchPass) {
        const token = jwt.sign({ id: searchEmail._id }, SECRET, {
          expiresIn: '12d',
        })

        delete searchEmail._doc.password

        res.status(200).json({
          token,
          user: searchEmail,
        })
      } else {
        res.status(204).json({
          msg: 'wrong password',
        })
      }
    } else {
      res.status(204).json({
        msg: 'wrong email',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'error while signIn',
    })
  }
}

export default {
  signUp,
  signUpAdmin,
  signUpModerator,
  signIn,
}
