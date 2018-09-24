import React, { Component } from 'react'
import createDateController from './controllers/date'
import createUnreadLabelController from './controllers/unreadLabel'
import createMessageController from './controllers/message'
import { getMessages } from '../utils'
import VirtualizedList from './VirtualizedList'

export default class extends Component {
    state = {
        list: [],
        total: 0,
    }

    fetchMore = (start, end, concatMessages) => {
        return getMessages(start, end).then(({ messages, total }) => {
            this.setState(prevState => ({
                list: concatMessages(messages, prevState.list),
                total,
            }))

            return messages.length
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
            <div style={{ border: '2px solid black', height: '100vh' }}>
                <VirtualizedList
                    startFrom={20}
                    alignEnd
                    fetchMore={this.fetchMore}
                    ref={ref => (this.list = ref)}
                    list={markup}
                    total={this.state.total}
                />

                <button onClick={() => this.list.goto(50)}>goto 50 message</button>
            </div>
        )
    }
}
