import Project from '../models/project.js'
import Category from '../models/category.js'
import Technology from '../models/technology.js'
import User from '../models/user.js'
import Team from '../models/team.js'
const imgbbUploader = require('imgbb-uploader')
let fs = require('fs')
let path = require('path')

const createProject = async (req, res) => {
  const {
    title,
    description,
    image,
    author,
    video,
    team,
    categories,
    technologies,
  } = req.body
  try {
    const project = await Project.create({
      title,
      description,
      image,
      author,
      video,
      team,
      categories,
      technologies,
    })
    if (author) {
      await User.findByIdAndUpdate(author, {
        $addToSet: { projects: project },
      })
    }
    if (categories) {
      categories.forEach(async (category) => {
        await Category.findByIdAndUpdate(category, {
          $addToSet: { projects: project },
        })
      })
    }
    if (technologies) {
      technologies.forEach(async (technology) => {
        await Technology.findByIdAndUpdate(technology, {
          $addToSet: { projects: project },
        })
      })
    }
    if (team) {
      await Team.findByIdAndUpdate(team, {
        project: project,
      })
    }

    res.status(201).json({
      message: 'Project created',
      project,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while adding project',
      error,
    })
  }
}

const addElement = async (req, res) => {
  const { project, team, category, technology } = req.body
  let msg = ''
  try {
    if (team) {
      await Project.findByIdAndUpdate(project, {
        team,
      })
      msg = 'Team added to project'
    } else if (category) {
      await Project.findByIdAndUpdate(
        project,
        {
          $addToSet: { categories: category },
        },
        { new: true, useFindAndModify: false },
      )
      await Category.findByIdAndUpdate(
        category,
        {
          $addToSet: { projects: project },
        },
        { new: true, useFindAndModify: false },
      )
      msg = 'Category added to project'
    } else if (technology) {
      await Project.findByIdAndUpdate(
        project,
        {
          $addToSet: { technologies: technology },
        },
        { new: true, useFindAndModify: false },
      )
      await Technology.findByIdAndUpdate(
        technology,
        {
          $addToSet: { projects: project },
        },
        { new: true, useFindAndModify: false },
      )
      msg = 'Technology added to project'
    }
    res.status(200).json(msg)
  } catch (error) {
    res.status(500).json({
      message: 'Error while adding element to project',
      error,
    })
  }
}

const removeElement = async (req, res) => {
  const { project, technology, category } = req.body
  try {
    let msg = ''
    if (technology) {
      await Project.findByIdAndUpdate(project, {
        $pull: { technologies: technology },
      })
      await Technology.findByIdAndUpdate(technology, {
        $pull: { projects: project },
      })
      msg = 'Technology removed'
    } else if (category) {
      await Project.findByIdAndUpdate(project, {
        $pull: { categories: category },
      })
      await Category.findByIdAndUpdate(category, {
        $pull: { projects: project },
      })
      msg = 'Category removed'
    }
    res.status(200).json({ msg })
  } catch (error) {
    res.status(500).json(error)
  }
}

const GetProjects = async (req, res) => {
  const { page, limit, title } = req.query
  const options = {
    page: page ?? 1,
    limit: limit ?? 10,
    populate: {
      path: 'team',
      model: 'team',
      populate: [
        {
          path: 'devs',
          model: 'user',
          select: {
            password: 0,
          },
        },
      ],
    },
  }
  let findAll = {
    isActive: true,
  }
  const queryByTitle = {
    isActive: true,
    title: { $regex: title, $options: 'i' },
  }
  let query = findAll

  if (title) query = queryByTitle

  try {
    const projects = await Project.paginate(query, options)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({
      message: 'Error while listing projects',
      error,
    })
  }
}

const GetAllProjects = async (req, res) => {
  const { page, limit, title } = req.query
  let query = {}
  const options = {
    page: page ?? 1,
    limit: limit ?? 10,
    populate: {
      path: 'team',
      model: 'team',
      populate: [
        {
          path: 'devs',
          model: 'user',
          select: {
            password: 0,
          },
        },
      ],
    },
  }
  const findByTitle = {
    title: { $regex: title, $options: 'i' },
  }
  if (title) query = findByTitle
  try {
    const projects = await Project.paginate(query, options)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({
      message: 'Error while listing projects',
      error,
    })
  }
}

const GetProjectById = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.findById({
      _id: id,
    }).populate([
      {
        path: 'author',
        model: 'user',
        select: {
          password: 0,
        },
      },
      {
        path: 'team',
        model: 'team',
        populate: {
          path: 'devs',
          model: 'user',
          select: {
            password: 0,
          },
        },
      },
      {
        path: 'categories',
        model: 'category',
      },
      {
        path: 'technologies',
        model: 'technology',
      },
    ])
    if (!project) {
      res.status(404).json({
        message: 'Project not found',
      })
    } else {
      res.status(200).json(project)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error while searching a project',
      error,
    })
  }
}

const UpdateProject = async (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    image,
    author,
    video,
    team,
    categories,
    technologies,
  } = req.body
  try {
    const project = await Project.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        image,
        author,
        video,
        team,
        categories,
        technologies,
      },
    )
    if (!project) {
      res.status(404).json({
        message: 'Project not found',
      })
    } else {
      res.status(200).json(project)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error while searching a project',
      error,
    })
  }
}

const activateProject = async (req, res) => {
  const { id } = req.params
  try {
    await Project.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        isActive: true,
      },
    )
    res.status(201).json({
      message: 'Project activated',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while activating a project',
      error,
    })
  }
}

const deactivateProject = async (req, res) => {
  const { id } = req.params
  try {
    await Project.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        isActive: false,
      },
    )
    res.status(201).json({
      message: 'Project deactivated',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while deactivating a project',
      error,
    })
  }
}

const removeProject = async () => {
  const { id } = req.params
  try {
    await Project.findByIdAndRemove({ _id: id })
    res.status(201).json({
      message: 'Project deleted',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while deleting a project',
      error,
    })
  }
}

const updateImageProject = async (req, res, next) => {
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

    await Project.findByIdAndUpdate(
      req.params._id,

      { image: response.url },
      { userFindModify: false },
    )
    res.status(200).json({
      msg: 'nueva imagen a proyecto',
      response,
    })
    // res.sendFile(path.join(__dirname,'../files/' + req.file.filename))
  } catch (error) {
    next(error)
  }
}

export default {
  createProject,
  GetProjects,
  GetAllProjects,
  GetProjectById,
  UpdateProject,
  activateProject,
  deactivateProject,
  removeProject,
  updateImageProject,
  addElement,
  removeElement,
}
