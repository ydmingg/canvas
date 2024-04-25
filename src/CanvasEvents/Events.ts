import Konva from "konva";
import { CanvasRender } from "../CanvasRender/index";
import { Others } from "../CanvasEvents";

// 自动缩放画布
function StageAutoSize(render: CanvasRender) { 
    if (!render.stage) return;
    // 获取舞台上所有元素的总边界框（即包含所有元素的最小矩形区域）
    const stagePadding = 20
    const stageWidth = render.width - stagePadding*2; 
    const stageHeight = render.height - stagePadding*2; 
    const allElements = render.stage.getClientRect({ relativeTo: render.stage });
    // 计算元素总体积和偏移量
    const totalWidth = allElements.width;
    const totalHeight = allElements.height;
    const offsetX = allElements.x;
    const offsetY = allElements.y;
    
    // 初始化缩放比例为预设值或当前已有的缩放比例
    let scaleBy = render.scale;
    if (scaleBy<= render.scale_by.min || render.scale >= render.scale_by.max) return;

    // 检查元素总体积是否超过了舞台的宽度或高度
    if (!render.scaleBool && (allElements.width > render.stage.width() || allElements.height > render.stage.height())) {
        // 计算新的缩放比例，使得元素能在不超出舞台尺寸的情况下尽可能大地显示，同时留出20像素的边距
        scaleBy = Math.min(
            // 计算水平方向的缩放因子
            (render.stage.width() - 20) / allElements.width,
            // 计算垂直方向的缩放因子
            (render.stage.height() - 20) / allElements.height
        );

        // 计算水平和垂直方向上的缩放比例
        const scaleX = stageWidth / totalWidth;
        const scaleY = stageHeight / totalHeight;

        // 取较小的缩放比例作为最终的缩放比例
        scaleBy = Math.min(scaleX, scaleY);
    }
    

    // 设置舞台缩放比例
    render.scaleStage(scaleBy);

    // 计算缩放后元素的偏移量
    const scaledOffsetX = offsetX * scaleBy - stagePadding;
    const scaledOffsetY = offsetY * scaleBy - stagePadding;

    
    // 计算偏移量，并在缩放后将元素居中
    const offsetXDiff = (stageWidth - totalWidth * scaleBy) / 2 - scaledOffsetX;
    const offsetYDiff = (stageHeight - totalHeight * scaleBy) / 2 - scaledOffsetY;
    render.stage.position({ x: offsetXDiff, y: offsetYDiff });

    
    const stageBackground = new Konva.Rect({
        x: allElements.x, // 设置矩形左上角的 X 坐标为 0，使其紧贴舞台左侧边缘
        y: allElements.y, // 设置矩形左上角的 Y 坐标为 0，使其紧贴舞台顶部边缘
        width: allElements.width, // 设置矩形宽度与舞台宽度相同
        height: allElements.height, // 设置矩形高度与舞台高度相同
        fill: 'rgba(0, 0, 0, .5)', // 设置背景颜色，这里使用白色（您可以根据需要更改颜色和透明度）
    });
    render.layer.add(stageBackground);
    stageBackground.moveToBottom();


    render.stage.visible(true)

    // 更新缩放属性
    render.scale = scaleBy;

    render.stage.batchDraw();
    

}

// 处理滚轮位移事件（同时按住ctrl或者win时画布缩放）
function Wheel(event:any, render: CanvasRender) {
    const { stage } = render
    if (!stage) return;
    // 获取当前鼠标在舞台坐标系中的位置
    const position = stage.getPointerPosition() as Konva.Vector2d
    // 设置缩放步进值为10
    const step = 10
    // 根据滚轮滚动的方向设置缩放方向，向下滚动为缩小(-1)，向上滚动为放大(1)
    let direction = event.evt.deltaY > 0 ? -1 : 1;
    
    // 获取当前舞台的X轴缩放比例
    const oldScale = stage.scaleX();
    // 计算鼠标点相对于未缩放舞台的位置
    const mousePointTo = {
        x: (position.x - stage.x()) / oldScale,
        y: (position.y - stage.y()) / oldScale
    }

    // 根据滚轮滚动方向调整缩放比例，并限制在允许范围内
    let newScale
    newScale = direction > 0 ? oldScale * render.scale_by.value : oldScale / render.scale_by.value
    newScale = Math.min(render.scale_by.max, Math.max(render.scale_by.min, newScale));

    //计算并更新舞台的新位置以保持缩放中心不变
    const newPosition = {
        x: position.x - mousePointTo.x * newScale,
        y: position.y - mousePointTo.y * newScale 
    }

    // 滑动滚轮时，设置舞台垂直移动
    stage.y(stage.y() + step * direction)
    
    render.scale = oldScale
    
    
    // 检查用户是否按下了Ctrl键或Meta键（对于Mac是Command键）
    if (event.evt.ctrlKey || event.evt.metaKey) {
        // 阻止默认的滚轮滚动行为（如页面滚动等）
        event.evt.preventDefault();
        event.evt.stopPropagation();

        // 更新舞台的缩放比例
        stage.scale({ x: newScale, y: newScale })
        
      
        // 更新舞台的位置坐标
        stage.position(newPosition)
        render.scale = newScale
        
    }
    // // 阻止滚轮事件的默认行为
    // event.preventDefault();
}

