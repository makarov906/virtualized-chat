import React, { Component } from 'react'
import styled from 'styled-components'
import Chat from './Chat'

const Container = styled.div`
    padding: 0 120px;
`

export default class extends Component {
    render() {
        return (
            <Container>
                <Chat />
            </Container>
        )
    }
}
