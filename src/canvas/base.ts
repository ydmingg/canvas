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
    // 获取canvas容器
    let oCanvas = document.querySelector("#app #canvas") as HTMLCanvasElement;
    oCanvas.width = 500
    oCanvas.height = 500

    
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;
    


    // 定义坐标参数
    class Mousexy { 
        static x;
        static y;
        static x2;
        static y2;
        static ifmouseup = false
    }

    // 记录鼠标移入后的坐标
    oCanvas.addEventListener("mousemove", (el) => {
        Mousexy.x2 = el.offsetX
        Mousexy.y2 = el.offsetY
    })
    // 记录左键是否被点击
    oCanvas.addEventListener("mouseup", (el) => { 
        Mousexy.ifmouseup = true
    })

    // 创建线段类
    class line { 
        x;
        y;
        x2;
        y2;
        // 构造方法
        constructor(x, y) { 
            this.x = x;
            this.y = y
        }
        // 设置第二个点
        LineUpdata=(x,y)=>{
            this.x2=x;
            this.y2=y;
        }
        //绘制
        LineRraw = () => {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);//第一个点
            ctx.lineTo(this.x2, this.y2); //点三个
   
            ctx.strokeStyle = "green" //设颜色
            ctx.stroke(); //开始绘制(把前面点连接)
            //这段线段绘制完成后 把当前线段的末尾点坐标赋值给下一段的起始点
            
            
            Mousexy.x = this.x2;
            Mousexy.y = this.y2;
        }
    }

    //主绘制类，想要填加跟多的绘制图形 只需要添加方法 或者改变MyRraw.Rae的指向即可
    class MyRraw{
        //用于扩展绘制其他图形的 raew
        static raew;
        //绘制直线的方法Rae

        static Rae() {
            this.raew = setInterval(() => {
            //创建线段 把鼠标的点传入
                let myline=new line(Mousexy.x,Mousexy.y);
                myline.LineUpdata(Mousexy.x2,Mousexy.y2);
                //当鼠标左键弹起时候停止绘制
                if(Mousexy.ifmouseup!=true) {
                    myline.LineRraw();
                }

            })
        }

    }

    //画布鼠标监听 按下  按下后绘制图形
    oCanvas.addEventListener("mousedown",(event)=>{
        Mousexy.ifmouseup=false;
 
        //对于画线而言这是 鼠标按下时候获取
        Mousexy.x=event.offsetX;
        Mousexy.y=event.offsetY;
 
        //调用主绘制类的绘制直线的方法,绘制不同的图形只需要 动态修改 MyRraw.Rae();方法即可
        MyRraw.Rae();
 
    })
    
}

export default pages;