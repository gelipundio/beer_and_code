const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

let todo = [
  {
    title: "Laval Ropa",
    description: "Hay que lavar solo la ropa negra",
    date: "2019-07-10",
    done: false
  }
]

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    data: todo.map((e, i) => {
      return {
        id: i,
        ...e
      }
    })
  })
})

app.get('/:id', (req, res) => {
  res.json({
    data: todo[req.params.id]
  })
})

app.post('/', (req, res) => {
  todo.push(req.body)
  res.send('Saved')
})

app.delete('/:id', (req, res) => {
  todo = todo.filter((e, i) => {
    return Number(i) !== Number(req.params.id)
  })
  res.send('Deleted')
})

app.patch('/', (req, res) => {
  const {id, done} = req.body
  todo = todo.map((e, i) => {
    if (Number(id) === Number(i)) {
      e.done = done
    }
    return e
  })
  res.send('PATCH')
})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})