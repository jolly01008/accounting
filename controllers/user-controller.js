const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const Group = require('../models/group')

const userController = {
  login: (req, res, next) => {
    try {
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
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params
      const user = await User.findById(userId).select('-password -__v')
      if (!user) throw new Error('找不到該使用者')

      res.json({ status: 'success', data: user })
    } catch (error) {
      next(error)
    }
  },

  getUserGroup: async (req, res, next) => {
    try {
      const { userId, gpId } = req.params

      const user = await User.findById(userId).select('-password -__v')
      const group = await Group.findById(gpId).select('-__v')
      if (!user) throw new Error('找不到該使用者')
      if (!group) throw new Error('找不到這個群組')

      res.json({ status: 'success', data: group })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = userController
