import React, { Component } from 'react'
import styled from 'styled-components'
import Chat from './Chat'
import { getMessages } from '../utils'
import MessageController from "../controller";

const Container = styled.div`
    padding: 0 120px;
`

const controller = new MessageController()
const fetch = (start, end) => getMessages(start, end)

export default class extends Component {
    render() {
        return (
            <Container>
                <Chat
                    fetch={fetch}
                    controller={controller}
                />
            </Container>
        )
    }
}
