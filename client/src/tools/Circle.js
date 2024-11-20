import Tool from "./Tool";

export class Circle extends Tool {
    constructor(canvas) {
        super(canvas);
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
        this.centerX = e.pageX - e.target.offsetLeft;
        this.centerY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let x = e.pageX - e.target.offsetLeft - this.centerX;
            let y = e.pageY - e.target.offsetTop - this.centerY;
            this.radius = Math.sqrt(x**2 + y**2);
            this.draw(this.centerX, this.centerY, this.radius);
        }
    }

    draw(x, y, r) {
        const img = new Image()
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
}