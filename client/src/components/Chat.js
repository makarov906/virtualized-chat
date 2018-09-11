import React, { Component } from 'react'
import styled from 'styled-components'
import dateController from './controllers/date'
import unreadLabelController from './controllers/unreadLabel'
import messageController from './controllers/message'

const addDate = dateController()
const addUnreadLabel = unreadLabelController()
const addMessage = messageController()

const createChat = messages => {
    return messages.reduce(
        (markup, message, idx) =>
            markup.concat([addDate(message), addUnreadLabel(message), addMessage(message, messages[idx + 1])]),
        [],
    )
}

const Chat = styled.div``

export default class extends Component {
    render() {
        const { messages } = this.props
        return <Chat>{createChat(messages)}</Chat>
    }
}
