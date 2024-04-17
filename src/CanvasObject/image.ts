import CanvasType from '../CanvasType'
import { CanvasRender } from '../CanvasRender'

// 导出舞台
export default class image { 
    image:any
    constructor(shapeType: CanvasType, render: CanvasRender) {
        if (!render.stage) return;
        const renderImg = render.image
        const allShapeImage = render.stage.find('.shapeImage')

        this.image = render.newImage({
            id: shapeType.id,
            title: `图片${allShapeImage?.length + 1}`,
            image: renderImg,
            name:"shapeImage",
            x: shapeType.style.x,
            y: shapeType.style.y,
            width: shapeType.style.width,
            height: shapeType.style.height,
            scaleX: shapeType.style.scaleX,
            scaleY: shapeType.style.scaleY,

        })

        render.group.add(this.image)

        
        
    }
    
    
}