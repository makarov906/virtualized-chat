import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Date = styled.div`
    text-align: center;
    font-size: 14px;
    text-decoration: underline;
`

export default ({ message }) => <Date>{moment(parseInt(message.time)).format('DD MM YYYY')}</Date>