// // 处理空格键的按下
function KeyDown(event: KeyboardEvent, render: CanvasRender) {
    if (event.code == "Space") { 
        render.moveStatus = true
        render.app.style.cursor = "grab"
    }
}

// 处理空格键的抬起
function Keyup(event: KeyboardEvent, render: CanvasRender) {
    if (event.code == "Space") { 
        render.moveStatus = false
        render.app.style.cursor = "default"
    }
}

// 处理全局鼠标按下事件
function mouseDown(event: any, render: CanvasRender) {
    if (!render.stage) return;
    if (event.evt.buttons === 1) { 
        const canvasDom = event.target

    }

    // 检查是否按下了鼠标左键(1)或中键(4)
    if (event.evt.buttons === 1 || event.evt.buttons === 4) {
        
        // 调用canvasRender对象的handleStartDrag方法，传入鼠标点击时在页面上的横纵坐标（clientX, clientY）
        render.startDrag(event.evt.clientX, event.evt.clientY);
        // 还原鼠标指针状态
        render.app.style.cursor = (event.evt.buttons === 4) ? "grab" : "default";
    }

    // 处理移动端触摸事件
    if (!event.evt.touches) return;
    if (event.evt.touches.length === 1) {
        render.startDrag(event.evt.touches[0].clientX, event.evt.touches[0].clientY);
    } else if (event.evt.touches.length === 2) { 
        // 计算两个触摸点之间的欧几里得距离（两点间直线距离）
        const distance = Math.hypot(
            event.evt.touches[0].clientX - event.evt.touches[1].clientX,
            event.evt.touches[0].clientY - event.evt.touches[1].clientY
        );
        // 将计算出的起始捏合（pinch）操作的距离保存到canvasRender对象中以便后续处理缩放等交互
        render.pinchStartDistance = distance;
    }

    


} 

// // 处理全局鼠标移动事件
function mouseMove(event: any, render: CanvasRender) {
    if (!render.stage) return;
    if (render.moveStatus) { render.app.style.cursor = "grab" }
    
    // 检查当前是否有鼠标左键(1)或中键(4)按下，并且canvasRender对象中的isSpacePressed属性为true.
    if (event.evt.buttons === 1 && render.moveStatus || event.evt.buttons === 4) {
        // 调用canvasRender对象的handleDrag方法，传入鼠标当前位置在页面上的横纵坐标（clientX, clientY）
        render.appMoving(event.evt.clientX, event.evt.clientY);
        
    }

    // 处理移动端触摸事件
    if (!event.evt.touches) return;
    if (event.evt.touches.length === 1) {
        // 当只有一个触摸点时，调用相应的方法进行拖拽操作
        render.appMoving(event.evt.touches[0].clientX, event.evt.touches[0].clientY);
    } else if (event.evt.touches.length === 2 && render.pinchStartDistance !== null) { 
        // 计算两个触摸点的中点坐标
        const midpoint = {
            x: (event.evt.touches[0].clientX + event.evt.touches[1].clientX) / 2,
            y: (event.evt.touches[0].clientY + event.evt.touches[1].clientY) / 2,
        };
        // 若尚未记录捏合起始距离，则记录初始捏合距离
        const initialDistance = Math.hypot(
            event.evt.touches[0].clientX - event.evt.touches[1].clientX,
            event.evt.touches[0].clientY - event.evt.touches[1].clientY
        );
        //render.pinchStartDistance = initialDistance;
        
        if (render.pinchStartDistance !== null) { 
            const currentDistance = Math.hypot(
                event.evt.touches[0].clientX - event.evt.touches[1].clientX,
                event.evt.touches[0].clientY - event.evt.touches[1].clientY
            );
            // 计算缩放比例
            const scale = currentDistance / render.pinchStartDistance;
            // 获取舞台实例，并获取当前的水平缩放值
            const oldScale = render.stage.scaleX();
            // 计算新的缩放值
            const newScale = oldScale * scale;
            // 计算舞台中心与当前触摸点中点之间的偏移量
            const offsetX = render.stage.x() - midpoint.x;
            const offsetY = render.stage.y() - midpoint.y;
            // 更新舞台的缩放属性
            render.stage.scale({ x: newScale, y: newScale });
            // 根据缩放比例调整舞台位置以保持视觉上的缩放中心不变
            render.stage.position({
                x: midpoint.x + offsetX * scale,
                y: midpoint.y + offsetY * scale,
            });
            render.pinchStartDistance = currentDistance;
            render.scale = newScale;
        }
        
    }
}

