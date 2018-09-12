import React, { Component } from 'react'
import { AutoSizer, List, InfiniteLoader, CellMeasurerCache, CellMeasurer } from 'react-virtualized'

const cache = new CellMeasurerCache({
    minHeight: 50,
})

export default class extends Component {
    render() {
        const { hasNextPage, isNextPageLoading, list, loadNextPage, innerRef } = this.props

        const rowCount = hasNextPage ? list.length + 1 : list.length

        const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage

        const isRowLoaded = ({ index }) => !hasNextPage || index < list.length

        const rowRenderer = ({ index, key, style, parent }) => {
            let content

            if (!isRowLoaded({ index })) {
                content = 'Loading...'
            } else {
                content = list[index]
            }

            return content ? (
                <CellMeasurer
                    cache={cache}
                    columnIndex={0}
                    key={key}
                    rowIndex={index}
                    parent={parent}>
                    <div style={style}>
                        {content}
                    </div>
                </CellMeasurer>
            ) : null
        }

        return (
            <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                onRowsRendered={onRowsRendered}
                                ref={_list => {
                                    registerChild(_list)
                                    innerRef(_list)
                                }}
                                deferredMeasurementCache={cache}
                                height={height}
                                rowCount={rowCount}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        )
    }
}
