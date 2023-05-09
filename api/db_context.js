const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Password123.@localhost:5432/Library')
module.exports = db

async function selectBooksByKeyword(keyword) {
  let data = await db.any(
    `SELECT * FROM books WHERE title ILIKE '${keyword}%' OR author_name ILIKE '${keyword}%' OR genre ILIKE '${keyword}%'`
  )

  return data
}

//LAGT TILL 3/5
async function selectAllBooks() {
  let data = await db.any('SELECT * FROM books')
  return data
}


//ADD BOOK 3/5
async function insertBook(
  author_name,
  title,
  genre,
  year,
  total_copies,
  available_copies
) {
  const query = `
    INSERT INTO books (author_name, title, genre, year, total_copies, available_copies)
    VALUES ('${author_name}', '${title}', '${genre}', ${year}, ${total_copies}, ${available_copies})
  `
  await db.none(query)
}

module.exports = {
  db, //UPDATE BOOK 3/5
  selectBooksByKeyword,
  selectAllBooks, //ÄNDRAT 3/5
  insertBook //ADD BOOK 3/5
}
