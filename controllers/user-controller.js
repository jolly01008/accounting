const express = require('express')
const router = express.Router()

const userController = {
  login: (req, res, next) => {
    console.log('user account and password is matched!')
    res.json({message: 'user account and password is matched!'})
  },
}

module.exports = userController
