import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import uuidv4 from 'uuid/v4'

const Date = styled.div`
    margin: 10px 0;
    text-align: center;
    font-size: 14px;
    text-decoration: underline;
`

export default () => {
    let currentDate

    return ({ time }) => {
        if (currentDate !== time) {
            currentDate = time
            return <Date key={uuidv4()}>{moment(parseInt(time)).format('DD MM YYYY')}</Date>
        }

        return null
    }
}
