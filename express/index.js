const express = require('express')
require('express-async-errors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    take: parseInt(req.query.take),
  })
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(user)
})

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
