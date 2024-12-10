if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')

const { faker } = require('@faker-js/faker')
const bcryptjs = require('bcryptjs')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSE_URI)

const db = mongoose.connection

async function createUserData() {
  const usersArray = []
  const hashedPassword = await bcryptjs.hash('12345678', 10)
  const users = [
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
    {
      name: 'user3',
      account: 'user3@example.com',
      password: hashedPassword,
      avatar: faker.image.avatar(),
    },
  ]
  usersArray.push(...users)
  return usersArray
}

db.once('open', async () => {
  try {
    console.log('mongodb connected and going to create Seeder ...')

    const usersData = await createUserData()

    await User.create(usersData)
    console.log('userSeeder done')
    db.close()
  } catch (error) {
    console.error(`run groupSeeder is error: ${error}`)
  }
})
