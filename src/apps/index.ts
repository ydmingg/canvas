import * as home from "./home/index";
const index = () => { 
    let app = document.querySelector("#app") as HTMLElement;
    app.style.padding = "80px"
    app.style.height = "100vh"
    app.className = "row align-center justify-center";
    
    //模拟画布容器
    let oCanvas = document.createElement('canvas');
    oCanvas.id = "canvas"
    oCanvas.width = 500
    oCanvas.height = 500
    oCanvas.style.border = "1px solid #ccc"
    oCanvas.textContent = "你的浏览器不支持canvas！"
    // 渲染canvas
    app.appendChild(oCanvas);

    // 渲染canvas方法
    home.pages();
    
}

export default {
    index
}