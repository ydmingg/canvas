import Konva from 'konva';
// 定义 Comment 类型
interface Comment {
  box: Konva.Circle | Konva.Group;
}

const commentBox = (stage: Konva.Stage, layer: Konva.Layer, comments: Comment[], x: number, y: number): void => { 
  // 获取当前画布的缩放因子
  const scale = stage.scaleX();
  // 计算缩放后的坐标
  const adjustedX = (x - stage.x()) / scale;
  const adjustedY = (y - stage.y()) / scale;

  // 创建评论框
  const commentBox = new Konva.Circle({
    x: adjustedX,
    y: adjustedY,
    fill: 'yellow',
    radius: 10,
    draggable: true,
  });
  // 添加类名
  commentBox.setAttr('class', 'commentBox');
  // 添加自定义属性存储半径信息
  commentBox.setAttr('originalRadius', 10);

  // 将评论框和评论文本添加到图层
  layer.add(commentBox);
  
  // 更新图层
  layer.batchDraw();

  // 标注点缩放缓动
  const tween = new Konva.Tween({
    node: commentBox,
    scaleX:1.6,
    scaleY:1.6,
    easing: Konva.Easings.EaseIn,
    duration: .2,
  });
  commentBox.on('mouseover touchstart', function (el) {
    stage.container().style.cursor = 'pointer';
    commentBox.draw();
    tween.play()
  })
  commentBox.on('mouseout touchend', function (el) {
    stage.container().style.cursor = "default";
    commentBox.draw();
    tween.reverse();
  });


  // 创建评论文本
  //   const commentText = new Konva.Text({
  //     x: x + 5,
  //     y: y + 5,
  //     text,
  //     fontSize: 14,
  //     fill: 'black',
  //   });


  //   layer.add(commentText);

  // 将评论保存到数组中
    comments.push({ box: commentBox});

  // 更新图层
  // layer.draw();

    
    
}

export default commentBox;