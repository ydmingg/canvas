// DOM框架
const tpl = () => { 
    // 定义渲染容器
    const Box = [
        { name: "paintbrush" },
        { name: "pen" },
        { name: "square" },
        { name: "circle" },
        { name: "polygon" },
        { name: "stellate" },
        { name: "image" },
        { name: "text" },
        { name: "container" },
    ]

    // 引入
    let oApp = document.querySelector("#app") as HTMLElement;
    // 样式
    oApp.style.cssText = `  overflow: hidden auto; 
                            display:grid;
                            grid-gap: 40px;
                            grid-template-rows: repeat(auto-fill,300px);
                            grid-template-columns: repeat(auto-fill,300px);
                            padding: 40px;
                            user-select:none;
                        `
    // 渲染
    Box.forEach((el) => { 
        // 创建元素
        let oDiv = document.createElement("div");
        let oCanvasDiv = document.createElement("div");
        let oCanvas = document.createElement("canvas");
        let oP = document.createElement("p");
        // 定义样式
        oDiv.style.minHeight = "300px"
        oDiv.className = `row rowcolumn align-center`
        oCanvasDiv.className = `${el.name} flex1 w-100\% mb-12`
        oCanvas.className = `border-radius-xl box-shadow-all w-100\%`
        oP.textContent = `${el.name}`
        // 渲染
        oApp.appendChild(oDiv)
        oDiv.appendChild(oCanvasDiv)
        oCanvasDiv.appendChild(oCanvas)
        oDiv.appendChild(oP)
        // 继承父容器大小
        oCanvas.width = oCanvasDiv.clientWidth
        oCanvas.height = oCanvasDiv.clientHeight
    })
    
}

export default tpl;