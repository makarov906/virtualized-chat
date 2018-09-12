import React from 'react'
import Message from '../Message'
import moment from 'moment'

function lessThenMinutes(minutes, time, anotherTime) {
    return moment(parseInt(time)).diff(moment(parseInt(anotherTime)), 'minutes') < minutes
}

export default () => {
    return (message, nextMessage) => {
        let withAvatar = true

        if (
            nextMessage &&
            nextMessage.author === message.author &&
            lessThenMinutes(15, message.time, nextMessage.time)
        ) {
            withAvatar = false
        }

        return <Message withAvatar={withAvatar} message={message} />
    }
}
