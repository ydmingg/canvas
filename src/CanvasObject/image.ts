import { CanvasComponentsMap } from '../CanvasType'
import { newObject } from '../CanvasObject'
import { CanvasRender } from '../CanvasRender'

// 导出舞台
export default class image { 
    image:any
    constructor(shapeType: CanvasComponentsMap, render: CanvasRender,image:any) {
        if (!render.root_stage) return;
        const allShapeImage = render.root_stage.find('.shapeImage')
        
        this.image = newObject.image({
            id: shapeType.id,
            title: `图片${allShapeImage?.length + 1}`,
            image: image,
            name:shapeType.name?shapeType.name:"image",
            x: shapeType.x,
            y: shapeType.y,
            width: shapeType.width?shapeType.width:image.width,
            height: shapeType.height?shapeType.height:image.height,
            scaleX: shapeType.style.scaleX,
            scaleY: shapeType.style.scaleY,

            stroke: shapeType.style.borderColor,
            strokeWidth: shapeType.style.borderSize,

        })

        render.page.add(this.image)
        



        

        
        
    }
    
    
}