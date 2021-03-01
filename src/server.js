require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const { getRandomInt } = require('./helpers/random')
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
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    const data = JSON.parse(body)
    return res.json(data.stat_status_pairs)
})

app.get('/free', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => !question.paid_only)
    return res.json(data)
})

app.get('/paid', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => question.paid_only)
    return res.json(data)
})

app.get('/free/random', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => !question.paid_only)
    return res.json(data[getRandomInt(data.length - 1)])
})

app.get('/paid/random', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => question.paid_only)
    return res.json(data[getRandomInt(data.length - 1)])
})

app.get('/random', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs
    return res.json(data[getRandomInt(data.length - 1)])
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
