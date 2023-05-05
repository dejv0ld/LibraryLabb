const express = require('express')
const router = express.Router()
const controller = require('../controllers/customerController')
//UPDATE BOOK 3/5
const customerController = require('../controllers/customerController')
//-------------------
//DELETE BOOK
router.delete('/books/:book_id', customerController.deleteBookById)
//--------------------------------------

router.get('/search', async (req, res) => {
  console.log(req.query)

  await controller.search(req, res)
})

//ADD BOOK 3/5
router.post('/add-book', async (req, res) => {
  await controller.addBook(req, res)
})
//_________________________

//UPDATE BOOK 3/5
router.put('/books/:book_id', customerController.updateBook)
//-------------------

module.exports = router
