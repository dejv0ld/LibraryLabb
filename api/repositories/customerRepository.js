const customerModel = require('../models/customerModel')
const db_context = require('../db_context')

async function getAllBooks() {
  let books = []

  let data = await db_context.selectAllBooks()

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
      )
    )
  })

  return books
}

//ADD BOOK 3/5
async function addNewBook(
  author_name,
  title,
  genre,
  year,
  total_copies,
  available_copies
) {
  await db_context.insertBook(
    author_name,
    title,
    genre,
    year,
    total_copies,
    available_copies
  )
}
//---------------------------------------

//UPDATE BOOK 3/5
async function updateBookInDatabase(
  bookId,
  title,
  author_name,
  genre,
  quantity
) {
  const query = `
    UPDATE books
    SET
      title = '${title}',
      author_name = '${author_name}',
      genre = '${genre}',
      total_copies = ${quantity},
      available_copies = ${quantity}

    WHERE book_id = ${bookId};
  `
  db_context.db.none(query)
}
//------------------------------------

//DELETE BOOK 4/5
async function deleteBook(bookId) {
  const query = `
    DELETE FROM books
    WHERE book_id = ${bookId};
  `
  await db_context.db.none(query)
}
//--------------------------------------

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
  editCustomer,
  addNewBook, //ADD BOOK 3/5
  updateBookInDatabase, //UPDATE BOOK 3/5
  deleteBook // DELETE BOOK 4/5
}
