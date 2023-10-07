/** 
 * canvas: 使用脚本调用各种方法生成图像；；；svg则是一个xml文件，通过子元素生成图像
 *  1. 绘制图像
 *      1、Element.getContext('type'); 
 *          1、type: 2d、bitmaprenderer、webgl、webgl2
 *      2、直线绘制方法：
 *          CanvasRenderingContext2D.beginPath()：开始绘制路径。
 *          CanvasRenderingContext2D.closePath()：结束路径，返回到当前路径的起始点，会从当前点到起始点绘制一条直线。如果图形已经封闭，或者只有一个点，那么此方法不会产生任何效果。
 *          CanvasRenderingContext2D.moveTo()：设置路径的起点，即将一个新路径的起始点移动到(x，y)坐标。
 *          CanvasRenderingContext2D.lineTo()：使用直线从当前点连接到(x, y)坐标。
 *          CanvasRenderingContext2D.fill()：在路径内部填充颜色（默认为黑色）。
 *          CanvasRenderingContext2D.stroke()：路径线条着色（默认为黑色）。
 *          CanvasRenderingContext2D.fillStyle：指定路径填充的颜色和样式（默认为黑色）。
 *          CanvasRenderingContext2D.strokeStyle：指定路径线条的颜色和样式（默认为黑色）。
 *      3、弧线绘制方法：
 *          CanvasRenderingContext2D.arc()：通过指定圆心和半径绘制弧形。
 *          CanvasRenderingContext2D.arcTo()：通过指定两根切线和半径绘制弧形。
 *      4、矩形绘制方法：
 *          CanvasRenderingContext2D.rect()：绘制矩形路径。
 *          CanvasRenderingContext2D.fillRect()：填充一个矩形。
 *          CanvasRenderingContext2D.strokeRect()：绘制矩形边框。
 *          CanvasRenderingContext2D.clearRect()：指定矩形区域的像素都变成透明。
 *      
 *  2. 图像处理
 * 
 * **/

const pages = () => { 
    let oCanvas = document.querySelector("#app .notes canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;

    let WIDTH = oCanvas.width
    let HEIGHT = oCanvas.height

    let arr = new Array
    let bool = true
    let index = 80
    
    class Round{
        index: number;
        x: any;
        y: any;
        cacheCanvas: HTMLCanvasElement
        cancheCtx: any
        r: any
        color:any
        constructor(index:number, x:any, y:any) { 
            this.index = index
            this.x = x
            this.y = y
            this.cacheCanvas = document.createElement("canvas")
            this.cancheCtx = this.cacheCanvas.getContext("2d") 
            this.cancheCtx.width = 9 * this.r
            this.cancheCtx.height = 6 * this.r;
            this.r = Math.random() * 2 + 1;     
            var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
            this.color = `rgba(255,255,255,${alpha})`;

            if(bool){
                this.cache();
            }
        }

        draw() {
            if( !bool ){
                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.r * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }else{
                ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r);
            }
        };
        
        cache() {
            this.cancheCtx.save();
            this.cancheCtx.fillStyle = this.color;
            this.cancheCtx.shadowColor = "red";
            this.cancheCtx.shadowBlur = this.r * 2;
            this.cancheCtx.beginPath();
            this.cancheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI);
            this.cancheCtx.closePath();
            this.cancheCtx.fill();
            this.cancheCtx.restore();
            
        }
        
        move() {
            this.y -= 0.15;
            if (this.y <= -10) {
                this.y = HEIGHT + 10;
            }
            this.draw();
        };
    }

    let animate = ()=>{
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (var i in arr) {
            arr[i].move();
        }
        requestAnimationFrame(animate)
    }

    function init() {
        for (var i = 0; i < index; i++) {
            arr[i] = new Round(i, Math.random() * WIDTH, Math.random() * HEIGHT);
            arr[i].draw();
        }
        animate();
    }

    init();

    let xx = {
        x:0
    }
    
    
    const Are = class{ 
        name: any;
        constructor() {
            let gg = Object.create(xx)
            return gg
        }
        fun() {
            this.name = 123
            return this.name
        }
    }



    
   
    

    
    


    
    

    



}

export default pages;