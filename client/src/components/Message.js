import React from 'react';
import styled from 'styled-components';

const Avatar = styled.div`
    width: 32px;
    height: 32px;
    min-width: 32px;
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
    margin-bottom: 10px;
`

export default ({ message }) => (
    <Message>
        <Avatar />
        <Text>{message.text}</Text>
    </Message>
);
