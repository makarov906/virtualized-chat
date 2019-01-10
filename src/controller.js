import React from 'react'
import moment from 'moment'
import Message from './components/Message'
import Date from './components/Date'
import UnreadLabel from './components/UnreadLabel'

class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotImplementedError';
    }
}

class Controller {
    hasRowFor() {
        throw new NotImplementedError('Controller:hasRowFor must be implemented')
    }

    getRowFor() {
        throw new NotImplementedError('Controller:getRowFor must be implemented')
    }

    createMarkup() {
        throw new NotImplementedError('Controller:createMarkup must be implemented')
    }
}

export default class MessageController extends Controller {
    mapMessageToRow = {}

    hasRowFor = index => {
        return this.mapMessageToRow[index]
    }

    getRowFor = index => {
        return this.mapMessageToRow[index]
    }

    createMarkup = list => {
        const markup = []
        this.mapMessageToRow = {}
        let position = 0
        for (let i = 0; i < list.length; i++) {
            if (shouldAddDate(list[i - 1], list[i])) {
                markup.push(<Date message={list[i]} />)
                position++
            }

            if (shouldAddUnreadLabel(list[i - 1], list[i])) {
                markup.push(<UnreadLabel />)
                position++
            }

            let withAvatar = shouldAddAvatar(list[i], list[i + 1])
            markup.push(<Message withAvatar={withAvatar} message={list[i]} />)
            this.mapMessageToRow[list[i].id] = position
            position++
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
    return !(
        next.author === current.author &&
        moment(parseInt(next.time)).diff(moment(parseInt(current.time)), 'minutes') < 15
    )
}
