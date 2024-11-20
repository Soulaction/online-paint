export default class Tool {
    constructor(canvas, socket, sessionID) {
        this.canvas = canvas;
        this.socket = socket;
        this.sessionID = sessionID;
        console.log(this.socket)
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }

    destroyEvents () {
        this.canvas.mouseUpHandler = null;
        this.canvas.mouseDownHandler = null;
        this.canvas.mouseMoveHandler = null;
    }
}