const { Router } = require('express')
import authController from '../controllers/auth.controller'

const router = Router()

const { signUp, signIn } = authController

router.post('/signUp', signUp)
router.post('/signIn', signIn)
//router.post("/signIn",authCtrl.)

module.exports = router