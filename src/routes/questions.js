const router = require('express').Router();

router.get('/all', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    const data = JSON.parse(body)
    return res.json(data.stat_status_pairs)
})

router.get('/free', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => !question.paid_only)
    return res.json(data)
})

router.get('/paid', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => question.paid_only)
    return res.json(data)
})

router.get('/free/random', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => !question.paid_only)
    return res.json(data[getRandomInt(data.length - 1)])
})

router.get('/paid/random', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs.filter((question) => question.paid_only)
    return res.json(data[getRandomInt(data.length - 1)])
})

router.get('/random', async (req, res) => {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/')
    const body = await response.text()
    let data = JSON.parse(body)
    data = data.stat_status_pairs
    return res.json(data[getRandomInt(data.length - 1)])
})

module.exports = router;
