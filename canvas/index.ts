import Konva from "konva";

class init{
    node: HTMLDivElement;
    width: number;
    height: number
    
    // 创建画布
    const stage = new Konva.Stage({
        container: node,
        width: width,
        height:height
    });

    // 创建页面
    const layer1 = new Konva.Layer({
        id:"layer1",
        name: 'comment',
        x: stage.width() / 2 - width / 2,
        y: stage.height() / 2 - height / 2,
        width:stage.width() - 100,
        height: stage.height() - 100,
    });
    
    // 初始化konva
    stage.add(layer1);
}

export default init;