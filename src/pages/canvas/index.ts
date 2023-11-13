import Konva from 'konva';
const commentBox = (stage: Konva.Stage, layer: Konva.Layer, x: number, y: number, index: number): Konva.Group => { 
    // 获取当前画布的缩放因子
    const scale = stage.scaleX();
    // 计算缩放后的坐标
    const adjustedX = (x - stage.x()) / scale;
    const adjustedY = (y - stage.y()) / scale;
    // 固定标注点的半径
    const fixedRadius = 10;

    // 创建标注组
    const commentGroup = new Konva.Group({
        x: adjustedX,
        y: adjustedY,
        scaleX: 1,
        scaleY: 1,
        draggable: true,
    });
    
    // 创建评论框
    const commentBoxBg = new Konva.Circle({
        x: 0,
        y: 0,
        fill: 'yellow',
        radius: fixedRadius,
    });
    // 创建数字
    const commentBoxText = new Konva.Text({
        text: index.toString(),
        x: 0,
        y: 0,
        fontSize: 12,
        lineHeight: 1,
        fill: 'black'
    });
    // 设置文本的偏移量
    commentBoxText.offsetX(commentBoxText.width() / 2);
    commentBoxText.offsetY(fixedRadius / 2);

    // 将标注点放到标注组中
    commentGroup.add(commentBoxBg, commentBoxText)

    // 更新图层
    layer.add(commentGroup);
    layer.batchDraw();

    // 标注点缩放缓动
    const tween = new Konva.Tween({
        node: commentGroup,
        scaleX:1.6,
        scaleY:1.6,
        easing: Konva.Easings.EaseIn,
        duration: .2,
    });
    commentGroup.on('mouseover touchstart', function () {
        stage.container().style.cursor = 'pointer';
        // commentGroup.draw();
        tween.play()
    })
    commentGroup.on('mouseout touchend', function () {
        stage.container().style.cursor = "default";
        // commentGroup.draw();
        tween.reverse();
    });

    // 返回评论框组对象，以便在外部可以继续操作
    return commentGroup;
}

export default commentBox;