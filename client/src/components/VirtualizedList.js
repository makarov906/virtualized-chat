import React, { Component } from 'react'
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized'
import config from '../config'
const threshold = config.thresholdInPixels

const cache = new CellMeasurerCache({
    minHeight: 50,
    defaultHeight: 50,
    fixedWidth: true,
})

export default class VirtualizedList extends Component {
    state = {
        loadingTop: false,
        loadingBottom: false,
        scrollToIndex: -1,
        listLength: 0,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.list.length === 0 && this.props.list.length > 0 && this.props.alignEnd) {
            console.log('componentDidUpdate(prevProps)', this.props.list.length)
            this.scrollTo(this.props.list.length)
        }
    }

    scrollTo = (index) => {
        this.list.measureAllRows()
        this.list.scrollToRow(index)
    }

    loadTop = () => {
        if (!this.state.loadingTop && this.props.hasTop) {
            this.setState({
                loadingTop: true,
            })
            const prevLength = this.props.list.length
            this.props.loadTop().then(() => {
                const newLength = this.props.list.length
                const diff = newLength - prevLength

                if (diff > 0) {
                    this.scrollTo(diff)
                    // this.list.measureAllRows()
                    // this.list.scrollToRow(diff)
                    // this.setState({
                    //     scrollToIndex: diff,
                    // })
                }

                this.setState({
                    loadingTop: false,
                })
            })
        }
    }

    loadBottom = () => {
        if (!this.state.loadingBottom && this.props.hasBottom) {
            this.setState({
                loadingBottom: true,
            })
            this.props.loadBottom().then(() => {
                this.setState({
                    loadingBottom: false,
                })
            })
        }
    }

    rowRenderer = ({ index, key, style, parent, isVisible }) => {
        let content = this.props.list[index]

        return (
            content && (
                <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
                    <div style={style}>{content}</div>
                </CellMeasurer>
            )
        )
    }

    onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        if (scrollTop < threshold) {
            this.loadTop()
        } else if (scrollHeight - scrollTop - clientHeight < threshold) {
            this.loadBottom()
        }
    }

    render() {
        return (
            <div style={{ height: this.props.height }}>
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            // scrollToIndex={this.state.scrollToIndex}
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
            </div>
        )
    }
}
