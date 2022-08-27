import { Router } from 'express'
import roleController from './../controllers/role.controller'

const router = Router()

const { rolesCont, listRoles } = roleController

router.post('/roles', rolesCont)

router.get('/role', listRoles)

export default router
