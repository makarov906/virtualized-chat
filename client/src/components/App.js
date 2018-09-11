import React, { Component } from 'react'
import styled from 'styled-components'
import { getMessages } from '../utils'
import Message from './Message'
import moment from 'moment'

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
`

const Date = styled.div`
    margin: 10px 0;
    text-align: center;
    font-size: 14px;
    text-decoration: underline;
`

const Chat = styled.div``

export default class extends Component {
    state = {
        messages: [],
    }

    componentDidMount() {
        getMessages().then(messages => {
            this.setState({
                messages,
            })
        })
    }

    createChat = () => {
        const { messages } = this.state
        let currentDate
        const markup = []

        for (let i = 0; i < messages.length - 1; i++) {
            const message = messages[i]
            if (currentDate !== message.time) {
                currentDate = message.time
                markup.push(<Date>{moment(parseInt(message.time)).format('DD MM YYYY')}</Date>)
            }

            let withAvatar = false

            if (messages[i + 1].author !== messages[i].author) {
                withAvatar = true
            }

            markup.push(<Message withAvatar={withAvatar} key={messages[i].id} message={messages[i]} />)
        }

        if (messages.length > 0) {
            markup.push(
                <Message withAvatar key={messages[messages.length - 1].id} message={messages[messages.length - 1]} />,
            )
        }

        return markup
    }

    render() {
        return (
            <Container>
                <Chat>{this.createChat()}</Chat>
            </Container>
        )
    }
}
