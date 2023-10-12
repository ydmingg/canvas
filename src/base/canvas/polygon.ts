const pages = () => { 
    let oCanvas = document.querySelector("#app .polygon canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;

    // 绘制虚线
    ctx.beginPath()
    ctx.moveTo(100, 100)
    ctx.lineTo(200, 200)
    ctx.lineTo(150, 200)
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    // ctx.miterLimit = 2
    ctx.setLineDash([10, 5]);

    ctx.stroke();
    // ctx.closePath();
    


}

export default pages;