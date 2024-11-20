import {makeAutoObservable} from "mobx";

class CanvasState {
    socket = null;
    sessionId = null;
    canvas = null;
    undoList = [];
    redoList = [];
    userName = "";

    constructor() {
        makeAutoObservable(this)
    }

    setSocket(socket) {
        this.socket  = socket;
    }

    setSessionID(sessionId) {
        this.sessionId  = sessionId;
    }

    setUserName(userName) {
        this.userName  = userName;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    setPushUndo(img) {
        this.undoList.push(img);
    }

    setPushRedo(img) {
        this.redoList.push(img);
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop();
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }

        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop();
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

export default new CanvasState();