const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

let messages = [
    {
        text: 'foo foo foofoo foo foofoo foo foofoo foo foofoo foo foofoo foo foofoo foo foofoo foo foo',
    },
    {
        text:
            'bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar ',
    },
    {
        text: 'baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz baz ',
    },
    {
        text: 'baz baz baz',
    },
    {
        text: 'baz baz baz',
    },
    {
        text: 'baz baz baz',
    },
]

messages = messages.map((m, idx) => ({
    ...m,
    id: idx,
    time: getTime(),
}))

function getTime() {
    const now = Date.now()
    return now
}

app.get('/api/messages', (req, res) => {
    res.send({ messages })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
