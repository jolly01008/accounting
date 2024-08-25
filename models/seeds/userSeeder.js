if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
console.log('User資料:', User)

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSE_URI)

const db = mongoose.connection
const hashedPassword = bcrypt.hash('12345678', 10)

const userData = [
  {
    name: 'user1',
    account: 'user1@example.com',
    password: hashedPassword,
    avatar: faker.image.avatar(),
  },
  {
    name: 'user2',
    account: 'user2@example.com',
    password: hashedPassword,
    avatar: faker.image.avatar(),
  },
]
console.log('userData測試:', userData)

db.once('open', async () => {
  console.log('mongodb connected and going to create userSeeder')
  await User.create(userData)
  console.log('userSeeder done')
})
