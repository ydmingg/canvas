import template from "template";
import Konva from "konva";
import { canvas } from "pages/canvas";
import addComment from "@src/pages/canvas/index";

// 定义 Comment 类型
const pages = () => { 
    // 渲染主结构
    template.render(canvas.index, {}, "app");

    // 开始绘制坐标点
    let oCanvas = document.querySelector('[fxtag="canvas"]') as HTMLDivElement;
    let w = window.innerWidth
    let h = window.innerHeight
    oCanvas.style.backgroundImage = "url('https://book.funxdata.com//public/img/showroom/bodybg.png')";
    oCanvas.style.backgroundSize = "cover"
    
    // 使用示例
    const stage = new Konva.Stage({
        container: oCanvas,
        width: w,
        height: h,
    });
    const layer = new Konva.Layer();
    

    stage.add(layer);

    // 监听画布是否缩放
    stage.on('wheel', (e) => {
        e.evt.preventDefault();

        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition() || {x: 0,y: 0};
        // 重新计算画布比例
        const scaleBy = 1.05;
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        // 获取标注点的数组
        layer.draw();

        // 应用比例到画布
        stage.scale({ x: newScale, y: newScale });
        // 重新计算画布位置
        const newPos = {
            x: (pointer.x  - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };
        // 更新画布的位置
        stage.position({
            x: pointer.x - newPos.x * newScale,
            y: pointer.y - newPos.y * newScale,
        });


        // 刷新画布&图层
        layer.batchDraw();

    })

    

    // 在画布中打点
    let index = 0
    stage.on('click', (e) => {
        const position = stage.getPointerPosition() || {x:0,y:0};
        index++
        console.log(index);
        
        // 绘制标注点
        addComment(stage, layer, position.x, position.y, index);
        
    });         

   
    
}

export default pages;