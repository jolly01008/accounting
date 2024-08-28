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

    const recordsArray = Array.from({ length: 5 }).map((v, index) => {
      const category = ['工作', '生活', '娛樂', '交通', '其他']
      const randomNumber = Math.floor(Math.random() * category.length)

      return {
        item: faker.lorem.word(),
        category: category[randomNumber],
        price: faker.commerce.price({ min: 100, max: 500, dec: 0 }),
        time: dayjs().subtract(1, 'month').format(),
        userId: userData[0]._id,
      }
    })

    console.log('recordSeeder done')
    await Record.create(recordsArray)
    db.close()
  } catch (error) {
    console.error(`run groupSeeder is error: ${error}`)
  }
})
