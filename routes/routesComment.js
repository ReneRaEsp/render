import { Router } from 'express'

import commentController from '../controllers/comment.controller'

const router = Router()

const {
  addComment,
  getCommentById,
  updateComment,
  activateComment,
  deactivateComment,
  removeComment,
  likeComment,
} = commentController

router.post('/comment', addComment)

router.get('/comment/:id', getCommentById)

router.put('/comment/:id', updateComment)

router.delete('/comment/:id', removeComment)

router.patch('/comment/:id', likeComment)

router.patch('/comment_activate/:id', activateComment)

router.patch('/comment_deactivate/:id', deactivateComment)

export default router
