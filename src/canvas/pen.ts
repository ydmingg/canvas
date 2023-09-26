const pages = () => { 
    let oCanvas = document.querySelector("#app .pen canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;

    // ctx.beginPath();
    // ctx.moveTo(50, 100)
    // ctx.lineTo(200, 100)
    // ctx.strokeStyle = "#222222"
    // ctx.stroke()
    // ctx.closePath();
    
    // let gradient = ctx.createLinearGradient(0, 0, 0, 200)
    // let gradient = ctx.createRadialGradient(150,150,50,150,150,100)
    // gradient.addColorStop(0, "pink")
    // gradient.addColorStop(1, "skyblue")
    // ctx.beginPath();
    // ctx.fillStyle = gradient
    // // 渲染
    // ctx.fillRect(50, 50, 200, 200)
    
    // var img = new Image();
    // img.src = 'https://book.funxdata.com/public/img/webmanage/AI.png'
    // img.width = 40
    // img.height = 40
    // img.onload = function( ) {
    //     var pattern = ctx.createPattern(img, 'no-repeat');
    //     if(pattern === null) return
    //     ctx.rect(50, 50, 100, 100);
    //     ctx.fillStyle = pattern;
    //     ctx.fill();
    // };

    ctx.shadowOffsetX = 10
    ctx.shadowOffsetY = 10
    ctx.shadowBlur = 5
    ctx.shadowColor = 'rgba(0,0,0,.2)'

    let coolor = ctx.createLinearGradient(50, 50, 50, 150)
    coolor.addColorStop(0,"pink")
    coolor.addColorStop(1,"skyblue")
    
    ctx.fillStyle = coolor
    ctx.fillRect(50,50,100,100)

    
    
}

export default pages;