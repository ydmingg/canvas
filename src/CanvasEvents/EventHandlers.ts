import Konva from "konva";
import { CanvasRender } from "../CanvasRender/index";

function handleStageLoad(canvasRender: CanvasRender) { 
    // 获取舞台上所有元素的总边界框（即包含所有元素的最小矩形区域）
    const elementsBoundingBox = canvasRender.stage.getClientRect();
    // 初始化缩放比例为预设值或当前已有的缩放比例
    let scaleBy = canvasRender.scale;
    
    // 检查元素总体积是否超过了舞台的宽度或高度
    if (elementsBoundingBox.width > canvasRender.stage.width() || elementsBoundingBox.height > canvasRender.stage.height()) {
        // 计算新的缩放比例，使得元素能在不超出舞台尺寸的情况下尽可能大地显示，同时留出20像素的边距
        scaleBy = Math.min(
            // 计算水平方向的缩放因子
            (canvasRender.stage.width() - 20) / elementsBoundingBox.width,
            // 计算垂直方向的缩放因子
            (canvasRender.stage.height() - 20) / elementsBoundingBox.height
        );
    }
    // 获取元素总边界框相对于舞台的偏移量
    const offset = {
        x: elementsBoundingBox.x,
        y: elementsBoundingBox.y 
    };
    // 根据新计算的缩放比例以及原边界框大小和偏移量，计算缩放后元素的新边界框尺寸
    const newElementBoundingBoxWidth = Math.round((elementsBoundingBox.width + offset.x) * scaleBy);
    const newElementBoundingBoxHeight = Math.round((elementsBoundingBox.height + offset.y) * scaleBy);
    // 将舞台的中心点设置为容器窗口中心，确保内容居中
    canvasRender.stage.x((canvasRender.stage.width() - newElementBoundingBoxWidth) / 2);
    canvasRender.stage.y((canvasRender.stage.height() - newElementBoundingBoxHeight) / 2);
    // 应用新的缩放比例到整个舞台
    canvasRender.stage.scale({ x: scaleBy, y: scaleBy });
    // 强制舞台重绘，应用所有更改
    canvasRender.stage.batchDraw();
    // 更新渲染器内部记录的全局缩放比例
    canvasRender.scale = scaleBy;
    // 调用处理注释尺寸的方法，以适应缩放变化（可能需要根据实际应用场景自定义）
    canvasRender.handleCommentSize();
    
    // canvasRender.stage.draw();
    return scaleBy;
}

// 处理窗口大小动态调整Canvas渲染区域以及其中内容的大小，
function handleWindowResize(canvasRender: CanvasRender) { 
    // 获取当前canvas元素的实时宽度和高度（包括CSS样式设置的影响）
    const newWidth = canvasRender.el.clientWidth;
    const newHeight = canvasRender.el.clientHeight;
    // 根据获取到的窗口尺寸调整舞台（stage）的宽度和高度
    canvasRender.stage.width(newWidth);
    canvasRender.stage.height(newHeight);
    // 更新CanvasRender对象内部记录的宽度和高度属性
    canvasRender.width = newWidth
    canvasRender.height = newHeight
    
    // 调整完尺寸后，立即重绘整个舞台以适应新的尺寸变化
    canvasRender.stage.draw();

    
    
}

