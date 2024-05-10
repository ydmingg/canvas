import { newObject } from '../src/CanvasObject'

export const lt = (canvas, render) => { 
    render.then(() => { 
        const popout = document.querySelector(".scale") as HTMLInputElement
            
        // 变化的属性
        canvas.shapeAttrs.forEach(element => {
            const shape = canvas.root_stage.findOne(`#${element.id}`)
            let { id, title, opacity, fill, stroke, strokeWidth, width, height, x, y, scaleX, scaleY, type, radius } = element

            if (!width || !height || !scaleX || !scaleY) return
            
            width = 65
            height = Math.round(height/scaleY)
            shape.setAttrs({ id, title, opacity, fill, stroke, strokeWidth, width, height, x, y, scaleX, scaleY, type })
            
            
            
            
        });
       
        
    
    
    })
}