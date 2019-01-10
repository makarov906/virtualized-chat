import React, { Component } from 'react'
import VirtualizedList from './VirtualizedList'

export default class extends Component {
    state = {
        list: [],
        total: 0,
        markup: [],
    }

    // public api
    goto = index => {
        if (this.props.hasRowFor(index)) {
            this.highliteMessageAndScroll(index)
        } else {
            this.list.initialize(index).then(() => {
                this.highliteMessageAndScroll(index)
            })
        }
    }

    highliteMessageAndScroll = index => {
        this.setState(prevState => {
            const newList =  prevState.list.map((m) => index === m.id ? ({
                ...m,
                isFocused: true,
            }) : ({
                ...m,
                isFocused: false,
            }))
            return ({
                list: newList,
                markup: this.props.createMarkup(newList),
            });
        }, () => {
            this.list.scrollTo(this.props.getRowFor(index))
        })
    }

    fetchMore = (start, end, concatMessages) => {
        return this.props.fetch(start, end).then(({ messages, total }) => {
            this.setState(prevState => {
                const newList = concatMessages(messages, prevState.list)
                return ({
                    list: newList,
                    total,
                    markup: this.props.createMarkup(newList),
                });
            })

            return messages.length
        })
    }

    render() {
        const { style } = this.props
        return (
            <div style={style}>
                <VirtualizedList
                    startFrom={0}
                    alignEnd
                    fetchMore={this.fetchMore}
                    ref={ref => (this.list = ref)}
                    list={this.state.markup}
                    total={this.state.total}
                />
            </div>
        )
    }
}