// 处理滚轮位移事件（同时按住ctrl或者win时画布缩放）
function handleWheel(event: WheelEvent, canvasRender: CanvasRender) {
    // 获取当前鼠标在舞台坐标系中的位置
    const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d
    // 设置缩放步进值为10
    const step = 10
    // 根据滚轮滚动的方向设置缩放方向，向下滚动为缩小(-1)，向上滚动为放大(1)
    let direction = event.deltaY > 0 ? -1 : 1;
    // 获取当前舞台的X轴缩放比例
    const oldScale = canvasRender.stage.scaleX();
    // 计算鼠标点相对于未缩放舞台的位置
    const mousePointTo = {
        x: (position.x - canvasRender.stage.x()) / oldScale,
        y: (position.y - canvasRender.stage.y()) / oldScale
    }
    // 设置缩放因子，基础缩放倍数为1.05
    const scaleBy = 1.05;
    // 设置最小与最大允许的缩放比例
    const minScaleBy = 0.02
    const maxScaleBy = 256
    // 初始化新的缩放比例变量
    let newScale;
    // 检查用户是否按下了Ctrl键或Meta键（对于Mac是Command键）
    if (event.ctrlKey || event.metaKey) {
        // 根据滚轮滚动方向调整缩放比例，并限制在允许范围内
        newScale = event.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy   
        newScale = Math.min(maxScaleBy, Math.max(minScaleBy, newScale));
        // 阻止默认的滚轮滚动行为（如页面滚动等）
        event.preventDefault();
        event.stopPropagation();
        // 更新舞台的缩放比例
        canvasRender.stage.scale({ x: newScale, y: newScale })
         // 计算并更新舞台的新位置以保持缩放中心不变
        const newPos = {
            x: position.x - mousePointTo.x * newScale,
            y: position.y - mousePointTo.y * newScale
        }
        // 更新舞台的位置坐标
        canvasRender.stage.position(newPos)
        // 批量重绘舞台及其所有子层
        canvasRender.stage.batchDraw();
        // 更新内部记录的缩放比例
        canvasRender.scale = newScale
        // 调用处理评论大小变化的方法
        canvasRender.handleCommentSize();
    } else { 
        // 如果没有按下Ctrl或Meta键，则仅沿垂直方向移动舞台内容
        newScale = oldScale
        canvasRender.stage.y(canvasRender.stage.y() + step * direction)
        canvasRender.scale = newScale
    }
    // 阻止滚轮事件的默认行为
    event.preventDefault();
}

// 处理空格键的按下
function handleKeyDown(event: KeyboardEvent, canvasRender: CanvasRender) {
    // 检查是否按下的是空格键(' ')
    if (event.key === ' ') {
        // 设置canvasRender对象中的isSpacePressed属性为true，表明空格键当前处于按下状态
        canvasRender.isSpacePressed = true;
        // 阻止空格键的默认行为，例如在文本输入框中产生空格字符或页面滚动
        event.preventDefault();
        // 更改鼠标指针状态为抓手
        canvasRender.el.style.cursor = "grab";
    }
}

// 处理空格键的抬起
function handleKeyUp(event: KeyboardEvent, canvasRender: CanvasRender) {
    // 检查当前被释放的键是否为空格键(' ')
    if (event.key === ' ') {
        // 设置canvasRender对象中的isSpacePressed属性为false，表明空格键当前处于抬起状态
        canvasRender.isSpacePressed = false;
        // 还原鼠标指针状态
        canvasRender.el.style.cursor = "default";
    }
    
}

// 处理全局鼠标按下事件
function handleMouseDown(event: MouseEvent , canvasRender: CanvasRender) {
    // 检查是否按下了鼠标左键(0)或中键(1)
    if (event.button === 0 || event.button === 1) {
        // 调用canvasRender对象的handleStartDrag方法，传入鼠标点击时在页面上的横纵坐标（clientX, clientY）
        canvasRender.handleStartDrag(event.clientX, event.clientY);
        // 还原鼠标指针状态
        canvasRender.el.style.cursor = "default";
    }
}

// 处理全局鼠标移动事件
function handleMouseMove(event: MouseEvent, canvasRender: CanvasRender) {
    // 检查当前是否有鼠标左键(1)或中键(4)按下，并且canvasRender对象中的isSpacePressed属性为true
    if ((event.buttons === 1 || event.buttons === 4) && canvasRender.isSpacePressed) {
        // 调用canvasRender对象的handleDrag方法，传入鼠标当前位置在页面上的横纵坐标（clientX, clientY）
        canvasRender.handleDrag(event.clientX, event.clientY);
    }
}

