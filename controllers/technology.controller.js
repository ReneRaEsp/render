import Technology from '../models/technology'

const addTechnology = async (req, res) => {
  try {
    const tech = await Technology.create({
      name: req.body.name,
      image: req.body.image,
    })
    res.status(201).json(tech)
  } catch (e) {
    res.status(500).json({
      message: 'Error while adding technology',
      e,
    })
  }
}

const listTechnologies = async (req, res) => {
  const { name } = req.query
  let query = {}
  const queryByName = {
    name: { $regex: name, $options: 'i' },
  }
  if (name) query = queryByName

  try {
    const techs = await Technology.find(query)
    if (!techs) {
      res.status(404).json({
        message: "there's no technologies",
      })
    } else {
      res.status(200).json(techs)
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while listing technologies',
      e,
    })
  }
}

const getTechnologyById = async (req, res) => {
  const { id } = req.params
  try {
    const tech = await Technology.findOne({
      _id: id
    })
    if (!tech) {
      res.status(404).json({
        message: 'Technology not found',
      })
    } else {
      res.status(200).json(tech)
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while searching a technology',
      e,
    })
  }
}

const updateTechnology = async (req, res) => {
  try {
    const tech = await Technology.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, image: req.body.image },
    )
    res.status(205).json(tech)
  } catch (e) {
    res.status(500).json({
      message: 'Error while updating a technology',
      e,
    })
  }
}

const removeTechnology = async (req, res) => {
  try {
    const tech = await Technology.findByIdAndDelete({
      _id: req.params.id,
    })
    res.status(200).json(tech)
  } catch (e) {
    res.status(500).json({
      message: 'Error while deleting a technology',
      e,
    })
  }
}

export default {
  addTechnology,
  listTechnologies,
  getTechnologyById,
  updateTechnology,
  removeTechnology,
}
