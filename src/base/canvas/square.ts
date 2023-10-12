const pages = () => { 
    let oCanvas = document.querySelector("#app .square canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.beginPath();

    ctx.rect(20, 20, 50, 50)
    ctx.fillRect(90, 20, 50, 50)
    ctx.strokeRect(160, 20, 50, 50)
    ctx.fillRect(230, 20, 50, 50)
    ctx.clearRect(235, 25, 40, 40)
    ctx.strokeStyle = "#222"
    ctx.stroke()

    

    


    




}

export default pages;




