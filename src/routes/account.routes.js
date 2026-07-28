const express = require('express');
const router = express.Router()

//create routes
const { createAccountController } = require("../controllers/account.controller");
const authMiddleware = require('../middleware/auth.middleware')


router.post(
  '/',
  authMiddleware,
  createAccountController
);

module.exports = router