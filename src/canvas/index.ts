import Canvas_notes from "./notes";
import Canvas_paintbrush from "./paintbrush";
import Canvas_pen from "./pen";
import Canvas_square from "./square";
import Canvas_circle from "./circle";
import Canvas_polygon from "./polygon";
import Canvas_text from "./text";
import Canvas_image from "./image";


// 主代码
const tpl = () => { 
    // 渲染aintbrush
    Canvas_notes();
    // 渲染aintbrush
    Canvas_paintbrush();
    // 渲染线段
    Canvas_pen();
    // 渲染矩形
    Canvas_square();
    // 渲染圆
    Canvas_circle();
    // 渲染多边形
    Canvas_polygon();
    // 渲染文字
    Canvas_text();
    // 图像合成
    Canvas_image();



}   

export default tpl;