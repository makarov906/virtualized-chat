import React, { Component } from 'react'
import styled from 'styled-components'
import { getMessages } from '../utils'
import Message from './Message'

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
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

    render() {
        const { messages } = this.state

        return (
            <Container>
                <Chat>
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                </Chat>
            </Container>
        )
    }
}
