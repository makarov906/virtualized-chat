import React, { Component } from 'react'
import createDateController from './controllers/date'
import createUnreadLabelController from './controllers/unreadLabel'
import createMessageController from './controllers/message'
import { getMessages } from '../utils'
import config from '../config'
import VirtualizedList from './VirtualizedList'

const rangeLength = config.rangeLength

export default class extends Component {
    state = {
        list: [],
        total: 0,
        startIndex: 0,
        endIndex: 0,
        focusedMessage: null,
    }

    componentDidMount() {
        this.initialLoad(15)
    }

    initialLoad = messageId => {
        const start = Math.max(0, messageId - rangeLength / 2)
        getMessages(start).then(({ messages, total }) => {
            this.setState({
                list: messages,
                total,
                startIndex: start,
                endIndex: Math.min(total, start + messages.length),
                focusedMessage: messageId,
            })
        })
    }

    loadTop = () => {
        const start = Math.max(0, this.state.startIndex - rangeLength)
        return getMessages(start).then(({ messages, total }) => {
            this.setState(prevState => ({
                list: messages.concat(prevState.list),
                total,
                startIndex: start,
            }))
        })
    }

    loadBottom = () => {
        return getMessages(this.state.endIndex).then(({ messages, total }) => {
            this.setState(prevState => ({
                list: prevState.list.concat(messages),
                total,
                endIndex: Math.min(total, prevState.endIndex + messages.length),
            }))
        })
    }

    render() {
        const markup = []
        const addDate = createDateController(markup)
        const addUnreadLable = createUnreadLabelController(markup)
        const addMessage = createMessageController(markup)

        for (let i = 0; i < this.state.list.length; i++) {
            const message = this.state.list[i]
            const prevMessage = this.state.list[i - 1]
            const nextMessage = this.state.list[i + 1]

            addDate(message)
            addUnreadLable(prevMessage, message)
            addMessage(message, nextMessage, message.id === 10)
        }

        return (
            <div style={{ border: '2px solid black' }}>
                <VirtualizedList
                    height={404}
                    loadTop={this.loadTop}
                    loadBottom={this.loadBottom}
                    list={markup}
                    total={this.state.total}
                    hasBottom={this.state.endIndex < this.state.total}
                    hasTop={this.state.startIndex > 0}
                />
            </div>
        )
    }
}
