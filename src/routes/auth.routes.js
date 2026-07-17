const express  = require('express')
const authControllers = require('../controllers/auth.controller')
const loginUserController = require('../controllers/auth.controller')
const router = express.Router()



router.post('/register', authControllers.registerUserController)
router.post('/login', authControllers.loginUserController)

module.exports = router