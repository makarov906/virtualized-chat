import React from 'react'
import styled from 'styled-components'

const NewMessage = styled.div`
    width: 88px;
    font-size: 12px;
    border-radius: 20px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 0 auto;
`

export default arr => {
    return (prevMessage, message) => {
        if ((!prevMessage || prevMessage.isRead) && !message.isRead) {
            arr.push(
                <div style={{ padding: '10px 0' }}>
                    <NewMessage>new message</NewMessage>
                </div>
            )
        }
    }
}
