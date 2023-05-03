const {
  getAllBooks,
  addCustomer,
  getBooksByKeyword,
  editCustomer
} = require('../repositories/customerRepository')

async function search(req, res) {
  let data = await getBooksByKeyword(req.query.keyword)

  console.log(data)

  return res.json(data)
}

module.exports = {
  search
}
