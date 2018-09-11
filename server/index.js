const express = require('express')
const moment = require('moment')

const app = express()
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const times = [
    moment('20180911', 'YYYYMMDD').format('x'),
    moment('20180910', 'YYYYMMDD').format('x'),
]

let messages = [
    {
        author: 'foo',
        text: 'foo foo foofoo foo foofoo foo foofoo foo foofoo foo foofoo foo foofoo foo foofoo foo foo',
        time: times[0],
        isRead: true,
    },
    {
        author: 'foo',
        text:
            'foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo ',
        time: times[0],
        isRead: true,
    },
    {
        author: 'baz',
        text: 'baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz ',
        time: times[1],
        isRead: true,
    },
    {
        author: 'baz',
        text: 'baz baz baz',
        time: times[1],
        isRead: true,
    },
    {
        author: 'bar',
        text: 'bar bar bar',
        time: times[1],
        isRead: false,
    },
    {
        author: 'foo',
        text: 'foo foo foo',
        time: times[1],
        isRead: false,
    },
]

messages = messages.map((m, idx) => ({
    ...m,
    id: idx,
}))

app.get('/api/messages', (req, res) => {
    res.send({ messages })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
