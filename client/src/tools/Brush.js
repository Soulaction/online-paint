import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, socket, sessionId) {
        super(canvas, socket, sessionId);
        this.listen();
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
            this.socket.send(
                JSON.stringify({
                    id: this.sessionID,
                    method: 'draw',
                    figure: {
                        type: 'brush',
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop
                    }
                })
            )
        }
    }

    static draw(ctx, x, y) {
       ctx.lineTo(x, y);
       ctx.stroke();
    }
}