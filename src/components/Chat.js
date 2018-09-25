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
        if (this.props.controller.hasRowFor(index)) {
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
                markup: this.props.controller.createMarkup(newList),
            });
        }, () => {
            this.list.scrollTo(this.props.controller.getRowFor(index))
        })
    }

    fetchMore = (start, end, concatMessages) => {
        return this.props.fetch(start, end).then(({ messages, total }) => {
            this.setState(prevState => {
                const newList = concatMessages(messages, prevState.list)
                return ({
                    list: newList,
                    total,
                    markup: this.props.controller.createMarkup(newList),
                });
            })

            return messages.length
        })
    }

    render() {
        return (
            <div>
                <div style={{ border: '2px solid black', height: 'calc(100vh - 50px)' }}>
                    <VirtualizedList
                        startFrom={0}
                        alignEnd
                        fetchMore={this.fetchMore}
                        ref={ref => (this.list = ref)}
                        list={this.state.markup}
                        total={this.state.total}
                    />
                </div>
                <button onClick={() => this.goto(5)}>GOTO 5</button>
                <button onClick={() => this.goto(10)}>GOTO 10</button>
                <button onClick={() => this.goto(30)}>GOTO 30</button>
            </div>
        )
    }
}
