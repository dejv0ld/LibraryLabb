const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Acv44t5u.@localhost:5432/Library')
module.exports = db

async function selectBooksByKeyword(keyword) {
  let data = await db.any(
    `SELECT * FROM books WHERE title LIKE '${keyword}%' OR author_name LIKE '${keyword}%'`
  )

  return data
}

//LAGT TILL 3/5
async function selectAllBooks() {
  let data = await db.any('SELECT * FROM books')
  return data
}

//ADD BOOK 3/5
/* async function insertBook(author_name, title, genre, year, total_copies, available_copies) {
  await db.none(
    "INSERT INTO books (author_name, title, genre, year, total_copies, available_copies) VALUES ($1, $2, $3, $4, $5, $6)",
    [author_name, title, genre, year, total_copies, available_copies]
  );
} */
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
  db,//UPDATE BOOK 3/5
  selectBooksByKeyword,
  selectAllBooks, //ÄNDRAT 3/5
  insertBook //ADD BOOK 3/5

}
