import React, { Component } from 'react'
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized'

const cache = new CellMeasurerCache({
    minHeight: 50,
    defaultHeight: 50,
    fixedWidth: true,
})

export default class VirtualizedList extends Component {
    static defaultProps = {
        batchSize: 10,
        threshold: 50,
        startFrom: 0,
        alignEnd: true,
    }

    state = {
        loading: false,
        scrollToIndex: -1,
        startIndex: 0,
        endIndex: 0,
    }

    // recompute height for index, when content was changed
    recomputeHeight = index => {
        cache.clear(index, 0)
        this.list.recomputeRowHeights(index)
    }

    // force update list
    update = () => {
        this.list.forceUpdateGrid()
    }

    componentDidMount() {
        this.initialize(this.props.startFrom)
    }

    initialize = (index) => {
        this.setState({
            loading: true,
        })
        return this.props
            .fetchMore(index, index + this.props.batchSize, messages =>
                messages.reverse(),
            )
            .then(messagesLength => {
                this.setState({
                    startIndex: index,
                    endIndex: index + messagesLength,
                    loading: false,
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.list.length === 0 && this.props.list.length > 0 && this.props.alignEnd) {
            this.scrollTo(this.props.list.length)
        }
    }

    scrollTo = index => {
        this.list.measureAllRows()
        this.list.scrollToRow(index)
    }

    rowRenderer = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
                <div style={style}>{this.props.list[index]}</div>
            </CellMeasurer>
        )
    }

    loadTop = () => {
        const start = this.state.endIndex
        this.setState({
            loading: true,
        })
        const prevLength = this.props.list.length
        this.props
            .fetchMore(start, start + this.props.batchSize, (messages, prevMessages) =>
                messages.reverse().concat(prevMessages),
            )
            .then(messagesLength => {
                const newLength = this.props.list.length
                const diff = newLength - prevLength

                if (diff > 0) {
                    this.scrollTo(diff)
                }

                this.setState({
                    loading: false,
                    endIndex: start + messagesLength,
                })
            })
    }

    loadBottom = () => {
        const start = Math.max(0, this.state.startIndex - this.props.batchSize)
        this.setState({
            loading: true,
        })
        this.props
            .fetchMore(start, start + this.props.batchSize, (messages, prevMessages) =>
                prevMessages.concat(messages.reverse()),
            )
            .then(messagesLength => {
                this.setState({
                    loading: false,
                    startIndex: start,
                })
            })
    }

    onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        if (!this.state.loading) {
            if (scrollTop < this.props.threshold && this.state.endIndex < this.props.total) {
                this.loadTop()
            }
            if (scrollHeight - scrollTop - clientHeight < this.props.threshold && this.state.startIndex > 0) {
                this.loadBottom()
            }
        }
    }

    onResize = () => {
        cache.clearAll()
        this.list.recomputeRowHeights()
    }

    render() {
        return (
            <AutoSizer onResize={this.onResize}>
                {({ width, height }) => (
                    <List
                        scrollToAlignment="start"
                        onScroll={this.onScroll}
                        deferredMeasurementCache={cache}
                        rowCount={this.props.list.length}
                        rowHeight={cache.rowHeight}
                        rowRenderer={this.rowRenderer}
                        width={width}
                        height={height}
                        ref={list => {
                            this.list = list
                        }}
                    />
                )}
            </AutoSizer>
        )
    }
}
