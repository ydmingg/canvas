import Konva from "konva";
import { CanvasRender } from "../CanvasRender/index";
import { ObjectMark } from '../CanvasObject'

export default class markEvents { 
    static setSize(render: CanvasRender) { 
        if (!render.root_stage) return;
        // 获取标注点的大小
        
        const markSize = {
            scaleX: 1 / render.scale,
            scaleY: 1 / render.scale,
        }
        // 获取所有的mark
        const arrMark = render.root_stage.find(".mark")
        arrMark.forEach((e) => { 
            e.setAttrs({ 
                scaleX: markSize.scaleX,
                scaleY: markSize.scaleY,
            });
            
        })
        
    
        
    
        
        // 获取舞台的缩放比例
        // const stageScale = render.root_stage.scaleX(); // 假设舞台的水平和垂直方向的缩放比例相同
        
        // // 获取鼠标单击的坐标
        // const mouseX = event.evt.clientX - render.app.getBoundingClientRect().left; // 鼠标在页面中的横坐标
        // const mouseY = event.evt.clientY - render.app.getBoundingClientRect().top; // 鼠标在页面中的纵坐标
        // // console.log(render.app.getBoundingClientRect());
    
        // const allElements = render.root_stage.getClientRect({ relativeTo: render.root_stage });
        // // 计算鼠标单击的真实坐标（缩放前）
        // const realXBefore = Math.round(mouseX - render.root_stage.x())
        // const realYBefore = Math.round(mouseY - render.root_stage.y())
        
        // render.mouseStagePosition  = {
        //     x: realXBefore,
        //     y: realYBefore,
        // }
    
        // // 创建一个dom
    
        
    
        // // 处理缩放后的坐标
        // const realXAfter = event.evt.clientX 
        // const realYAfter = event.evt.clientY
        
        // // const mark = new ObjectMark(event,render)
        
        // // console.log(mark.mark);
        // // console.log(render.shapeAttrs);
        
        // const commentsNode = render.shapeAttrs.filter((item) => {item.element.attrs.name === "mark"})
        // commentsNode.forEach((e) => { 
            
            
        //     // 获取注释组件图形的实际绘制对象，这里将其转换为Konva.Group类型，因为注释可能包含多个图形元素组成的一个组。
        //     const markShapeGroup = e.element as Konva.Group;
            
        //     // 缩放比例
        //     // markShapeGroup.scaleX(markShapeGroup.scaleX() / render.scale)
        //     // markShapeGroup.scaleY(markShapeGroup.scaleY() / render.scale)
    
            
            
            
    
        //     // 设置一个常量，表示注释初始缩放的比例基数，这里设为1。
        //     // const commentsStartNumber = 1
        //     // // 根据当前渲染器的全局缩放比例来调整注释组在X和Y轴方向上的缩放大小。
        //     // point.scaleX(commentsStartNumber / render.scale)
        //     // point.scaleY(point.scaleX())
    
        //     // // 标注点缩放缓动动画 
        //     // const firstChild = point.children[0] || { attrs: { fill: undefined } };
        //     // let pointStartFill = firstChild.attrs.fill;
            
        //     // if (point.getLayer()) {
                
                
        //     //     // const tween = new Konva.Tween({
        //     //     //     node: point,
        //     //     //     scaleX:point.scaleX() * 1.3,
        //     //     //     scaleY: point.scaleY() * 1.3,
        //     //     //     easing: Konva.Easings.EaseIn,
        //     //     //     duration: .03,
        //     //     // });
        //     //     // point.on('mouseover touchstart', () => {
        //     //     //     canvasRender.isCanvasComment = true
        //     //     //     canvasrender.root_stage.container().style.cursor = 'pointer';
        //     //     //     point.children[0].attrs.fill = "yellow";
        //     //     //     tween.play(); // 启动动画
        //     //     // })
        //     //     // point.on('mouseout touchend', () => {
        //     //     //     canvasRender.isCanvasComment = false
        //     //     //     canvasrender.root_stage.container().style.cursor = "default";
        //     //     //     point.children[0].attrs.fill = pointStartFill
        //     //     //     tween.reverse(); //暂停动画
        //     //     // });
        //     // }
            
        // })
    }
    static moveClick() { 
        console.log("被点了");
        
    }
}