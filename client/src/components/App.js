import React, { Component } from 'react'
import styled from 'styled-components'
import Chat from './Chat'

const Container = styled.div`
    width: 600px;
    margin: 50px auto 0;
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
