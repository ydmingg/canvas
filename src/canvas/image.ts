const pages = () => { 
    let oCanvas = document.querySelector("#app .image canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;

    class Svg{ 
        arc(x,y,r,s,e,a,bg) { 
            ctx.beginPath();
            ctx.fillStyle = bg
            ctx.arc(x,y,r,s,e,a)
            ctx.fill()
            ctx.closePath();
        }
        rect(x,y,w,h,bg) { 
            ctx.beginPath()
            ctx.fillStyle = bg
            ctx.fillRect(x, y, w, h)
            ctx.closePath()            
        }

    }

    let bool = false
    let funArc = new Svg();
    // funArc.arc(100, 100, 50, 0, 2 * Math.PI, false,"pink");
    // ctx.globalCompositeOperation = 'source-in'
    // funArc.arc(150, 100, 50, 0, 2 * Math.PI, false,"skyblue");

    funArc.rect(50, 50, 200, 200, "#ccc")

    ctx.globalCompositeOperation = 'destination-out'

    
    // ctx.beginPath()
    // ctx.arc(0, 0, 20, 0, 2 * Math.PI, true)
    // ctx.fill()
    // ctx.closePath()
    
    oCanvas.addEventListener('mousedown', () => { bool = true })
    oCanvas.addEventListener('mouseup', () => { bool = false })
    oCanvas.addEventListener('mousemove', e => {
        if (!bool) return
        console.log(e.offsetY );

        
        funArc.arc(e.offsetX, e.offsetY, 50, 0, 2 * Math.PI, false,"");
    })
    if (Math.random() < .1) { 
        console.log("中奖啦@@@@@@");
        
    }

}

export default pages;