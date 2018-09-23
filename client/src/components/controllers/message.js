import React from 'react'
import Message from '../Message'
import moment from 'moment'

function lessThenMinutes(minutes, time, anotherTime) {
    return moment(parseInt(time)).diff(moment(parseInt(anotherTime)), 'minutes') < minutes
}

export default arr => {
    return (message, nextMessage, isFocused) => {
        let withAvatar = true

        if (
            nextMessage &&
            nextMessage.author === message.author &&
            lessThenMinutes(15, message.time, nextMessage.time)
        ) {
            withAvatar = false
        }

        arr.push(<Message isFocused={isFocused} withAvatar={withAvatar} message={message} />)
    }
}
