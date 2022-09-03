import User from '../models/user'
const imgbbUploader = require('imgbb-uploader')
let fs = require('fs')
require('dotenv').config()
let path = require('path')

const searchxId = async (req, res) => {
  const id = req.params.id
  const options = { select: { password: 0 } }
  const buscado = await User.findById(id, options).populate([
    {
      path: 'projects',
      model: 'project',
    },
    {
      path: 'teams',
      model: 'team',
      populate: {
        path: 'project',
        model: 'project',
      },
    },
  ])

  if (buscado) {
    res.status(200).json({
      UserSprint: buscado,
    })
  } else
    res.status(204).json({
      msg: 'no se encontro el usuario',
    })
}

const editUser = async (req, res, next) => {
  const id = req.params.id
  const { firstName, lastName, description, rolDes, phone } = req.body
  const newUser = {
    firstName: firstName,
    lastName: lastName,
    description: description,
    rolDes: rolDes,
    phone: phone,
  }
  try {
    await User.findByIdAndUpdate(id, newUser, { userFindModify: true })
    res.status(200).json({
      msg: 'usuario modificado',
    })
  } catch (error) {
    next(error)
  }
  console.log(newUser)
}

const editEmail = async (req, res) => {
  const idUser = req.params.id

  const { email } = req.body
  console.log(email)
  const search = await User.findOne({ email })
  if (!search) {
    const newEmail = {
      email: email,
    }

    try {
      await User.findByIdAndUpdate(idUser, newEmail, { userFindModify: true })
      res.status(200).json({
        msg: 'email modificado',
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(204).json({
      msg: 'usuario ya existe',
    })
  }
}

const listUser = async (req, res) => {
  const { page, limit, name } = req.query

  let query = {}

  const options = {
    select: {
      password: 0,
    },
    page: page ?? 1,
    limit: limit ?? 10,
    populate: [
      {
        path: 'projects',
        model: 'project',
      },
      {
        path: 'teams',
        model: 'team',
        populate: [
          {
            path: 'project',
            model: 'project',
          },
        ],
      },
    ],
  }

  const findByName = {
    $or: [
      { firstName: { $regex: name, $options: '-i' } },
      { lastName: { $regex: name, $options: '-i' } },
    ],
  }

  if (name) query = findByName

  try {
    const list = await User.paginate(query, options)
    res.status(200).json(list)
  } catch (error) {
    res.status(500).json({
      message: 'Error while listing users',
    })
  }
}

const deleteUser = async (req, res, next) => {
  const idUser = req.params.id

  const newUser = {
    status: false,
  }

  try {
    await User.findByIdAndUpdate(idUser, newUser, { userFindModify: true })
    res.status(200).json({
      msg: 'usuario eliminado',
    })
  } catch (error) {
    next(error)
  }
}

const uploadAvatar = async (req, res, next) => {
  try {
    let response = await imgbbUploader(
      process.env.API_KEY_IMGBB,
      path.join(__dirname, `../files/${req.file.filename}`),
    )
    if (response) {
      console.log(
        fs.existsSync(path.join(__dirname, '../files/' + req.file.filename)),
      )
      if (
        fs.existsSync(path.join(__dirname, '../files/' + req.file.filename)) &&
        req.file.filename !== 'default-image.png'
      ) {
        fs.unlinkSync(path.join(__dirname, `../files/${req.file.filename}`))
      } else {
        console.log('no se encontro el archivo')
      }
    }
    await User.findByIdAndUpdate(
      req.params.id,
      { avatar: response.url },
      { userFindModify: false },
    )
    res.status(200).json({
      msg: 'usuario actualizado',
      response,
    })
    // res.sendFile(path.join(__dirname,'../files/' + req.file.filename))
  } catch (error) {
    next(error)
  }
}

export default {
  searchxId,
  editUser,
  listUser,
  deleteUser,
  editEmail,
  uploadAvatar,
}
