// DOM框架
const tpl = () => { 
    // 定义渲染容器
    const Box = [
        { name: "paintbrush" },
        { name: "cc" },
    ]

    // 引入
    let oApp = document.querySelector("#app") as HTMLElement;
    // 样式
    oApp.style.cssText = `  display:grid;
                            grid-gap: 40px;
                            grid-template-rows: repeat(auto-fill,300px);
                            grid-template-columns: repeat(auto-fill,300px);
                            padding: 40px;
                        `
    // 渲染
    Box.forEach((el) => { 
        let oDiv = document.createElement("div");
        let oCanvasDiv = document.createElement("div");
        let oCanvas = document.createElement("canvas");
        let oP = document.createElement("p");
        oDiv.className = `row rowcolumn align-center`
        oCanvasDiv.className = `${el.name} flex1 w-100\%`
        oCanvas.className = `border-radius-xl box-shadow-all w-100\%`
        oCanvas.width = 300
        oCanvas.height = 240
        oP.textContent = `${el.name}`
        oApp.appendChild(oDiv)
        oDiv.appendChild(oCanvasDiv)
        oCanvasDiv.appendChild(oCanvas)
        oDiv.appendChild(oP)
    })
    
}

export default tpl;