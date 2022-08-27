import { Router } from 'express'
import publicationController from '../controllers/publication.controller'

const router = Router()
const {
  addPublication,
  listPublications,
  listAllPublications,
  getPublicationById,
  getPublicationByIdAllComments,
  updatePublication,
  removePublication,
  likePublication,
  activatePublication,
  deactivatePublication,
  addCategoryToPublication,
} = publicationController

router.post('/publication', addPublication)

router.get('/publication', listPublications)

router.get('/publication_all', listAllPublications)

router.get('/publication/:id', getPublicationById)

router.get('/publication_all_comments/:id', getPublicationByIdAllComments)

router.put('/publication/:id', updatePublication)

router.delete('/publication/:id', removePublication)

router.patch('/publication/:id', likePublication)

router.patch('/publication_activate/:id', activatePublication)

router.patch('/publication_deactivate/:id', deactivatePublication)

router.patch('/publication_add_category', addCategoryToPublication)

export default router
