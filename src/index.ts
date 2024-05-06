import Konva from "konva";
import { CanvasRender } from "../index";
import { code } from "../code/index";

const app = document.querySelector(".app-canvas") as HTMLDivElement
const { clientWidth, clientHeight } = app

// 实例化CanvasRender
const canvas = new CanvasRender(app, clientWidth, clientHeight);

// const src1 = "https://book.funxdata.com/public/img/showroom/3d.png"
const src1 = "https://book.funxdata.com/public/applogo/ai.png"
const src2 = "https://book.funxdata.com/public/applogo/psd.png"

// 外部数据
let data = [
    {
        id: "01",
        type: "Component_View",
        // title: '图片',
        params: {
            imageSrc: src1,
            draggable: true,
            
        }
    },
    // {
    //     id: "02",
    //     type: "Component_View",
    //     // title: '图片',
    //     params: {
    //         imageSrc: src2,
    //         x: 200,
    //         y: 200
    //     }
    // },
    {
        id: "010",
        type: "Component_Comment",
        // title: "标注图形",
        params: {
            x: 40,
            y: 40
        }
    },
    {
        id: "010",
        type: "Component_Comment",
        // title: "标注图形",
        params: {
            x: 120,
            y: 120
        }
    }
    
]

// 渲染元素
const render = canvas.render(data)

// 渲染dom
code(canvas,render);