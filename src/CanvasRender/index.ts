import Konva from "konva";
import { CanvasComponentsMap, CanvasComponentsType } from "../CanvasType/index";
import { newObject,ObjectImage,ObjectMark } from '../CanvasObject'
import { Events,Others } from "../CanvasEvents";
import markEvents from "../CanvasMark";


export class CanvasRender { 
    app: HTMLDivElement //挂载点
    width: number   //视口宽度
    height: number  //视口高度
    scale: number  //设置缩放因子
    scale_by: { value: number; min: number; max: number } //基础缩放倍数为1.05,最小0.02，最大256
    root_stage: Konva.Stage | null 
    root_layer: Konva.Layer  
    // stage: Konva.Group // 舞台
    pageContent: Konva.Group // 内容页面
    pageMark: Konva.Group // 标注页面
    transformer: Konva.Transformer
    imgArr: Array<string> = [] // 存放图片
    // resizeTimer: any = null  // 刷新页面定时器
    // moveStatus: boolean = false // 设置画布移动状态
    startDragPosition: { x: number; y: number } | null = null; // 存储初始拖动位置
    startStagePosition: { x: number; y: number } | null = null; // 存储初始阶段位置
    mouseStagePosition: { x: number; y: number } | null = null; // 存储鼠标在舞台中的位置
    pinchStartDistance: number | null = null
    shapeAttrs: any[] = [] // 元素集合
    booleanZoom: boolean = false // 关闭舞台放大缩小（暂设）
    booleanDrag: boolean = false // 关闭画布移动状态
    
    
    constructor(app: HTMLDivElement, width: number, height: number) { 
        
        this.app = app    
        this.width = width
        this.height = height
        this.scale = 1
        this.scale_by = { value: 1.05, min: 0.02, max: 256 }
        this.root_stage = null
        this.root_layer = newObject.layer()
        // this.stage = newObject.group({ x: 0, y: 0 });
        this.pageContent = newObject.group({ x: 0, y: 0 })
        this.pageMark = newObject.group({ x: 0, y: 0 })
        this.transformer = newObject.transformer()
        this.init()
        // this.stage
        
    }

    // 初始化配置
    init() { 
        this.root_stage = newObject.stage({
            container: this.app,
            width: this.width,
            height: this.height,
            draggable: false,
            visible: false,
        })
        this.pageMark.setAttrs({
            title: "标注页面",
            name: "pageMark",
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        })
        //将标注页面和内容页面放入layer
        this.root_layer.add(this.pageMark, this.pageContent)
        
        this.pageMark.moveToTop()
        this.root_stage.add(this.root_layer)
        
        
        // 缩放事件
        this.root_stage.on('wheel', (e) => Events.Wheel(e, this))
        // 鼠标事件
        this.root_stage.on('mousedown touchstart', (e) => Events.mouseDown(e, this))
        this.root_stage.on('mousemove touchmove', (e) => Events.mouseMove(e, this));
        this.root_stage.on('mouseup touchend', () => Events.mouseUp(this))
        // this.root_stage.on('click tap', (e) => )
        this.root_stage.on('contextmenu', (e) => e.evt.preventDefault())
        
        // 键盘事件
        window.addEventListener('keydown', (e) => Events.KeyDown(e, this))
        window.addEventListener('keyup', (e) => Events.Keyup(e, this))
        window.addEventListener('load', (e) => { 
            // 自动化舞台大小
            
        })
    }

