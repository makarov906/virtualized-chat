import React, { Component } from 'react'
export default class InfiniteLoader extends Component {
    static defaultProps = {
        threshold: 15,
    }

    state = {
        loading: false,
    }

    componentDidMount() {
        this.parent = this.scrollContainer.parentNode
        this.parent.addEventListener('scroll', this.scrollEvent)
        this.loadMore()
    }

    componentWillUnmount() {
        this.parent.removeEventListener('scroll', this.scrollEvent)
    }

    loadMore = () => {
        this.setState({
            loading: true,
        })
        this.props.loadMore().then(() => {
            this.setState({
                loading: false,
            })
        })
    }

    scrollEvent = () => {
        if (!this.state.loading) {
            let offset
            if (this.props.isReverse) {
                offset = this.parent.scrollTop
            } else {
                offset = this.scrollContainer.scrollHeight - this.parent.scrollTop - this.parent.clientHeight
            }

            if (offset < this.props.threshold) {
                this.loadMore()
            }
        }
    }

    render() {
        const { loading } = this.state
        const { children } = this.props

        return (
            <div ref={div => (this.scrollContainer = div)}>
                {children}
                {loading && <div>Loading...</div>}
            </div>
        )
    }
}
