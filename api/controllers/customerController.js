const { insertBook } = require('../db_context')
const {
  getAllBooks,
  addCustomer,
  getBooksByKeyword,
  editCustomer,
  updateBookInDatabase, //UPDATE BOOK 3/5
  deleteBook // DELETE BOOK 4/5
} = require('../repositories/customerRepository')

async function search(req, res) {
  let data = await getBooksByKeyword(req.query.keyword)

  console.log(data)

  return res.json(data)
}

//ADD BOOK 3/5
async function addBook(req, res) {
  const { author_name, title, genre, year, total_copies, available_copies } =
    req.body

  await insertBook(
    author_name,
    title,
    genre,
    year,
    total_copies,
    available_copies
  )

  return res.json({ message: 'Book added successfully' })
}
//-----------------------------------------------

//UPDATE BOOK 3/5
async function updateBook(req, res) {
  try {
    const bookId = req.params.book_id
    const { title, author_name, genre, quantity } = req.body
    await updateBookInDatabase(bookId, title, author_name, genre, quantity)
    res.status(200).send('Book updated successfully.')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating book.')
  }
}
//--------------------------------------------

//DELETE BOOK 4/5
async function deleteBookById(req, res) {
  try {
    const bookId = req.params.book_id
    await deleteBook(bookId)
    res.status(200).send('Book deleted successfully.')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting book.')
  }
}
//--------------------------------------------

module.exports = {
  search,
  addBook, //ADD BOOK 3/5
  updateBook, //UPDATE BOOK 3/5
  deleteBookById //DELETE BOOK 4/5
}
