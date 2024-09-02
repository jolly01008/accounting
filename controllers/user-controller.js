const express = require('express')
const router = express.Router()

const userController = {
  login: (req, res, next) => {
    console.log('user login!')
  },
}

module.exports = userController
