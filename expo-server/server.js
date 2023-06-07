const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


const PrismaClient = require('@prisma/client').PrismaClient
const db = new PrismaClient()

app.get('/', async (req, res) => {
    const todos = await db.todos.findMany()
    res.json(todos)
})

app.post('/', async (req, res) => {
    const { todo } = req.body
    await db.todos.create({
        data: {
            todo,
        }
    })
    res.send(200)
})

app.listen(3000)
