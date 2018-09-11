export const getMessages = () =>
    fetch('http://localhost:5000/api/messages')
        .then(res => res.json())
        .then(res => res.messages)

function cache(func) {
    let cache = {}

    return (...args) => {
        if (!cache[args]) {
            cache[args] = func(...args)
            setTimeout(() => {
                delete cache[args]
            }, 30 * 60 * 1000)
        }

        return cache[args]
    }
}
