const express = require('express')
require('express-async-errors')
const { PrismaClient } = require('@prisma/client')

const app = express()

app.use(express.json())

const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

app.get('/users', async (req, res) => {})

app.post('/users', async (req, res) => {})

const { PORT = 4000 } = process.env

app.use((err, req, res, next) => {
  if (err.message.includes('Invalid')) {
    res.status(400)
    res.json({ error: `Invalid Input` })
  }

  next(err)
})
app.listen(PORT)

console.log(`Listening on ${PORT} 📞`)
