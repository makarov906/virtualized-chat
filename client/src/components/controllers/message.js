import React from "react";
import Message from '../Message'

export default () => {
    return (message, nextMessage) => {
        let withAvatar = false

        if (!nextMessage || nextMessage.author !== message.author) {
            withAvatar = true
        }

        return <Message withAvatar={withAvatar} key={message.id} message={message} />
    }
}
