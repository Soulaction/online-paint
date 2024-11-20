const btn = document.getElementById('btn')
const socket = new WebSocket('ws://localhost:5000/')

let obj = {
    id: 1,
    name: 'new',
    type: 'type'
}

socket.onopen = () => {
    socket.send(JSON.stringify({
        id: 1,
        name: 'Dmitry',
        method: 'connection'
    }));
}

socket.onmessage = (event) => {
    console.log('С сервера пришло сообщение', event.data);
}

btn.onclick = () => {
    socket.send(JSON.stringify({
        id: 1,
        name: 'Dmitry',
        method: 'connection'
    }));
}