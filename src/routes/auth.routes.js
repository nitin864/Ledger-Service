const express  = require('express')
const authControllers = require('../controllers/auth.controller')
const router = express.Router()


router.use('/register', authControllers.registerUserController)

module.exports = router