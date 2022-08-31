import Category from './../models/category'

const addCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      projects: req.body.projects,
      publications: req.body.publications,
    })
    res.status(201).json(category)
  } catch (e) {
    res.status(500).json({
      message: 'Error while adding technology',
      e,
    })
  }
}

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json({
      message: 'Error while listing categories',
      e,
    })
  }
}

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
    }).populate([
      {
        path: 'projects',
        model: 'project',
      },
      {
        path: 'publications',
        model: 'publication',
      },
    ])
    if (!category) {
      res.status(404).json({
        message: 'Category not found',
      })
    } else {
      res.status(200).json(category)
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while searching a category',
      e,
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
    )
    res.status(205).json(category)
  } catch (e) {
    res.status(500).json({
      message: 'Error while updating a category',
      e,
    })
  }
}

const removeCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({
      _id: req.params.id,
    })
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json({
      message: 'Error while deleting a category',
      e,
    })
  }
}

export default {
  addCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  removeCategory,
}
