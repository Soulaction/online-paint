import React, {useEffect, useRef, useState} from 'react';
import './canvas.scss'
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";


const Canvas = observer(() => {
    const canvasRef = useRef();
    const modalRef = useRef('');
    const [modal, setModal] = useState(true);
    const param = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (canvasState.userName) {
            const websocket = new WebSocket('ws://localhost:5000/')
            canvasState.setSocket(websocket);
            canvasState.setSessionID(param.id)
            toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))
            websocket.onopen = () => {
                websocket.send(JSON.stringify({
                    id: canvasState.sessionId,
                    userName: canvasState.userName,
                    method: 'connection'
                }))
            }
            websocket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`Пользователь ${msg.userName} подключился`)
                        break;
                    case 'draw':
                        console.log(`Рисуем!`)
                        drawHandler(msg);
                        break;
                    case 'finish':
                        break;
                }
            }
        }
    }, [canvasState.userName])

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y)
                break;
        }
    }

    const mouseDownHandler = () => {
        canvasState.setPushUndo(canvasRef.current.toDataURL())
    }

    const connectionHandler = () => {
        setModal(false);
        canvasState.setUserName(modalRef.current.value)
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {
            }} animation={false}>
                <Modal.Header>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <input style={{width: '70%', margin: '5px'}} ref={modalRef} type="text"/>
                <Modal.Footer>
                    <Button variant="primary" onClick={connectionHandler}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={1400} height={800}></canvas>
        </div>
    );
});

export default Canvas;