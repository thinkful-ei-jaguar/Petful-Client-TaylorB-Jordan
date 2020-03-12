const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/people', require('../people/people.router'))
app.use('/pets', require('../pets/pets.router'))

module.exports = app
