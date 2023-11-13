import template from "template";
import Konva from "konva";
import { canvas } from "pages/canvas";
// import Canvas from "@src/pages/canvas/index";
import addComment from "@src/pages/canvas";

const pages = () => { 
    // 渲染主结构
    template.render(canvas.index, {}, "app");

    // 开始绘制坐标点
    let oCanvas = document.querySelector('[fxtag="canvas"]') as HTMLDivElement;
    let w = window.innerWidth
    let h = window.innerHeight
    let bool = true
    oCanvas.style.backgroundImage = "url('https://book.funxdata.com//public/img/showroom/bodybg.png')";
    
    
    // 使用示例
    const stage = new Konva.Stage({
        container: oCanvas,
        width: w,
        height: h,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const comments: Comment[] = [];

    // 监听画布是否缩放
    stage.on('wheel', (e) => {
        e.evt.preventDefault();

        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition() || {x: 0,y: 0};
        // 重新计算画布比例
        const scaleBy = 1.05;
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        // 获取标注点的数组
        const commentBoxes = layer.find('.commentBox');
        // 调整标注点的大小，以抵消画布的缩放效果
        commentBoxes.forEach((box,idx) => {
            const originalRadius = box.getAttr('originalRadius');
            const radius = originalRadius * oldScale / newScale;
            console.log(originalRadius);
            
            // 通用设置半径的方法
            // commentBoxes[idx].radius({ x: radius, y: radius });
        });

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
    stage.on('click', (e) => {
        const position = stage.getPointerPosition() || {x:0,y:0};
        addComment(stage, layer, comments, position.x, position.y);
        
    });  


    
}

export default pages;