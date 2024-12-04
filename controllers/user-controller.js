const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const userController = {
  login: (req, res, next) => {
    const userData = req.user.toJSON()

    const payload = {
      id: userData._id,
      name: userData.name,
      account: userData.account,
      avatar: userData.avatar
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.json({
      status: 'success',
      data: { token, user: payload }
    })
  },
}

module.exports = userController
