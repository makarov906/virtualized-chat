import React, { Component } from 'react'
import styled from 'styled-components'
import dateController from './controllers/date'
import unreadLabelController from './controllers/unreadLabel'
import messageController from './controllers/message'
import { getMessages } from '../utils'
import Messages from './Messages'

const createChat = messages => {
    const addDate = dateController()
    const addUnreadLabel = unreadLabelController()
    const addMessage = messageController()

    return messages
        .reduce(
            (markup, message, idx) =>
                markup.concat([addDate(message), addUnreadLabel(message), addMessage(message, messages[idx + 1])]),
            [],
        )
        .filter(item => item)
}

const Chat = styled.div`
    padding: 0 60px;
    height: 500px;
    background-color: #fff;
`

export default class extends Component {
    state = {
        loading: false,
        chat: [],
        messages: [],
        row: '',
    }

    onChange = e => {
        this.setState({
            row: e.target.value,
        })
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        this.setState({
            loading: true,
        })
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
            .then(() => getMessages())
            .then(items => {
                this.setState(prevState => {
                    const newMessages = prevState.messages.concat(items)

                    return {
                        loading: false,
                        messages: newMessages,
                        chat: createChat(newMessages),
                    }
                })
            })
    }

    goto = () => {
        const row = parseInt(this.state.row)

        this.list.scrollToRow(row)
    }

    render() {
        return (
            <div>
                <Chat>
                    <Messages
                        hasNextPage={true}
                        isNextPageLoading={this.state.loading}
                        list={this.state.chat}
                        loadNextPage={this.loadMoreRows}
                        innerRef={list => (this.list = list)}
                    />
                </Chat>
                <button onClick={this.goto}>Go to</button>
                <input type="number" value={this.state.row} onChange={this.onChange} />
            </div>
        )
    }
}