// 处理全局鼠标抬起事件
function mouseUp(render: CanvasRender) {
    // 还原鼠标指针状态
    render.app.style.cursor = "default";
    // 拖拽操作已经结束
    render.appEndDrag();

    render.pinchStartDistance = null;
}

function mouseClick(event: any, render: CanvasRender) { 
    // if (!render.stage) return;
    // const canvasDom = event.target
    
    // // 获取舞台的缩放比例
    // const stageScale = render.stage.scaleX(); // 假设舞台的水平和垂直方向的缩放比例相同
    
    // // 获取鼠标单击的坐标
    // const mouseX = event.evt.clientX - render.app.getBoundingClientRect().left; // 鼠标在页面中的横坐标
    // const mouseY = event.evt.clientY - render.app.getBoundingClientRect().top; // 鼠标在页面中的纵坐标
    // // console.log(render.app.getBoundingClientRect());

    // const allElements = render.stage.getClientRect({ relativeTo: render.stage });
    // // 计算鼠标单击的真实坐标（缩放前）
    // const realXBefore = mouseX - render.stage.x()
    // const realYBefore = mouseY - render.stage.y()

    // // 处理缩放后的坐标
    // const realXAfter = event.evt.clientX 
    // const realYAfter = event.evt.clientY
    
    
    

    // // 打印出结果
    // console.log("相对窗口坐标：", realXAfter, realYAfter);
    // console.log("相对画布坐标：", realXBefore, realYBefore, stageScale,render.stage.x());
}
    
    



// // 处理Konva画布的点击事件
// function handleCanvasClick(canvasRender: CanvasRender) { 

//     // 获取当前鼠标在舞台坐标系中的位置，并将其转换为Vector2d对象
//     const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d
//     // 获取当前舞台的X轴缩放比例
//     const scale = canvasRender.stage.scaleX();
//     // 根据当前鼠标位置和舞台缩放比例计算出相对于未缩放画布的点击坐标
//     canvasRender.x = Math.round((position.x - canvasRender.stage.x()) / scale);
//     canvasRender.y = Math.round((position.y - canvasRender.stage.y()) / scale);
//     // 如果检测到空格键被按下或当前点击不是针对注释（isCommentClickBool为false），则直接返回，不执行后续操作
//     // if (canvasRender.isSpacePressed || !canvasRender.isCommentClickBool) return;
//     // 否则，设置canvasRender中表示画布被点击的标志位为true
//     if (canvasRender.isCanvasComment) return;
//     canvasRender.isCanvasClickFlag = true; 
    
    
// }

// // 处理触摸设备上的触摸开始事件（TouchEvent）
// function handleTouchStart(event: TouchEvent, canvasRender: CanvasRender) {
//     // 当触摸点数量为1时
//     if (event.touches.length === 1) {
//         // 调用handleStartDrag方法，传递第一个触摸点在屏幕坐标系中的X和Y坐标
//         canvasRender.handleStartDrag(event.touches[0].clientX, event.touches[0].clientY);
//         // 当触摸点数量为2时，即发生双指或多点触摸
//     } else if (event.touches.length === 2) {
//         // 计算两个触摸点之间的欧几里得距离（两点间直线距离）
//         const distance = Math.hypot(
//             event.touches[0].clientX - event.touches[1].clientX,
//             event.touches[0].clientY - event.touches[1].clientY
//         );
//         // 将计算出的起始捏合（pinch）操作的距离保存到canvasRender对象中以便后续处理缩放等交互
//         canvasRender.pinchStartDistance = distance;
//     }
// }

