const express = require('express')
const app = express()

// Middlewares
app.use(express.json())

// Routes
const problemRoutes = require('./routes/ProblemRoutes')

app.use('/api/v1/problem', problemRoutes)

module.exports = app