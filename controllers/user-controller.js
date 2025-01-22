const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Group = require('../models/group')

const userController = {
  register: async (req, res, next) => {
    try {
      const { name, account, password, checkPassword } = req.body
      if (!name || !account || !password || !checkPassword) throw new Error('請填妥所有註冊資料')
      const exisUserName = await User.findOne({ name })
      const exisUserAccount = await User.findOne({ account })
      if (exisUserName) throw new Error('該名字已被使用過，請更換名字')
      if (exisUserAccount) throw new Error('該帳號已被使用過，請更換帳號')
      if (password !== checkPassword) throw new Error('密碼與確認密碼不相符')

      const hashPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name, account, password: hashPassword
      })
      const userReturn = newUser.toJSON();
      delete userReturn.password
      delete userReturn.__v
      delete userReturn.createAt
      console.log('userReturn:', userReturn)
      res.json({ status: 'success', data: userReturn })
    } catch (error) {
      next(error)
    }

  },
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
      const currentUser = req.user
      const user = await User.findById(userId).select('-password -__v')
      if (!user) throw new Error('找不到該使用者')
      if (String(currentUser.name) !== String(user.name)) throw new Error('你沒有權限')

      const groups = await Group.find({ gpCreater: user.name }).select('gpName gpMembers')

      res.json({ status: 'success', userData: user, gpsData: groups })
    } catch (error) {
      next(error)
    }
  },

  getUserGroup: async (req, res, next) => {
    try {
      const { userId, gpId } = req.params
      const currentUser = req.user

      const user = await User.findById(userId).select('-password -__v')
      const group = await Group.findById(gpId).select('-__v')
      if (!user) throw new Error('找不到該使用者')
      if (!group) throw new Error('找不到這個群組')

      const oneOfGroup = group.gpMembers.some(userName => {
        return String(currentUser.name) === String(userName)
      })
      if (!oneOfGroup) throw new Error('你不是這個群組的使用者')

      res.json({ status: 'success', data: group })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = userController
