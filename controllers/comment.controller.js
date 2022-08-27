import Comment from './../models/comment'
import Publication from '../models/publication'

const addComment = async (req, res) => {
  const { author, content, publication } = req.body
  try {
    const publicationCommented = await Publication.findOne({
      _id: publication,
    })
    if (!publicationCommented) {
      res.status(404).json({
        message: 'Publication not found',
      })
    } else {
      const comment = await Comment.create({
        author,
        content,
      })
      publicationCommented.comments.push(comment)
      publicationCommented.save()
      res.status(200).json(publicationCommented)
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while adding comment',
    })
  }
}

const getCommentById = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findById(id).populate('author')
    if (!comment) {
      res.status(404).json({
        message: 'Comment not found',
      })
    } else {
      res.status(200).json(comment)
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while finding comment',
    })
  }
}

const updateComment = async (req, res) => {
  const { id } = req.params
  const { content } = req.body
  try {
    const comment = await Comment.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        content,
      },
    )
    res.status(205).json(comment)
  } catch (e) {
    res.status(500).json({
      message: 'Error while updating a comment',
    })
  }
}

const likeComment = async (req, res) => {
  const { id } = req.params
  try {
    let commentLiked = await Comment.findOne({
      _id: id,
    })
    if (!commentLiked) {
      res.status(404).json({
        message: 'Comment not found',
      })
    } else {
      let likes = commentLiked.likes
      likes++
      await Comment.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          likes,
        },
      )
      res.status(200).json({
        message: 'Comment liked!',
      })
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while liking comment',
      e,
    })
  }
}

const activateComment = async (req, res) => {
  const { id } = req.params
  try {
    await Comment.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        isActive: true,
      },
    )
    res.status(200).json({
      message: 'Comment activated',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error while activating a comment',
    })
  }
}

const deactivateComment = async (req, res) => {
  const { id } = req.params
  try {
    await Comment.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        isActive: false,
      },
    )
    res.status(200).json({
      message: 'Comment deactivated',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error while activating a comment',
    })
  }
}

const removeComment = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByIdAndDelete({
      _id: id,
    })
    res.status(200).json(comment)
  } catch (e) {
    res.status(500).json({
      message: 'Error while deleting a comment',
    })
  }
}

export default {
  addComment,
  getCommentById,
  updateComment,
  likeComment,
  activateComment,
  deactivateComment,
  removeComment,
}
