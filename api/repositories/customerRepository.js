const customerModel = require('../models/customerModel')
const db_context = require('../db_context')

async function getAllBooks() {
  let books = []

  let data = await db_context.selectAllBooks()

  data.forEach((book) => {
    books.push(
      new customerModel(
        book.author_name,
        book.title,
        book.genre,
        book.year,
        book.total_copies,
        book.available_copies
      )
    )
  })

  return books
}

async function getBooksByKeyword(keyword) {
  let books = []

  let data = await db_context.selectBooksByKeyword(keyword)

  data.forEach((book) => {
    books.push(
      new customerModel(
        book.book_id,
        book.author_name,
        book.title,
        book.genre,
        book.year,
        book.total_copies,
        book.available_copies

        /*   customer.customer_id,
        customer.first_name,
        customer.last_name,
        customer.email */
      )
    )
  })

  return books
}

async function addCustomer(firstName, lastName, email) {
  db_context.insertCustomer(firstName, lastName, 'email@email.com')
}

async function editCustomer(customerId, firstName, lastName, email) {
  db_context.updateCustomer(customerId, firstName, lastName, email)
}

module.exports = {
  getAllBooks,
  getBooksByKeyword,
  addCustomer,
  editCustomer
}
