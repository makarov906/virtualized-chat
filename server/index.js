const express = require('express')
const messages = require('./messages')

const app = express()
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/api/messages', (req, res) => {
    res.send(messages)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
