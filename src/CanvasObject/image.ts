import CanvasType from '../CanvasType'
import { CanvasRender } from '../CanvasRender'

// 导出舞台
export default class image { 
    image:any
    constructor(shapeType: CanvasType, render: CanvasRender,image:any) {
        if (!render.stage) return;
        const allShapeImage = render.stage.find('.shapeImage')
        
        this.image = render.newImage({
            id: shapeType.id,
            title: `图片${allShapeImage?.length + 1}`,
            image: image,
            name:"Image",
            x: shapeType.params.x,
            y: shapeType.params.y,
            width: shapeType.params.width,
            height: shapeType.params.height,
            scaleX: shapeType.params.scaleX,
            scaleY: shapeType.params.scaleY,
            
            stroke: shapeType.params.borderColor,
            strokeWidth: shapeType.params.borderSize,

        })

        render.group.add(this.image)



        

        
        
    }
    
    
}