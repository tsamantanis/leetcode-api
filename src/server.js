require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
// Set App Variable
const app = express()

// Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    const now = new Date().toString()
    console.log(`Requested ${req.url} at ${now}`)
    next()
})

app.get('/', async (req, res) => {
    // fetch('https://leetcode.com/api/problems/algorithms/')
    // .then(res => res.text())
    // .then(body => res.json(JSON.parse(body)))
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    const data = JSON.parse(body)
    return res.json(data.stat_status_pairs)
})

// Database Setup
// require('./config/db-setup.js')

// Routes
// const router = require('./routes/index.js')
// app.use(router)

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Leetcode API listening on port ${process.env.PORT}!`)
})

module.exports = app
