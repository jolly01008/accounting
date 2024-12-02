const User = require('../models/user')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')

// 新版的mongoose  Model.findOne 不再接受callback  改用這樣的方式
passport.use(new LocalStrategy(
  { usernameField: 'account' },  // 如果傳入的是 'account' 而不是預設的 'username'
  async function (account, password, done) {
    const user = await User.findOne({ account: account })
      if (!user) {
        return done(null, false)
      }
      const match = bcryptjs.compare(password, user.password)
      if (!match) {
        return done(null, false)
      }
      return done(null, user)
  })
)