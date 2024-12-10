if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection

const { faker } = require('@faker-js/faker')
const dayjs = require('dayjs')

const Group = require('../group')
const User = require('../user')

db.once('open', async () => {
  try {
    const allUser = await User.find()
    const firstTwoUser = allUser.slice(0, 2)

    const gpRecordData = Array.from({ length: 5 }).map(() => {
      const lenderIndex = Math.floor(Math.random() * firstTwoUser.length) // 隨機取數字，成為借出者的 index

      const borrowerUser = firstTwoUser.filter((user) => {
        return user._id !== firstTwoUser[lenderIndex]._id // 所有使用者迭代篩選，去除掉 "借出者"
      })
      const borrowerIndex = Math.floor(Math.random() * borrowerUser.length) // 隨機取數字，成為借入者的 index

      return {
        item: faker.lorem.word(),
        lender: firstTwoUser[lenderIndex].name,
        borrower: borrowerUser[borrowerIndex].name,
        price: faker.commerce.price({ min: 100, max: 500, dec: 0 }),
        time: dayjs().subtract(3, 'month').format(),
      }
    })

    const groupData = {
      gpName: faker.lorem.word(),
      gpCreater: firstTwoUser[0].name,
      gpRecord: gpRecordData,
    }

    await Group.create(groupData)
    console.log('groupSeeder done')
    db.close()
  } catch (error) {
    console.error(`run groupSeeder is error: ${error}`)
  }
})
