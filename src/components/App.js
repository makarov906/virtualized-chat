import React, { Component } from 'react'
import styled from 'styled-components'
import Chat from '../chat/Chat'
import { getMessages } from '../utils'
import MessageController from "../controller";

const Container = styled.div`
    padding: 0 120px;
`

const controller = new MessageController()
const fetch = (start, end) => getMessages(start, end)

export default class extends Component {
    goto = index => {
        this.chat.goto(index)
    }

    render() {
        return (
            <Container>
                <Chat
                    ref={ref => this.chat = ref}
                    fetch={fetch}
                    hasRowFor={controller.hasRowFor}
                    createMarkup={controller.createMarkup}
                    getRowFor={controller.getRowFor}
                    style={{ border: '2px solid black', height: 'calc(100vh - 50px)' }}
                />

                <button onClick={() => this.goto(5)}>GOTO 5</button>
            </Container>
        )
    }
}