    // 加载图片
    loadImg = src =>{ 
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('图片地址错误！！！'))
            
        });
    }

    // 图片
    image(shapeType: CanvasComponentsMap,img) { 
        // const image = this.loadImg(shapeType.style.imageSrc!)
        // this.image.element = image;
        // this.image.width = image.width;
        // this.image.height = image.height;  
        
        const newImage = new ObjectImage(shapeType, this, img);
        // // this.shapeAttrs = shapeType
        // // console.log(shapeType);
        
        this.shapeAttrs.push(newImage.image.attrs)
    }
    // 标注
    mark(shapeType: CanvasComponentsMap) { 
        const newMark = new ObjectMark(shapeType, this);
        this.shapeAttrs.push(newMark.mark.attrs)

    }
    
    // 渲染
    
    render(data: CanvasComponentsMap[]) {
        for (const item of data) {
            if (item.type === "image") {
                this.imgArr.push(item.style.imageSrc!)
                // 加载所有的图片之后再进行渲染
                Promise.all(this.imgArr.map(src => this.loadImg(src))).then(arr => {
                    // console.log(arr);
                    
                    // this[`${item.type}`](item);
                    // // console.log(item.type === "image");
                    arr.forEach((e) => {
                        this.image(item, e)
                    })
                    

                    
                    Events.StageAutoSize(this)
                    markEvents.setSize(this)
                    
                });
            } else if (item.type === "mark") { 
                this.mark(item)
            }
            

            
            
        }

        
        
    }

    // const loadImg = src => {
    //     return new Promise((resolve, reject) => {
    //         const img = new Image();
     
    //         img.src = src;
     
    //         img.onload = ()=>void resolve(img);
    //         img.onerror = ()=>void reject('加载失败');
    //     });
    // };
     
    // const imgs = [
    //     'https://book.funxdata.com/public/applogo/ai.png',
    //     'https://book.funxdata.com/public/applogo/psd.png',
    // ];
     
    // Promise.all(imgs.map(src => loadImg(src))).then(arr => {
    //     console.log(arr);
    // });








    // 交互事件
    startDrag(startX: number, startY: number) { Others.startDrag(startX, startY, this) }
    appMoving(mouseX: number, mouseY: number) { Others.appMoving(mouseX, mouseY, this) }
    appEndDrag() { Others.appEndDrag(this) }
    deleteElements(id:string) { Others.deleteElements(id,this) }
    
    // 缩放画布
    getScale(num: number) { 
        this.booleanZoom = true
        if (!this.root_stage) return;
    
        // 计算新的缩放比例
        const newScale =  num;
        this.scale = num
        
        // 确保缩放在最小和最大值之间
        if (newScale < this.scale_by.min || newScale > this.scale_by.max) return;

        // 设置页面的缩放比例
        this.pageContent.scale({ x: newScale, y: newScale });
        const allElements = this.pageContent.getClientRect({ relativeTo: this.pageContent });

        const pageWidth = this.width; 
        const pageHeight = this.height; 
        // 计算元素总体积和偏移量
        const totalWidth = allElements.width;
        const totalHeight = allElements.height;
        const offsetX = allElements.x;
        const offsetY = allElements.y;
        const scaledOffsetX = offsetX * newScale;
        const scaledOffsetY = offsetY * newScale;

        
        // 计算偏移量，并在缩放后将元素居中
        const offsetXDiff = (pageWidth - totalWidth * newScale) / 2 - scaledOffsetX;
        const offsetYDiff = (pageHeight - totalHeight * newScale) / 2 - scaledOffsetY;
        this.pageContent.position({ x: offsetXDiff, y: offsetYDiff });
        
        // 重新绘制舞台
        this.root_stage.batchDraw();
    }
    

    // 获取UUID
    get UUID() {
        let d = Date.now()
        if (typeof performance !== "undefined" && typeof performance.now === 'function') {
          d += performance.now()
        }
        return 'xxxxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : r & 0x3 | 0x8).toString(16)
        })
    }


    
    // 内容页面
    get pageContenta(): Konva.Group{ 
        const x = 0
        const y = 0
        const width = this.width
        const height = this.height
        const bgColor = '#f6f6f6'
        const pageContent = newObject.group({
            id: "页面1",
            title: "页面1",
            name: "pageContent1",
            x: x, 
            y: y,
            width: width, 
            height: height, 
        })
        // this.pageConteniner.add(pageContent)

        return pageContent
    }
}