const express = require('express');
const app = express();
const WSServer = require('express-ws')(app)
const aWSS = WSServer.getWss();

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                broadCastConnection(ws, msg);
                break;
        }
    })
})

app.listen(PORT, () => console.log(`server start on ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadCastConnection(ws, msg);
}

const broadCastConnection = (ws, msg) => {
    console.log(msg);
    aWSS.clients.forEach((client) => {
        if(client.id = msg.id) {
            client.send(JSON.stringify(msg));
        }
    })
}
