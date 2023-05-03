const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Acv44t5u.@localhost:5432/Library')

async function selectBooksByKeyword(keyword) {
  let data = await db.any(
    `SELECT * FROM books WHERE title LIKE '${keyword}%' OR author_name LIKE '${keyword}%'`
  )

  return data
}

module.exports = {
  selectBooksByKeyword
}
