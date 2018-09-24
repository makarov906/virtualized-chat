import moment from 'moment'
const times = [moment('20180911', 'YYYYMMDD').format('x'), moment('20180910', 'YYYYMMDD').format('x')]

const messages = [
    {
        author: 'BORDER',
        text: '+++++++++++++++++++++++++ BORDER +++++++++++++++++++++++++++++++++++++',
        time: times[0],
        isRead: true,
    },
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
        author: 'foo',
        text: 'foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo ',
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
        author: 'foo',
        text: 'foo foo foo',
        time: times[1],
        isRead: false,
    },
    {
        author: 'foo',
        text: 'foo foo foo foo foo foo foo foo foo foo foo foo',
        time: times[1],
        isRead: false,
    },
    {
        author: 'baz',
        text: 'baz baz baz',
        time: times[1],
        isRead: false,
    },
    {
        author: 'baz',
        text: 'baz baz baz',
        time: times[1],
        isRead: true,
    },
    {
        author: 'BORDER',
        text: '+++++++++++++++++++++++++ BORDER +++++++++++++++++++++++++++++++++++++',
        time: times[1],
        isRead: true,
    },
]

export const getMessages = (start, end) =>
    new Promise(resolve => {
        const res = messages.map((m, i) => ({
            ...m,
            id: start + i
        }))
        setTimeout(() => {
            resolve({
                messages: res,
                total: 100,
            })
        }, 200)
    })
