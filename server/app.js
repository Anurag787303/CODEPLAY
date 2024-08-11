const express = require('express')
const app = express()
const cors = require('cors')

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
const problemRoutes = require('./routes/ProblemRoutes')
const userRoutes = require('./routes/UserRoutes')

app.use('/api/v1/problem', problemRoutes)
app.use('/api/v1/user', userRoutes)

module.exports = app