// 处理全局鼠标抬起事件
function handleMouseUp(canvasRender: CanvasRender) {
    // 还原鼠标指针状态
    canvasRender.el.style.cursor = "default";
    // 调用canvasRender对象的handleEndDrag方法，表示拖拽操作已经结束
    canvasRender.handleEndDrag();
}

// 处理舞台上的mousedown、mousemove和mouseup事件
function handleStageMouseDown(event: Konva.KonvaEventObject<MouseEvent>,canvasRender: CanvasRender){
    // 检查是否按下了鼠标左键(1)
    if (event.evt.button === 1) {
        // 调用canvasRender对象的handleStartDrag方法，传入鼠标点击时在页面上的横纵坐标（clientX, clientY）
        canvasRender.handleStartDrag(event.evt.clientX, event.evt.clientY);
    }
}
function handleStageMouseMove(event: Konva.KonvaEventObject<MouseEvent>,canvasRender: CanvasRender){
   // 检查是否按下了中键（滚轮按下或按下鼠标按钮4）
    if (event.evt.buttons === 4) {
        // 调用canvasRender对象的handleDrag方法，更新当前拖拽位置为鼠标的页面坐标（clientX, clientY）
        canvasRender.handleDrag(event.evt.clientX, event.evt.clientY);
        // 设置鼠标指针状态为抓手
        canvasRender.el.style.cursor = "grab";
    }
}
function handleStageMouseUp(canvasRender: CanvasRender) {
    // 还原鼠标指针状态
    canvasRender.el.style.cursor = "default";
    // 调用canvasRender对象的handleEndDrag方法，表示拖拽操作已经结束
    canvasRender.handleEndDrag();
}

// 处理Konva画布的点击事件
function handleCanvasClick(canvasRender: CanvasRender) { 

    // 获取当前鼠标在舞台坐标系中的位置，并将其转换为Vector2d对象
    const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d
    // 获取当前舞台的X轴缩放比例
    const scale = canvasRender.stage.scaleX();
    // 根据当前鼠标位置和舞台缩放比例计算出相对于未缩放画布的点击坐标
    canvasRender.x = Math.round((position.x - canvasRender.stage.x()) / scale);
    canvasRender.y = Math.round((position.y - canvasRender.stage.y()) / scale);
    // 如果检测到空格键被按下或当前点击不是针对注释（isCommentClickBool为false），则直接返回，不执行后续操作
    // if (canvasRender.isSpacePressed || !canvasRender.isCommentClickBool) return;
    // 否则，设置canvasRender中表示画布被点击的标志位为true
    if (canvasRender.isCanvasComment) return;
    canvasRender.isCanvasClickFlag = true; 
    
    
}

// 处理触摸设备上的触摸开始事件（TouchEvent）
function handleTouchStart(event: TouchEvent, canvasRender: CanvasRender) {
    // 当触摸点数量为1时
    if (event.touches.length === 1) {
        // 调用handleStartDrag方法，传递第一个触摸点在屏幕坐标系中的X和Y坐标
        canvasRender.handleStartDrag(event.touches[0].clientX, event.touches[0].clientY);
        // 当触摸点数量为2时，即发生双指或多点触摸
    } else if (event.touches.length === 2) {
        // 计算两个触摸点之间的欧几里得距离（两点间直线距离）
        const distance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        // 将计算出的起始捏合（pinch）操作的距离保存到canvasRender对象中以便后续处理缩放等交互
        canvasRender.pinchStartDistance = distance;
    }
}