// // 处理触摸事件（TouchEvent），并根据触摸点的数量和状态来响应不同的操作
// function handleTouchMove(event: TouchEvent, canvasRender: CanvasRender) {
//     // 关闭渲染
//     canvasRender.isCommentClickBool = false
//     // 设置当前渲染器对象的状态为正在进行触摸移动操作
//     canvasRender.isTouchMovePosition = true
//     // 检查是否只有一个触摸点在屏幕上
//     if (event.touches.length === 1) {
//         // 当只有一个触摸点时，调用相应的方法进行拖拽操作
//         canvasRender.handleDrag(event.touches[0].clientX, event.touches[0].clientY);
//         // 检查是否有两个触摸点且已记录了捏合开始的距离
//     } else if (event.touches.length === 2 && canvasRender.pinchStartDistance !== null) {
//         // 计算两个触摸点的中点坐标
//         const midpoint = {
//             x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
//             y: (event.touches[0].clientY + event.touches[1].clientY) / 2,
//         };
//         // 如果有先前记录的捏合起始距离，则执行缩放操作
//         if (canvasRender.pinchStartDistance !== null) {
//             // 计算两个触摸点的中点坐标
//             const currentDistance = Math.hypot(
//                 event.touches[0].clientX - event.touches[1].clientX,
//                 event.touches[0].clientY - event.touches[1].clientY
//             );
//             // 计算缩放比例
//             const scale = currentDistance / canvasRender.pinchStartDistance;
//             // 获取舞台实例，并获取当前的水平缩放值
//             const stage = canvasRender.stage;
//             const oldScale = stage.scaleX();
//             // 计算新的缩放值
//             const newScale = oldScale * scale;
//             // 计算舞台中心与当前触摸点中点之间的偏移量
//             const offsetX = stage.x() - midpoint.x;
//             const offsetY = stage.y() - midpoint.y;
//             // 更新舞台的缩放属性
//             stage.scale({ x: newScale, y: newScale });
//             // 根据缩放比例调整舞台位置以保持视觉上的缩放中心不变
//             stage.position({
//                 x: midpoint.x + offsetX * scale,
//                 y: midpoint.y + offsetY * scale,
//             });
//             // 执行批量重绘以更新显示内容
//             stage.batchDraw();
//             // 更新存储的捏合起始距离为当前距离，以便后续计算
//             canvasRender.pinchStartDistance = currentDistance;
//             // 更新渲染器对象中的缩放系数
//             canvasRender.scale = newScale;
//             // 处理注释尺寸的更新（例如：缩放时同步调整画布上注释大小）
//             canvasRender.handleCommentSize();
//         } else {
//             // 若尚未记录捏合起始距离，则记录初始捏合距离
//             const initialDistance = Math.hypot(
//                 event.touches[0].clientX - event.touches[1].clientX,
//                 event.touches[0].clientY - event.touches[1].clientY
//             );
//             canvasRender.pinchStartDistance = initialDistance;
//         }
//     }
// }

// // 处理在触摸结束事件（TouchEvent）触发时调用，并负责清理和重置与触摸相关的状态。
// function handleTouchEnd(event: TouchEvent, canvasRender: CanvasRender) {
//     // 启动渲染
//     canvasRender.isCommentClickBool = true
//     // 调用处理拖拽结束的方法，释放拖拽操作的任何相关资源或恢复初始状态
//     canvasRender.handleEndDrag();
//     // 重置捏合起始距离为null，表示当前没有进行中的捏合操作
//     canvasRender.pinchStartDistance = null;
//     // 将触摸移动位置标志设置为false，表示当前没有触摸点正在移动
//     canvasRender.isTouchMovePosition = false
// }

// // 处理在轻触事件（tap）触发时调用，用于处理点击或轻触交互。
// function handleTap(event: Event, canvasRender: CanvasRender) {
//     // 如果空格键未被按下，则直接返回，不执行后续操作
//     if (!canvasRender.isSpacePressed) return;
//     // 获取当前鼠标指针在舞台坐标系中的位置，并将其转换为Konva.Vector2d对象
//     const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d;
//     // 获取当前画布的X轴缩放比例
//     const scale = canvasRender.stage.scaleX();
//     // 计算点击点相对于未缩放画布的真实坐标，并进行四舍五入取整
//     canvasRender.x = Math.round((position.x - canvasRender.stage.x()) / scale);
//     canvasRender.y = Math.round((position.y - canvasRender.stage.y()) / scale);
//     // 设置表示画布已被点击的标志位为true
//     canvasRender.isCanvasClickFlag = true;
// }

export default {
    StageAutoSize,
    Wheel,
    KeyDown,
    Keyup,
    mouseDown,
    mouseMove,
    mouseUp,
    mouseClick,

}