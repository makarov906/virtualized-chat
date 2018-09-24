import React from 'react'
import moment from 'moment'
import Message from './Message'
import Date from './Date'
import UnreadLabel from './UnreadLabel'

export default class Controller {
    mapMessageToRow = {}

    createMarkup(list) {
        const markup = []

        for (let i = 0; i < list.length; i++) {
            if (shouldAddDate(list[i - 1], list[i])) {
                markup.push(<Date message={list[i]} />)
            }

            if (shouldAddUnreadLabel(list[i - 1], list[i])) {
                markup.push(<UnreadLabel />)
            }

            let withAvatar = shouldAddAvatar(list[i], list[i + 1])
            markup.push(<Message withAvatar={withAvatar} message={list[i]} />)
        }

        return markup
    }
}

function shouldAddDate(prev = {}, current = {}) {
    return prev.time !== current.time
}

function shouldAddUnreadLabel(prev = {}, current = {}) {
    return prev.isRead && !current.isRead
}

function shouldAddAvatar(current = {}, next = {}) {
    return (
        next.author === current.author &&
        moment(parseInt(next.time)).diff(moment(parseInt(current.time)), 'minutes') < 15
    )
}
