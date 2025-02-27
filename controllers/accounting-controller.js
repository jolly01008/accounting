const Group = require('../models/group')
const User = require('../models/user')

const accountingController = {
  addRecord: async (req, res, next) => {
    try {
      const recordData = req.body
      const { userId, gpId } = req.params

      const currentUser = await User.findById(userId)
      const group = await Group.findById(gpId)
      if (!recordData.item || !recordData.lender || !recordData.borrower || !recordData.price || !recordData.time) throw new Error('所有欄位皆需填寫完整')
      if (!currentUser) throw new Error('沒有找到該使用者')
      if (!group) throw new Error('沒有找到該群組')
      if (recordData.lender === recordData.borrower) throw new Error('借出者與欠款者不得為同一人')
      if (!group.gpMembers.includes(recordData.lender)) throw new Error('提醒! 「借出者 Lender」 必須是群組的成員之一')
      if (!group.gpMembers.includes(recordData.borrower)) throw new Error('提醒! 「借入者 Borrower」 必須是群組的成員之一')

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
      if (userOneLendMoney === userTwoLendMoney) result = `${userOneLendMoney}元 vs ${userTwoLendMoney}元。因此 ${userOneName} 與 ${userTwoName} 互不相欠款`

      const resultData = {
        [userOneName]: userOneLendMoney,
        [userTwoName]: userTwoLendMoney,
        result
      }

      res.json({ status: 'success', data: resultData })
    } catch (error) {
      next(error)
    }
  }, putRecord: async (req, res, next) => {
    try {
      const { gpId, recordId } = req.params
      const recordEditData = req.body

      const group = await Group.findOne(
        {
          "_id": gpId,
          "gpRecord._id": `${recordId}`
        },
        {
          "gpRecord.$": 1  // 只返回符合條件的 gpRecord 元素
        }
      )
      const oneRecord = group.gpRecord.find(record => String(record._id) === String(recordId))

      const groupRenew = await Group.findOneAndUpdate(
        {
          "_id": gpId,
          "gpRecord._id": `${recordId}`
        },
        {
          $set: {
            "gpRecord.$.item": recordEditData.item || oneRecord.item,
            "gpRecord.$.lender": recordEditData.lender || oneRecord.lender,
            "gpRecord.$.borrower": recordEditData.borrower || oneRecord.borrower,
            "gpRecord.$.price": recordEditData.price || oneRecord.price,
            "gpRecord.$.time": recordEditData.time || oneRecord.time
          }
        },
        { new: true } // 返回更新後的文檔
      )

      res.json({ status: 'success', data: groupRenew })
    }
    catch (error) {
      next(error)
    }
  }, deleteRecord: async (req, res, next) => {
    try {

      const { userId, gpId, recordId } = req.params
      if (String(req.user._id) !== String(userId)) throw new Error('您沒有權限')

      const deleteGroup = await Group.updateOne(
        {
          _id: gpId,
          "gpRecord._id": recordId
        },
        {
          $pull: {
            gpRecord: { _id: recordId }  // 從 gpRecord 陣列中刪除符合條件的元素
          }
        }
      )

      const resultGroup = await Group.findById(gpId).select('-__v')

      if (deleteGroup.acknowledged !== true || deleteGroup.modifiedCount === 0) throw new Error('刪除記錄失敗，發生了點錯誤')
      if (!resultGroup) throw new Error('找不到這個群組，發生了點錯誤')

      res.json({ status: "success", message: "已刪除該筆紀錄", data: resultGroup })
    } catch (error) {
      next(error)
    }
  },
  addGroup: async (req, res, next) => {
    try {
      const { userId } = req.params
      const { gpName, gpMemberName } = req.body
      const user = await User.findById(userId)
      const addMember = await User.findOne({ name: gpMemberName })

      if (!gpMemberName) throw new Error('請填寫一名群組成員')
      if (!gpName) throw new Error('請將群組名稱填寫完整')
      if (!addMember) throw new Error('沒有這名使用者，請確認填寫的成員名字是否正確')
      if (String(user.name) === String(gpMemberName)) throw new Error('群組成員不能填寫自己')
      if (!user) throw new Error('您沒有權限於該帳號新增群組')

      const addGp = await Group.create({
        gpName,
        gpCreater: user.name,
        gpMembers: [user.name, gpMemberName]
      })
      if (!addGp) throw new Error('發生了點錯誤，新增群組失敗')

      res.json({ status: "success", message: "已新增群組" })
    } catch (error) {
      next(error)
      console.log('error', error)
    }
  }
}

module.exports = accountingController
