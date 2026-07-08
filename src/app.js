const { config } = require('dotenv');
const express = require('express')
config()

const app = express()
app.use(express.json())


module.exports = app;