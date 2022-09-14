import express from 'express'

const app = express()

app.get('/ads', (req, res) => {
  return res.json([
    { id: 1, name: 'First Ad'},
    { id: 2, name: 'Second Ad'},
    { id: 3, name: 'Third Ad'},
  ])
})

app.listen(3333)
