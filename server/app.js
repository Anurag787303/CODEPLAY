const express = require('express')
const app = express()

// Routes
const test = require('./routes/testRoutes')

app.use("/api/v1", test)

module.exports = app