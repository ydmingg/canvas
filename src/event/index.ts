import { CanvasRender } from "ui-canvas";

const init = (canvas: CanvasRender) => { 
    const viewBtn = document.querySelector('[fxtag="view"]') as HTMLButtonElement;
    const sizeBtn = document.querySelector('[fxtag="size"]') as HTMLButtonElement;
    let bool = false

    // 显示隐藏
    viewBtn.addEventListener('click', (e) => { 
        canvas.elementsVisible('Component_View', bool)
        bool = !bool
    })

    // 缩放比例
    // console.log();
    
    window.addEventListener('load', (e) => { 
        sizeBtn.innerHTML = Math.round(canvas.scale * 100) + "%";
    })



}

export default init;