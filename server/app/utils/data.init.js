const db = require('../models')
const { book: Book, member: Member, issue: Issue } = db

module.exports.initializeBooks = () => {
  Book.bulkCreate([
    {
      isbn: 45678,
      title: 'The Godfather',
      author: 'Ash Hemmingway',
      fee: 400,
      quantity: 5
    },
    {
      isbn: 34567,
      title: 'Gone',
      author: 'John Kariuki',
      fee: 300,
      quantity: 30
    },
    {
      isbn: 12345,
      title: 'Life Is Beautiful',
      author: 'May Phillips',
      fee: 100,
      quantity: 20
    },
    {
      isbn: 23456,
      title: 'The Pianist',
      author: 'Xavier J.K',
      fee: 200,
      quantity: 15
    },
    {
      isbn: 56789,
      title: 'Fight Club',
      author: 'Penny Moraa',
      fee: 500,
      quantity: 10
    }
  ])
}

module.exports.initializeMembers = () => {
  Member.bulkCreate([
    {
      nationalId: 12345,
      firstName: 'Marty',
      lastName: 'Byrde',
      email: 'mbyrde@gmail.com'
    },
    {
      nationalId: 23456,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com'
    },
    {
      nationalId: 34567,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@gmail.com'
    },
    {
      nationalId: 45678,
      firstName: 'Victor',
      lastName: 'Dena',
      email: 'victordena@gmail.com'
    },
    {
      nationalId: 56789,
      firstName: 'Mary',
      lastName: 'Ana',
      email: 'maryana@gmail.com'
    }
  ])
}

module.exports.initializeIssues = () => {
  Issue.bulkCreate([
    {
      bookIsbn: '12345',
      memberNationalId: '23456'
    },
    {
      bookIsbn: '23456',
      memberNationalId: '34567'
    }
  ])
}
