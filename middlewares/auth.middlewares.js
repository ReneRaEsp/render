import User from '../models/user'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const strToken = req.headers.authorization

    if (!strToken)
      return res
        .status(403)
        .json({ msg: 'You must log in or create a user account!' })
    const token = strToken.includes(' ') ? strToken.split(' ')[1] : strToken
    const key = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ _id: key.id })
    if (!user) return res.status(401).json('Access denied')
    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ error })
  }
}

const isSameUser = async (req, res, next) => {
  const strToken = req.headers.authorization
  const { id } = req.params
  try {
    const token = strToken.includes(' ') ? strToken.split(' ')[1] : strToken
    const key = jwt.verify(token, process.env.SECRET)

    if (key.id != id)
      res.status(403).json({
        msg: 'You can only update your own profile',
      })

    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

const isAdmin = async (req, res, next) => {
  const strToken = req.headers.authorization
  try {
    const token = strToken.includes(' ') ? strToken.split(' ')[1] : strToken
    const key = jwt.verify(token, process.env.SECRET)

    if (key.role != 'admin')
      res.status(403).json({
        msg: 'Unauthorized',
      })
    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

export default { auth, isSameUser, isAdmin }
