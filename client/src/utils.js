export const getMessages = () =>
    fetch('http://localhost:5000/api/messages')
        .then(res => res.json())
