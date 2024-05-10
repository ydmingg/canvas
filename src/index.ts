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

// 外部图片数据
let data1 = [
    {
        id: "001",
        type: "image",
        style: {
            imageSrc: src1,
            draggable: true,
            
        }
    },
    {
        id: "001",
        type: "image",
        x: 200,
        y: 200,
        style: {
            imageSrc: src2,
        }
    },
]

// 外部标注数据
let data2 = [
    {
        id: "001",
        type: "mark",
        x: 40,
        y: 40,
        style: {}
    },
    {
        id: "002",
        type: "mark",
        x: 120,
        y: 120,
        style: {}
    }
    
]

let data = [...data1,...data2]

// 渲染元素（只能就行一次）
canvas.render(data)

// 渲染dom
// code(canvas, render);
// console.log(canvas.root_layer.children);


canvas.pageContent.add(canvas.pageContenta)


//



