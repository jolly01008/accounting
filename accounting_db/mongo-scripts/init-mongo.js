db = db.getSiblingDB('accounting');  // 指定資料庫名稱 (可以自訂)

const users = [
  {
    name: 'user1',
    account: 'user1@example.com',
    password: '$2a$10$.4lYvQfvEgXOKv0CiG.DnuoWot.HoUcF9KAknvToooBI6bx/Xb.Ky',
  },
  {
    name: 'user2',
    account: 'user2@example.com',
    password: '$2a$10$.4lYvQfvEgXOKv0CiG.DnuoWot.HoUcF9KAknvToooBI6bx/Xb.Ky',
  },
  {
    name: 'user3',
    account: 'user3@example.com',
    password: '$2a$10$.4lYvQfvEgXOKv0CiG.DnuoWot.HoUcF9KAknvToooBI6bx/Xb.Ky',
  }
];

// 插入到 users collection
db.users.insertMany(users);

// 確認資料是否插入，並打印出資料
print('--------- 插入的 users --------- :');
printjson(db.users.find().toArray());  // 輸出插入後的資料


const groups = [
  {
    gpName: '台南三日遊',
    gpCreater: 'user1',
    gpMembers: ["user1", "user2"],
    gpRecord: [{
      item: '計程車費用',
      lender: 'user1',
      borrower: 'user2',
      price: 100,
      time: new Date(new Date().setMonth(new Date().getMonth() - 3))
    },
    {
      item: '午餐',
      lender: 'user2',
      borrower: 'user1',
      price: 200,
      time: new Date(new Date().setMonth(new Date().getMonth() - 3))
    }]
  }
];

// 插入到 groups collection
db.groups.insertMany(groups);

// 確認資料是否插入，並打印出資料
print('--------- 插入的 groups --------- :');
printjson(db.groups.find().toArray());  // 輸出插入後的資料
