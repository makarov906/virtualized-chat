import React from 'react'
import styled from 'styled-components'

const NewMessage = styled.div`
    margin: 10px auto;
    width: 88px;
    font-size: 12px;
    border-radius: 20px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.1);
`

export default () => {
    let wasAdded = false

    return ({ isRead }) => {
        if (!wasAdded && !isRead) {
            wasAdded = true
            return <NewMessage>new message</NewMessage>
        }

        return null
    }
}
