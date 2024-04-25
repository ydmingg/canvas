import CanvasType from '../CanvasType'
import { CanvasRender } from '../CanvasRender'

// 标注组件
export default class mark { 
    mark: any
    constructor(shapeType:CanvasType,render:CanvasRender) { 
        this.marks(shapeType, render)
        
        render.group.add(this.mark)
    }

    // 创建标注形状
    marks(shapeType:CanvasType, render:CanvasRender) { 
        this.mark = render.newGroup({
            id: shapeType.id,
            name: "mark",
            obj:this.mark,
            x: shapeType.params.x,
            y: shapeType.params.y,
            scaleX: 1,
            scaleY: 1,
            draggable: true,
        })

        // 创建圆
        const circle = render.newCircle({
            x: 0,
            y: 0,
            fill: 'rgba(255, 255, 0, 0.3)',
            stroke: 'rgba(0, 0, 0, 0.06)',
            strokeWidth: 1,
            radius: 18,
            shadowColor: '#000', // 阴影颜色
            shadowBlur: 5,       // 阴影模糊度
            shadowOffset: {       // 阴影偏移
                x: 0,
                y: 0
            },
            shadowOpacity: 0.22,    // 阴影透明度
        });


        // 创建文本
        const text = render.newText({
            text: 1,
            x: 0,
            y: 0,
            fontSize: 16,
            lineHeight: 1,
            fill: 'black'
        });


        // 将circle和text放在mark中
        this.mark.add(circle, text);

        // 计算圆的中心坐标
        const circleCenterX = circle.x();
        const circleCenterY = circle.y();
        // 获取文本的宽度和高度
        const textWidth = text.width();
        const textHeight = text.height();   
        // 设置text的偏移量
        text.position({
            x: circleCenterX - textWidth / 2,
            y: circleCenterY - textHeight / 2
        });
        
        
        
    }


}