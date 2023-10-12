import Konva from "konva";
const init = ({ node, x, y, url}) => {    
    // 初始化值
    const iData = {
        small: 32,
        big: 52,
        padding:2
    }
    
    // 创建图片（模拟数据图片）
    let bgImg = new Image();
    bgImg.src = url

    function gitPosition(node:any) { 
        let transform = node.getAbsoluteTransform().copy();
        transform.invert();
        let pos = node.getStage().getPointerPosition();
        return transform.point(pos);
    }

    
    

    // 创建页面
    const layer = new Konva.Layer({
        name: 'comment',
        x: state.width() / 2 - width / 2,
        y: state.height() / 2 - height / 2,
    });

    // 创建矩形
    const rect1 = new Konva.Rect({
        x: x,
        y: Math.abs(y - iData.small),
        width: iData.small,
        height: iData.small,
        fill: "#fff",
        cornerRadius: [iData.big, iData.big, iData.big, 0],
        shadowOffset: { x: 0, y: 0 },
        shadowBlur: 5,
        shadowColor: '#111',
        shadowOpacity: 0.35,
    });

    state.add(layer)
    layer.add(rect1)

}

export default init;