import Role from '../models/role'

const rolesCont = async (req, res) => {
  const { name } = req.body
  const newRole = new Role({
    name: name,
  })
  await newRole.save()
  res.status(200).json({
    mge: 'rol creado',
  })
}

const listRoles = async (req, res) => {
  try {
    const roles = await Role.find()
    res.status(200).json(roles)
  } catch (error) {
    res.status(500).json({
      message: 'Error while listing roles',
    })
  }
}

export default {
  rolesCont,
  listRoles,
}
