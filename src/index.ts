import Konva from "konva";
import { CanvasRender } from "../index";

const app = document.querySelector("#app") as HTMLDivElement
const { clientWidth, clientHeight } = app

// 实例化CanvasRender
const canvas = new CanvasRender(app, clientWidth, clientHeight);

// const src1 = "https://book.funxdata.com/public/img/showroom/3d.png"
const src1 = "https://book.funxdata.com/public/applogo/ai.png"
const src2 = "https://book.funxdata.com/public/applogo/psd.png"

// 动态数据
// const imageData = [
    
//     {
//         type: "Component_View",
//         params: {
//             id: "image1",
//             // title: "图片",
//             // x: 100,
//             // y: 100,
//             imageSrc: src,
//             // width: 100,
//             // height: 50,
//             // draggable: false,

//         }
//     },
//     // {
//     //     type: "Rect",
//     //     params: {
//     //         id: "Rect1",
//     //         title: "图形2",
//     //         x: 200,
//     //         y: 200,
//     //         width: 600,
//     //         height: 300,
//     //         fill: "green",
//     //         draggable: true,
            
//     //     }
//     // },
    
// ]

// // 根据Data绘制一个图形
// canvas.render(imageData)

// let commentData = [
//     {
//         id: "01",
//         title: 2,
//         type: "Component_Comment",
//         style: {
//             x: 200,
//             y: 200
//         }
//     }
// ]
// canvas.render(commentData)

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
    {
        id: "02",
        type: "Component_View",
        // title: '图片',
        params: {
            imageSrc: src2,
            x: 200,
            y: 200
        }
    },
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




canvas.render(data).then(() => { 
        // canvas.scale = .2
    // console.log(canvas.scale);
    xx.innerHTML = Math.round(canvas.scale * 100) + "%"
    canvas.deleteElements('02')
    
    
})

canvas.app.addEventListener('click', () => { 
    console.log(canvas.mouseStagePosition);
})




let xx = document.querySelector("#popout") as HTMLDivElement



// 缩放舞台方法
// canvas.scaleStage(.2)
// Render.then(()=>{
//     // canvas.scale = .2
//     // console.log(canvas.scale);
//     xx.innerHTML = Math.round(canvas.scale * 100) + "%"
//     canvas.deleteElements('02')
    
// })

// console.log(canvas.scale);












// canvas.scale = 2


// window.addEventListener('click', () => {
//     scale -= 0.1
    
//     canvas.scaleStage(scale)
    
// })

// const scales = canvas.getScale();
// console.log(scales);



 





// let clickIdx = 0;
// // 渲染坐标点
// for (let i = 0; i < 10; i++) {
//     clickIdx = i
//     const commentArr = [
//         {
//             type: "Component_Comment",
//             params: {
//                 id: "comment" + 1,
//                 title: clickIdx,
//                 x: i*30,
//                 y: i*10
//             }
//         } 
//     ]
    
//     canvas.render(commentArr)
//     // canvas.isCommentClickBool = true

    
// }

// // // 打点
// let oCanvas = app.querySelector('canvas') as HTMLElement;

// oCanvas.addEventListener('click', (e) => { 
//     let commentData = [
//         {
//             id: "01",
//             title: 2,
//             type: "Component_Comment",
//             style: {
//                 x: canvas.x,
//                 y: canvas.y
//             }
//         }
//     ]
    
//     canvas.render(commentData)

//     // 当前舞台缩放比例：
//     console.log("舞台缩放比例：", Math.round((canvas.scale * 100)) + "%");
//     canvas.deleteElements("comment1")
    
// })


// console.log("舞台缩放比例：", Math.round((canvas.scale * 100)) + "%");



// 
// import CanvasRenders from "./init";
// const cc = new CanvasRenders(app, clientWidth, clientHeight)

// const data_group = {
//     id: "group1",
//     name: "group1",
//     x: 10,
//     y: 10,
//     width: 100,
//     height: 100,
//     fill: '#ccc',

// }
// const data_shape = {
//     id: 'shape1',
//     name: "shape1",
//     type: "shape1",
//     title: 2,
//     x: 10,
//     y: 10,
//     width: 10,
//     height: 10,
//     fill: 'red',

// }

// for (let i = 0; i < 10; i++) {
//     // 修改group参数
//     // data_group.id = "group" + i
//     data_group.x = 10 * i
//     data_group.y = 10 * i
    
//     cc.addGroup("group",data_group, "layer1" )
    
// }

// 

// cc.addGroup("shape", data_shape, "group1")

// console.log(cc.stage, cc.layer);
// console.log(cc.arr);

// cc.addGroup("shape", data_shape, "group1")

// for (let i = 0; i < 10; i++) {
//     // 修改shape参数
//     data_shape.id = "shape" + (10 + i)
//     data_shape.x = 10 * i
//     data_shape.y= 10 * i

//     cc.addGroup("shape", data_shape, "group1")
    
// }

// // 在layer1中添加一个新的组
// cc.addGroup("group", data_group, "#layer1")

// // 在layer1中添加一个新的图形
// cc.addGroup("shape", data_group, "#layer1")


// // 在layer1中的group1里添加一个新的组
// cc.addGroup("group", data_shape, "#group1")

