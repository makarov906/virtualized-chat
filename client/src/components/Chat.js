import React, { Component } from 'react'
import styled from 'styled-components'
import dateController from './controllers/date'
import unreadLabelController from './controllers/unreadLabel'
import messageController from './controllers/message'
import { getMessages } from '../utils'
import InfiniteLoader from './InfiniteLoader'

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

const Chat = styled.div`
    padding: 0 10px;
    height: 500px;
    overflow: auto;
    background-color: #fff;
`

export default class extends Component {
    state = {
        messages: [],
    }

    getItems = () => {
        return getMessages().then(messages => {
            this.setState(prevState => ({
                messages: prevState.messages.concat(messages),
            }))
        })
    }

    render() {
        const { messages } = this.state

        return (
            <Chat>
                <InfiniteLoader
                    loadMore={this.getItems}
                >
                    {createChat(messages)}
                </InfiniteLoader>
            </Chat>
        )
    }
}
