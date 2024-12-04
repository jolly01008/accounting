const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const login = async (req, res, next) => {
  try {
    const { account, password } = req.body
    const user = await User.findOne({ account: account })
    if (!user) throw new Error('該使用者尚未註冊')

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) throw new Error('密碼輸入錯誤!')

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = login