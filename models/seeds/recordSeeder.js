if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection

const { faker } = require('@faker-js/faker')
const dayjs = require('dayjs')
const Record = require('../record')
const User = require('../user')

db.once('open', async () => {
  try {
    const userData = await User.find({ name: 'user1' })
    const category = ['工作', '生活', '娛樂', '交通', '其他']

    const recordsArray = Array.from({ length: 5 }).map((v, index) => {
      const randomNumber = Math.floor(Math.random() * category.length)
      const randomMonth = Math.floor(Math.random() * 2) // 希望日期是過去隨機的2個月內
      const randomDay = Math.floor(Math.random() * 10) // 希望日期是過去隨機的10天內

      return {
        item: faker.lorem.word(),
        category: category[randomNumber],
        price: faker.commerce.price({ min: 100, max: 500, dec: 0 }),
        time: dayjs()
          .subtract(randomMonth, 'month')
          .subtract(randomDay, 'day')
          .format(),
        userId: userData[0]._id,
      }
    })

    console.log('recordsArray', recordsArray)
    console.log('recordSeeder done')
    await Record.create(recordsArray)
    db.close()
  } catch (error) {
    console.error(`run groupSeeder is error: ${error}`)
  }
})
