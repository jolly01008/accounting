const Group = require('../models/group')
const User = require('../models/user')

const accountingController = {
  addRecord: async (req, res, next) => {
    try {
      const recordData = req.body
      const { userId, gpId } = req.params

      const currentUser = await User.findById(userId)
      const group = await Group.findById(gpId)
      if (!currentUser) throw new Error('沒有找到該使用者')
      if (!group) throw new Error('沒有找到該群組')
      if (recordData.lender === recordData.borrower) throw new Error('借出者與欠款者不得為同一人')

      if (group.gpCreater.toString() !== currentUser.name.toString()) throw new Error('沒有權限! 目前的使用者，非該群組的創建者')

      await Group.updateOne(
        { _id: gpId }, // 根據群組ID查找
        {
          $push: { gpRecord: recordData } // 將新記錄推送到 gpRecord 陣列中
        }
      )

      res.json({ status: 'success', message: '已新增一筆紀錄', data: recordData })
    } catch (err) {
      next(err)
    }
  },
  countRecord: async (req, res, next) => {
    try {
      const { userId, gpId } = req.params
      const currentUser = await User.findOne({ _id: userId })
      const group = await Group.findOne({ _id: gpId })

      if (!currentUser) throw new Error('沒有找到該使用者')
      if (!group) throw new Error('沒有找到該群組')
      if (!group.gpMembers.includes(currentUser.name)) throw new Error('沒有權限! 你並不是這個群組的成員之一')

      const userOneName = group.gpMembers[0]
      const userTwoName = group.gpMembers[1]
      let userOneLendMoney = 0
      let userTwoLendMoney = 0
      let result = ""
      group.gpRecord.forEach(record => {
        if (record.lender.toString() === userOneName) {
          userOneLendMoney += record.price
        } else if (record.lender.toString() === userTwoName) {
          userTwoLendMoney += record.price
        }
      })

      if (userOneLendMoney > userTwoLendMoney) result = `${userTwoName} 尚須還 ${userOneName} : ${userOneLendMoney - userTwoLendMoney} 元`
      if (userOneLendMoney < userTwoLendMoney) result = `${userOneName} 尚須還 ${userTwoName} : ${userTwoLendMoney - userOneLendMoney} 元`
      if (userOneLendMoney === userTwoLendMoney) result = `${userOneLendMoney}與${userTwoLendMoney} 互不相欠款`

      const resultData = {
        [userOneName]: userOneLendMoney,
        [userTwoName]: userTwoLendMoney,
        result
      }

      res.json({ status: 'success', data: resultData })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = accountingController