// 处理触摸事件（TouchEvent），并根据触摸点的数量和状态来响应不同的操作
function handleTouchMove(event: TouchEvent, canvasRender: CanvasRender) {
    // 关闭渲染
    canvasRender.isCommentClickBool = false
    // 设置当前渲染器对象的状态为正在进行触摸移动操作
    canvasRender.isTouchMovePosition = true
    // 检查是否只有一个触摸点在屏幕上
    if (event.touches.length === 1) {
        // 当只有一个触摸点时，调用相应的方法进行拖拽操作
        canvasRender.handleDrag(event.touches[0].clientX, event.touches[0].clientY);
        // 检查是否有两个触摸点且已记录了捏合开始的距离
    } else if (event.touches.length === 2 && canvasRender.pinchStartDistance !== null) {
        // 计算两个触摸点的中点坐标
        const midpoint = {
            x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
            y: (event.touches[0].clientY + event.touches[1].clientY) / 2,
        };
        // 如果有先前记录的捏合起始距离，则执行缩放操作
        if (canvasRender.pinchStartDistance !== null) {
            // 计算两个触摸点的中点坐标
            const currentDistance = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
            );
            // 计算缩放比例
            const scale = currentDistance / canvasRender.pinchStartDistance;
            // 获取舞台实例，并获取当前的水平缩放值
            const stage = canvasRender.stage;
            const oldScale = stage.scaleX();
            // 计算新的缩放值
            const newScale = oldScale * scale;
            // 计算舞台中心与当前触摸点中点之间的偏移量
            const offsetX = stage.x() - midpoint.x;
            const offsetY = stage.y() - midpoint.y;
            // 更新舞台的缩放属性
            stage.scale({ x: newScale, y: newScale });
            // 根据缩放比例调整舞台位置以保持视觉上的缩放中心不变
            stage.position({
                x: midpoint.x + offsetX * scale,
                y: midpoint.y + offsetY * scale,
            });
            // 执行批量重绘以更新显示内容
            stage.batchDraw();
            // 更新存储的捏合起始距离为当前距离，以便后续计算
            canvasRender.pinchStartDistance = currentDistance;
            // 更新渲染器对象中的缩放系数
            canvasRender.scale = newScale;
            // 处理注释尺寸的更新（例如：缩放时同步调整画布上注释大小）
            canvasRender.handleCommentSize();
        } else {
            // 若尚未记录捏合起始距离，则记录初始捏合距离
            const initialDistance = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
            );
            canvasRender.pinchStartDistance = initialDistance;
        }
    }
}

// 处理在触摸结束事件（TouchEvent）触发时调用，并负责清理和重置与触摸相关的状态。
function handleTouchEnd(event: TouchEvent, canvasRender: CanvasRender) {
    // 启动渲染
    canvasRender.isCommentClickBool = true
    // 调用处理拖拽结束的方法，释放拖拽操作的任何相关资源或恢复初始状态
    canvasRender.handleEndDrag();
    // 重置捏合起始距离为null，表示当前没有进行中的捏合操作
    canvasRender.pinchStartDistance = null;
    // 将触摸移动位置标志设置为false，表示当前没有触摸点正在移动
    canvasRender.isTouchMovePosition = false
}

// 处理在轻触事件（tap）触发时调用，用于处理点击或轻触交互。
function handleTap(event: Event, canvasRender: CanvasRender) {
    // 如果空格键未被按下，则直接返回，不执行后续操作
    if (!canvasRender.isSpacePressed) return;
    // 获取当前鼠标指针在舞台坐标系中的位置，并将其转换为Konva.Vector2d对象
    const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d;
    // 获取当前画布的X轴缩放比例
    const scale = canvasRender.stage.scaleX();
    // 计算点击点相对于未缩放画布的真实坐标，并进行四舍五入取整
    canvasRender.x = Math.round((position.x - canvasRender.stage.x()) / scale);
    canvasRender.y = Math.round((position.y - canvasRender.stage.y()) / scale);
    // 设置表示画布已被点击的标志位为true
    canvasRender.isCanvasClickFlag = true;
}

export default {
    handleStageLoad,
    handleWindowResize,
    handleWheel,
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleStageMouseDown,
    handleStageMouseMove,
    handleStageMouseUp,
    handleCanvasClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTap,

}