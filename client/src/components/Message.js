import React from 'react'
import styled from 'styled-components'

const avatarSize = '32px'

const DefaultAvatar = styled.div`
    width: ${avatarSize};
    min-width: ${avatarSize};
    margin-right: 10px;
`

const Avatar = styled.div`
    width: ${avatarSize};
    height: ${avatarSize};
    min-width: ${avatarSize};
    border-radius: 50%;
    background-color: #00ae29;
    align-self: flex-end;
    margin-right: 10px;
`

const Text = styled.div`
    font-size: 14px;
    padding: 10px;
    border: 1px solid #00ae29;
    border-radius: 5px;
    flex-grow: 1;
`

const Message = styled.div`
    display: flex;
    flex-wrap: nowrap;
`

export default ({ message, withAvatar, ...props }) => (
    <div style={{ paddingBottom: '10px' }}>
        <Message {...props}>
            {withAvatar ? <Avatar /> : <DefaultAvatar />}
            <Text>{message.text}</Text>
        </Message>
    </div>
)
