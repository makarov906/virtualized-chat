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
    border: 1px solid ${props => (props.isRead ? '#00ae29' : 'red')};
    border-radius: 5px;
    flex-grow: 1;
`

const Message = styled.div`
    display: flex;
    flex-wrap: nowrap;
`

const Wrapper = styled.div`
    padding-bottom: 10px;
    background-color: ${props => (props.isFocused ? 'rgba(0, 0, 0, 0.2)' : '')};
`

export default ({ message, withAvatar, isFocused, ...props }) => (
    <Wrapper isFocused={isFocused}>
        <Message {...props}>
            {withAvatar ? <Avatar /> : <DefaultAvatar />}
            <Text isRead={message.isRead}> {message.text}</Text>
        </Message>
    </Wrapper>
)
