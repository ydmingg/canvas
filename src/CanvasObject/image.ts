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
            name:"image",
            x: shapeType.params.x,
            y: shapeType.params.y,
            width: shapeType.params.width?shapeType.params.width:image.width,
            height: shapeType.params.height?shapeType.params.height:image.height,
            scaleX: shapeType.params.scaleX,
            scaleY: shapeType.params.scaleY,
            
            stroke: shapeType.params.borderColor,
            strokeWidth: shapeType.params.borderSize,

        })

        render.page.add(this.image)
        



        

        
        
    }
    
    
}