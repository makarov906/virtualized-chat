import React from 'react'
import Message from '../Message'
import moment from 'moment'
import uuidv4 from 'uuid/v4'

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

        return <Message withAvatar={withAvatar} key={uuidv4()} message={message} />
    }
}
