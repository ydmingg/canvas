import { CanvasRender } from "ui-canvas";

const init = (canvas: CanvasRender) => { 
    const src = "https://static.funxdata.com/2023/12/28/3d482287a2bf4f4c9d5ec19a4ff7449d.png"

    // 渲染图形
    const data = [
        {
            type: "Component_View",
            params: {
                id: "image1",
                // title: "图片",
                // x: 100,
                // y: 100,
                imageSrc: src,
                // width: 100,
                // height: 50,
                // draggable: false,

            }
        },
    ]

    canvas.render(data)
}

export default init;