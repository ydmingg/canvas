import { CanvasRender } from "ui-canvas";

const init = (canvas: CanvasRender) => { 
    const defaultBtn = document.querySelector('[fxtag="view"]') as HTMLButtonElement;
    let bool = false

    defaultBtn.addEventListener('click', (e) => { 
        canvas.elementsVisible('Component_View', bool)
        bool = !bool
        
        
    })

}

export default init;