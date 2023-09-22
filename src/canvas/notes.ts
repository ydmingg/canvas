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
    
}

export default pages;