import Konva from "konva";
import { CanvasRender } from "../index";

const app = document.querySelector("#app") as HTMLDivElement
const { clientWidth, clientHeight } = app

// 实例化CanvasRender
const canvas = new CanvasRender(app, clientWidth, clientHeight);

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
        style: {
            imageSrc: src1,
            draggable: true,
            
        }
    },
    {
        id: "03",
        type: "Component_View",
        // title: '图片',
        style: {
            imageSrc: src2,
            x: 200,
            y: 200
        }
    },
    
]


canvas.render(data)

// canvas.scale = 0.1
// canvas.moveStatus = true
// console.log(canvas.stage?.scale());
// document.addEventListener('click', () => { 

//     canvas.scaleStage(0.5)
    
    

// })


// 初始化
// window.onresize = () => { 
//     canvas.onresize()
// }





// console.log(canvas);










// canvas.render(imgData)


// canvas.deleteElements("01")

// 设置图片初始值
// async function mapToLoadElement(url) { 
//     let image = await asyncLoadImage(url)
//     console.log(image);
    
// }


// // 创建图片
// function asyncLoadImage(url) { 
//     return new Promise((resolve, reject) => { 
//         let image = new Image();
//         image.src = url
//         image.onload = () => resolve(image)
//         image.onerror = ()=>reject(new Error("图片地址错误！"))
    
//     })
// }

// // 异步加载
// async function start(url) { 
//     await mapToLoadElement(url)
    
// }


// // 传入地址
// start(src1);








 





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













// const DEFAULT_SET = {
//     stage: {
//         obj: null,
//         width: 0,
//         height: 0,
//         scale: 1,
//     },
//     layer: {
//         obj: null,
//         width: 0,
//         height: 0,
//         x: 0,
//         y: 0,
//     },
//     group: {
//         obj: null,
//         width: 0,
//         height: 0,
//         scaleX: 1,
//         scaleY: 1,
//     },
//     image: {
//         obj: null,
//         element: null,
//         width: 0,
//         height: 0,
//     },
// }



// const cloneOf = (obj: any) => {
//     return JSON.parse(JSON.stringify(obj));
// }

// export class CanvasRender {
//     el: HTMLDivElement; 
//     width: number;
//     height: number;
//     stage: any = {};
//     layer: any = {};
//     group: any = {};
//     image: any = {};

    

//     constructor( el: HTMLDivElement,width:number,height:number ) {
//         // 初始化CanvasRender实例
//         this.el = el
//         this.width = width
//         this.height = height
        
//     }

//     initStage() { 
//         this.stage = cloneOf(DEFAULT_SET.stage)
//         this.layer = cloneOf(DEFAULT_SET.layer)
//         this.group = cloneOf(DEFAULT_SET.group)
//         this.image = cloneOf(DEFAULT_SET.image)
//     }

//     // 初始化stage
//     mapToStage() { 
//         let stage = new Konva.Stage({
//             container: this.el,
//             width: this.width,
//             height: this.height,
//             scaleX: 1,
//             scaleY: 1,
    
//         })

//         this.stage.obj = stage
//         this.stage.width = this.width
//         this.stage.height = this.height
        
        
//         this.stage.scale = 1
        
//     }
//     // 初始化layer
//     mapToLayer() { 
//         let { obj:stage } = this.stage
//         let layer = new Konva.Layer()

//         stage.add(layer)
//         this.layer.obj = layer
//     }
//     // 初始化Group
//     mapToGroup() { 
//         let { obj:layer } = this.layer
//         let group = new Konva.Group({
//             width:100,
//             height:100,
//         })
//         layer.add(group)
//         this.group.width = 300
//         this.group.height = 300
//         this.group.obj = group

//     }
//     // 初始化图片
//     mapToShapeImage() { 
//         let { element } = this.image
//         let { width, height } = this.group
        
        
//         let image = new Konva.Image({
//             image: element,
//             width: width,
//             height: height,
//             draggable: true,
//         });
        
//         this.group.obj.add(image);
//         this.image.obj = image;
//         // console.log(this.image.obj);

//     }
//     // 
//     async initImage(url:string) { 
//         let image: any = await this.asyncLoadImage(url)
//         this.image.element = image;
//         this.image.width = image.width;
//         this.image.height = image.height;
        

//     }
//     asyncLoadImage(url: string) { 
//         return new Promise((resolve, reject) => {
//             var image = new Image();
//             image.src = url;
            
//             image.onload = () => resolve(image)
//             image.onerror = () => reject(new Error('图片地址错误！！！'))
            
//         });
//     }
      

//     async start(url) { 
//         this.initStage()
//         await this.initImage(url)
//         this.mapToStage()
//         this.mapToLayer()
//         this.mapToGroup()
//         this.mapToShapeImage()

//         console.log(this.layer);
        
//     }


//     render(data:CanvasType[]) { 
//         let shapes;
//         data.forEach((item:CanvasType) => { 
//             if (item.type === "Component_View") { 
                
                
//             }
//         })
//     }


//     // async render(data:CanvasType[]) { 
//     //     // data.forEach((item: CanvasType) => { 
//     //     //     this.start(item.style.imageSrc)
//     //     // })
//     //     for (const item of data) {
//     //         await this.start(item.style.imageSrc);

            
//     //     }
    
        
//     // }
    
// }