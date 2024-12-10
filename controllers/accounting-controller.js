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
  }
}

module.exports = accountingController
