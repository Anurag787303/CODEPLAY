const express = require('express')
const app = express()
const cors = require('cors')

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
const problemRoutes = require('./routes/ProblemRoutes')

app.use('/api/v1/problem', problemRoutes)

module.exports = app