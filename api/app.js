const { getAllBooks } = require('./repositories/customerRepository') //LAGT till 3/5
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3001
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const customerRouter = require('./routes/customer')
app.use('/customer', customerRouter)

//LAGT till 3/5
app.get('/books', async (req, res) => {
  const books = await getAllBooks()
  res.json(books)
})

app.listen(PORT, () => {
  // LYSSNA på port
  console.log('API - Listening on port*:' + PORT)
})
