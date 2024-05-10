import Konva from "konva";
import { CanvasRender } from "../CanvasRender/index";

// 记录舞台拖拽时的位置坐标
function startDrag(startX: number, startY: number, render: CanvasRender) {
    if (!render.root_stage) return;
    // 将当前鼠标或触摸点按下时的坐标（startX, startY）存储为上次拖拽的位置信息。
    render.startDragPosition = { x: startX, y: startY };
    
    // 获取当前画布在全局坐标系统中的位置x和y，并将其存储为上一次舞台位置信息。
    render.startStagePosition = {
        x: render.pageContent.x(),
        y: render.pageContent.y()
    };
}


//处理在拖拽操作进行时被调用以处理鼠标或触摸点的移动事件。
function appMoving(mouseX: number, mouseY: number, render: CanvasRender) { 
    if (!render.root_stage) return;
    // 如果上次拖拽的位置信息不存在，则直接返回（意味着还没有开始拖拽或者已经清理了状态）。
    if(!render.startDragPosition || !render.startStagePosition) return
    // 根据当前鼠标或触摸点坐标与上一次拖拽结束时的位置计算水平和垂直方向上的位移量。
    const deltaX = mouseX - render.startDragPosition.x;
    const deltaY = mouseY - render.startDragPosition.y;
    // 使用计算出的位移量更新画布（舞台）在全局坐标系统中的位置。
    render.pageContent.x(render.startStagePosition.x + deltaX);
    render.pageContent.y(render.startStagePosition.y + deltaY);
}

// 处理在拖拽操作结束时被调用以重置相关状态。
function appEndDrag(render: CanvasRender) { 
    // 将最后一次拖拽操作的位置信息设置为null，表示当前没有进行中的拖拽行为。
    render.startDragPosition = null;
    // 将画布上一次的全局位置信息也设置为null，表明不再记录之前的舞台位置。
    render.startStagePosition = null;
}

// // 处理在缩放比例调整画布上注释组件的大小
// function handleCommentSize(canvasRender: CanvasRender) { 
//     // 从canvasRender对象的空间数组中筛选出类型为'Component_Comment'的元素，这些代表注释组件。
//     const commentsNode = canvasRender.spaceArr.filter((item) => item.params.type === 'Component_Comment')
//     commentsNode.forEach((e) => { 
//         // 获取注释组件图形的实际绘制对象，这里将其转换为Konva.Group类型，因为注释可能包含多个图形元素组成的一个组。
//         const point = e.shape[0] as Konva.Group;

//         // 设置一个常量，表示注释初始缩放的比例基数，这里设为1。
//         const commentsStartNumber = 1
//         // 根据当前渲染器的全局缩放比例来调整注释组在X和Y轴方向上的缩放大小。
//         point.scaleX(commentsStartNumber / canvasRender.scale)
//         point.scaleY(point.scaleX())

//         // 标注点缩放缓动动画 
//         const firstChild = point.children[0] || { attrs: { fill: undefined } };
//         let pointStartFill = firstChild.attrs.fill;
        
//         // if (point.getLayer()) {
            
            
//         //     // const tween = new Konva.Tween({
//         //     //     node: point,
//         //     //     scaleX:point.scaleX() * 1.3,
//         //     //     scaleY: point.scaleY() * 1.3,
//         //     //     easing: Konva.Easings.EaseIn,
//         //     //     duration: .03,
//         //     // });
//         //     // point.on('mouseover touchstart', () => {
//         //     //     canvasRender.isCanvasComment = true
//         //     //     canvasrender.root_stage.container().style.cursor = 'pointer';
//         //     //     point.children[0].attrs.fill = "yellow";
//         //     //     tween.play(); // 启动动画
//         //     // })
//         //     // point.on('mouseout touchend', () => {
//         //     //     canvasRender.isCanvasComment = false
//         //     //     canvasrender.root_stage.container().style.cursor = "default";
//         //     //     point.children[0].attrs.fill = pointStartFill
//         //     //     tween.reverse(); //暂停动画
//         //     // });
//         // }
        
//     })
// }

// // 处理捏合缩放手势
// function handlePinchZoom(scale: number, canvasRender: CanvasRender) {
//     // 获取当前舞台X轴缩放比例，并乘以传入的缩放因子
//     const newScale = canvasrender.root_stage.scaleX() * scale;
//     // 定义允许的最小和最大缩放值
//     const minScale = 0.02;
//     const maxScale = 256;
//     // 将新的缩放比例限制在允许范围内
//     const clampedScale = Math.min(maxScale, Math.max(minScale, newScale));
//     // 更新画布舞台的X轴和Y轴缩放到经过约束的新缩放比例
//     canvasrender.root_stage.scale({ x: clampedScale, y: clampedScale });
//     // 清除之前存储的捏合开始时的距离信息，表明本次缩放动作已完成
//     canvasRender.pinchStartDistance = null;
//     // 刷新画布舞台，应用缩放变化
//     canvasrender.root_stage.batchDraw();
//     // 更新canvasRender对象中记录的当前缩放比例值
//     canvasRender.scale = clampedScale;
//     // 调用handleCommentSize方法，可能用于处理与缩放相关的注释或其他元素尺寸调整
//     canvasRender.handleCommentSize();
// }

// // 处理评论组件在画布上的可见性
// function elementsVisible(elementTypeName:string ,isCommentVisible: boolean, canvasRender: CanvasRender) { 
//     // 从canvasRender对象的空间数组spaceArr中筛选出类型为'Component_Comment'的元素

//     const commentsNode = canvasRender.spaceArr.filter((item) => item.type === elementTypeName)
//     // commentsNode.forEach((e) => { 
//     //     // 获取当前元素的形状（在这里是Konva.Group类型，它可能封装了整个评论组件的图形信息）
//     //     const point = e.shape[0] as Konva.Node;
//     //     // 根据传入的isCommentVisible布尔值设置该组（即评论组件）的可见性
//     //     point.visible(isCommentVisible ? true : false)
//     // })
//     commentsNode.forEach(({ shape }) => { 
//         shape.forEach((node: Konva.Node) => {
//             // 根据传入的isCommentVisible布尔值设置该组（即评论组件）的可见性
//             node.visible(isCommentVisible ? true : false)
//         });
//     })
    
// }

// // 根据type清除页面的元素
// // function clearElements(elementTypeName:string, canvasRender: CanvasRender) { 
// //     // 获取页面上的所有元素
// //     const commentsNode = canvasRender.spaceArr.filter((item) => item.type === elementTypeName);
// //     // canvasRender.spaceArr.filter((item) => { 
// //     //     // console.log(item);
// //     //     // item.type === elementTypeName
        
// //     // })
    
// //     // 遍历找到的元素，并从舞台上移除它们
// //     commentsNode.forEach(({ shape }) => { 
// //         shape.forEach((node: Konva.Node) => {
// //             node.remove();
// //         });
// //     })
// //     // 从spaceArr中移除指定类型的元素
// //     canvasRender.spaceArr = canvasRender.spaceArr.filter((item) => item.params.type !== elementTypeName);
// // }

// 删除元素
function deleteElements(Id: string, render: CanvasRender) {     
    // 获取页面上的所有元素
    const commentsNode = render.shapeAttrs.filter((item) => item.attrs.id === Id);
    
    // console.log(render.shapeAttrs);
    
    // 遍历找到的元素，并从舞台上移除它们
    // commentsNode.forEach(({ element }) => { 
    //     element.destroy();
    // })
    
}







export default {
    startDrag,
    appMoving,
    appEndDrag,
    deleteElements,
}

