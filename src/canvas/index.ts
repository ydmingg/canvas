import canvas_base from "./base";
// 基础
export const index = () => { 
    // 创建一个canvas元素
    let oCanvas = document.createElement('canvas');
    let oInput = document.createElement('input');
    oCanvas.id = "canvas"
    oInput.id = "canvasInput"
    oInput.style.position = "absolute"
    oInput.type = "text"
    oCanvas.style.display = "block"
    oCanvas.style.border = "1px solid #ccc"
    oCanvas.textContent = "你的浏览器不支持canvas！"
    // 渲染canvas
    let app = document.querySelector("#app") as HTMLElement;
    app.append(oCanvas,oInput);
    

    //引入default
    canvas_base();

}   