// // 在layer1中的group1里添加一个新的图形
// cc.addGroup("shape", data_shape, "#group1")


// // 打点

// let oCanvas = app.querySelector('canvas') as HTMLElement;

// // canvas.isCommentClickBool = true

// function change(clickIdx:number) { 
//     if (clickIdx === 20) { canvas.isCommentClickBool = true };
//     // console.log(clickIdx);
//     let commentData = [
//         {
//             type: "Component_Comment",
//             params: {
//                 id: "01",
//                 title: clickIdx,
//                 x: canvas.x,
//                 y: canvas.y
//             }
//         }
//     ]
    
//     canvas.render(commentData)



//     // 当前舞台缩放比例：
//     console.log("舞台缩放比例：",Math.round(canvas.scale * 100) + "%");
// }

// oCanvas.addEventListener('click', change);



// function isPhone() {
//     // 检测环境
//     let mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
//     return mobile!= null
// }
// let startX,startY;
// oCanvas.addEventListener('touchstart', function(event) {
//     startX = event.touches[0].clientX;
//     startY = event.touches[0].clientY;
    
    
//   });
// oCanvas.addEventListener('touchend', (e) => { 
//     let endX = e.changedTouches[0].clientX;
//     let endY = e.changedTouches[0].clientY;
    
    
//     // if (Math.abs(endX - startX) > 10 && Math.abs(endY - startY) > 10) return;
//     // console.log(2333333333333);
    
    
    
// });

// console.log('当前浏览器环境：', isPhone() ? '移动' :'pc');

// // 
// let bool = true;
// let isDragging = false;

// canvas.stage.on('touchstart', function (event) { 
//     // 在拖拽结束时重置状态

//     canvas.stage.on('touchmove', function() {
//         isDragging = true;
//         // 在拖拽结束时重置状态
//         canvas.stage.on('touchend', function() {
//             isDragging = false;
//         });
//     });
    
// })




// canvas.stage.on(isPhone() ? 'tap' : 'click', () => { 
//     if (!isDragging) { 
//         clickIdx++
    
//         change(clickIdx);

//         // 隐藏显示评论（false：隐藏，true：显示）
//         canvas.elementsVisible('Component_Comment', bool)

//         if (clickIdx === 20 ) { 
//             // 移除
//             canvas.clearElements('Component_Comment');
//             clickIdx = 1
//         }

//         bool =! bool
//     }

// })



// canvas.isCommentClickBool = false;

// canvas.elementsVisible('Component_Comment', false)

// canvas.clearElements('Component_Comment');


// const data = {
//     layer: [
//         {
//             id: 'layer1',
//             name: 'Layer 1',
//             fill: 'white',
//             groups: [
//                 {
//                     id: "group1",
//                     name: "group1",
//                     params: {
//                         fill: 'white',
//                     },
//                     shapes: [
//                         {
//                             id: 'Component_Comment1',
//                             name: "Component_Comment1",
//                             type: "Component_Comment",
//                             params: {
//                                 title: 2,
//                                 x: canvas.x,
//                                 y: canvas.y
//                             }
//                         }
//                     ]   
//                 }
//             ] 
//         }
//     ]

// }

// const layer = new Konva.Layer()
// canvas.stage.add(layer)



// console.log(canvas);



// for (let i = 0; i < 10; i++) {
//     let elements = {
//         type: "Component_Comment",
//         params: {
//             id: "comment" + 1,
//             title: i,
//             x: 30,
//             y: 10
//         }
//     } 

//     elementRander("elements", elements, "start")
// }



// for (let i = 0; i < 10; i++) {
//     let elements:any = {
//         id: 'layer' + i,
//         name: 'Layer' + i,
//         fill: 'white',
//     } 

//     data.layer.push(elements)
    
// }


// canvas.render(data);
// const data = {
//     layer: [
//         {
//             id: 'layer1',
//             name: 'Layer 1',
//             fill: 'white',
//             groups: [
//                 {
//                     id: "group1",
//                     name: "group1",
//                     params: {
//                         fill: 'white',
//                     },
//                     shapes: [
//                         {
//                             id: 'Component_Comment1',
//                             name: "Component_Comment1",
//                             type: "Component_Comment",
//                             params: {
//                                 title: 2,
//                                 x: canvas.x,
//                                 y: canvas.y
//                             }
//                         }
//                     ]   
//                 }
//             ] 
//         }
//     ]

// }

// const data_group = {
//     id: "group1",
//     name: "group1",
//     style: {
//         title: "w",
//         x: 30,
//         y: 10
//     }
// }
// const data_shape = {
//     id: 'Component_Comment1',
//     name: "Component_Comment1",
//     type: "Component_Comment",
//     params: {
//         title: 2,
//         x: canvas.x,
//         y: canvas.y
//     }
// }

// const canvas = new CanvasRender(app, clientWidth, clientHeight);
// canvas.rander(data)

// // 创建layer
// canvas.addLayer(layer.id)

// // 创建组或者图形
// canvas.addGroup("group", data_group, layer2.id)
// canvas.addShape("shape", data_shape, layer2.id)

// // 创建组或者图形
// canvas.addGroup("group", data_group, group2.id)
// canvas.addShape("shape", data_shape, group2.id)



// canvas.render(data)

