import React, { Component } from 'react'
import Controller from '../controller'
import { getMessages } from '../utils'
import VirtualizedList from './VirtualizedList'

const controller = new Controller()

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
        const markup = controller.createMarkup(this.state.list)

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
            </div>
        )
    }
}
