const router = require('express').Router();
const fetch = require('node-fetch');
const auth = require('./auth');

router.get('/all', auth.required, async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    const data = JSON.parse(body)
    return res.json(data.stat_status_pairs)
})

router.get('/free', auth.required, async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => !question.paid_only)
    return res.json(data)
})

router.get('/paid', auth.required, async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => question.paid_only)
    return res.json(data)
})

router.get('/free/random', auth.required, async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => !question.paid_only)
    return res.json(data[getRandomInt(data.length - 1)])
})

router.get('/paid/random', auth.required, async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => question.paid_only)
    return res.json(data[getRandomInt(data.length - 1)])
})

router.get('/random', auth.required, async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs
    return res.json(data[getRandomInt(data.length - 1)])
})

module.exports = router;
