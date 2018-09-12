import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Date = styled.div`
    text-align: center;
    font-size: 14px;
    text-decoration: underline;
`

export default () => {
    let currentDate

    return ({ time }) => {
        if (currentDate !== time) {
            currentDate = time
            return (
                <div style={{ padding: '10px 0' }}>
                    <Date>{moment(parseInt(time)).format('DD MM YYYY')}</Date>
                </div>
            )
        }

        return null
    }
}
