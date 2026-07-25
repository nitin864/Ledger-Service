const express = require('express');
const router = express.Router()

//create routes
const accountController = require('../controllers/account.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.post(
  '/',
  authMiddleware,
  accountController.creeateAccountController
);

module.exports = router