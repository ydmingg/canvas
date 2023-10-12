const pages = () => { 
    let oCanvas = document.querySelector("#app .circle canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;
    
    ctx.beginPath();

    ctx.arc(50, 50, 30, 0, 2 * Math.PI, false)
    ctx.fillStyle = "#999"
    ctx.fill();
    
    ctx.moveTo(150, 50)
    ctx.arcTo(100, 50, 50, 0, 50)
    ctx.stroke()

    ctx.closePath();


    



}

export default pages;