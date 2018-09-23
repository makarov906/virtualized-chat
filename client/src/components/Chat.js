import React, { Component } from 'react'
import createDateController from './controllers/date'
import createUnreadLabelController from './controllers/unreadLabel'
import createMessageController from './controllers/message'
import { getMessages } from '../utils'
import config from '../config'
import VirtualizedList from './VirtualizedList'

const rangeLength = config.rangeLength

const textes = [
    'bra',
    'brabrabra',
    'brabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabra',
    'brabrabrabrabrabrabrabrabrabrabrabrabrabrabra',
    'brabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabrabra',
]

export default class extends Component {
    state = {
        list: [],
        total: 0,
        startIndex: 0,
        endIndex: 0,
        focusedMessage: null,
        isReverse: true,
    }

    componentDidMount() {
        this.initialLoad(0)
        let index = 0
        setInterval(() => {
            const list = this.state.list
            const listIndex = list.length - 1
            list[listIndex].text = textes[index % textes.length]
            index++
            this.setState(
                {
                    list,
                },
                () => {
                    this.list.recomputeHeight(listIndex)
                },
            )
        }, 2000)
    }

    switchDirection = () => {
        this.setState(
            {
                isReverse: !this.state.isReverse,
            },
            () => {
                this.initialLoad(0)
            },
        )
    }

    initialLoad = messageId => {
        const start = Math.max(0, messageId - rangeLength / 2)
        getMessages(start).then(({ messages, total }) => {
            if (this.state.isReverse) {
                messages = messages.reverse()
            }

            this.setState({
                list: messages,
                total,
                startIndex: start,
                endIndex: start + messages.length,
                focusedMessage: messageId,
            })
        })
    }

    reverseLoadTop = () => {
        return getMessages(this.state.endIndex).then(({ messages, total }) => {
            messages = messages.reverse()
            this.setState(prevState => ({
                list: messages.concat(prevState.list),
                total,
                endIndex: prevState.endIndex + messages.length,
            }))
        })
    }

    reverseLoadBottom = () => {
        const start = Math.max(0, this.state.startIndex - rangeLength)
        return getMessages(start).then(({ messages, total }) => {
            messages = messages.reverse()
            this.setState(prevState => ({
                list: prevState.list.concat(messages),
                total,
                startIndex: start,
            }))
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
                endIndex: prevState.endIndex + messages.length,
            }))
        })
    }

    render() {
        const loadTop = this.state.isReverse ? this.reverseLoadTop : this.loadTop
        const loadBottom = this.state.isReverse ? this.reverseLoadBottom : this.loadBottom
        const hasBottom = this.state.isReverse ? this.state.startIndex > 0 : this.state.endIndex < this.state.total
        const hasTop = this.state.isReverse ? this.state.endIndex < this.state.total : this.state.startIndex > 0

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
            <div>
                <div style={{ border: '2px solid black' }}>
                    <VirtualizedList
                        {...this.state.isReverse && { alignEnd: true }}
                        ref={ref => (this.list = ref)}
                        height="100vh"
                        loadTop={loadTop}
                        loadBottom={loadBottom}
                        list={markup}
                        total={this.state.total}
                        hasBottom={hasBottom}
                        hasTop={hasTop}
                    />
                </div>
                <label>
                    <input type="checkbox" onChange={this.switchDirection} />
                    <span>IsReverse ?</span>
                </label>
            </div>
        )
    }
}
