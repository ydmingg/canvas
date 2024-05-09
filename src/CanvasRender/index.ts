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
    stage: Konva.Group // 舞台
    mark_group: Konva.Group // 初始化标注层
    transformer: Konva.Transformer
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
        this.stage = newObject.group({ x: 0, y: 0 });
        this.mark_group = newObject.group({ x: 0, y: 0 })
        this.transformer = newObject.transformer()
        this.init()
        this.stage
        
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
         //     const x = 0
    //     const y = 0
    //     const width = this.width
    //     const height = this.height
    //     const bgColor = '#f6f6f6'
    //     const stage = newObject.group({
    //         id: this.UUID,
    //         title: "页面1",
    //         name: "page",
    //         x: x, 
    //         y: y,
    //         width: width, 
    //         height: height, 
    //     })
    //     const stage_bg = new Konva.Rect({
    //         x: stage.x(), 
    //         y: stage.y(),
    //         width: stage.width(), 
    //         height: stage.height(), 
    //         fill: bgColor
    //     });
    //     stage.add(stage_bg);
    //     this.root_layer.add(stage)
    //     stage.moveToBottom();
    //     stage_bg.moveToBottom();
    //     return stage

        this.stage.setAttrs({
            id: this.UUID,
            title: "页面1",
            name: "page",
            x: 0, 
            y: 0,
            width: this.width, 
            height: this.height, 
        })
        const stage_bg = new Konva.Rect({
            x: this.stage.x(), 
            y: this.stage.y(),
            width: this.stage.width(), 
            height: this.stage.height(), 
            fill: "red"
        });
        this.stage.add(stage_bg);
        this.root_layer.add(this.stage)
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
    asyncLoadImage(url: string) { 
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('图片地址错误！！！'))
            
        });
    }

    // 渲染图片
    async Component_View(shapeType: CanvasComponentsMap) { 
        if (!shapeType.params.imageSrc) return;
        const image = await this.asyncLoadImage(shapeType.params.imageSrc)
        // this.image.element = image;
        // this.image.width = image.width;
        // this.image.height = image.height;   
        const Img = new ObjectImage(shapeType, this, image);
        // // this.shapeAttrs = shapeType
        // // console.log(shapeType);
        
        this.shapeAttrs.push({
            attrs: Img.image.attrs,
            element: Img.image
        })
        
        return Img;
    }
    // 标注
    async Component_Comment(shapeType: CanvasComponentsMap) { 
        const Mark = new ObjectMark(shapeType, this);
        this.shapeAttrs.push({
            attrs: Mark.mark.attrs,
            element: Mark.mark
        })

    }
    
    // 渲染
    async render(data: CanvasComponentsMap[]) { 
        for (const item of data) {
            await this[`${item.type}`](item);
        }

        Events.StageAutoSize(this)
        markEvents.setSize(this)
        
    }


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
        this.page.scale({ x: newScale, y: newScale });
        const allElements = this.page.getClientRect({ relativeTo: this.page });

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
        this.page.position({ x: offsetXDiff, y: offsetYDiff });
        
        // 重新绘制舞台
        this.root_stage.batchDraw();
    }
    

    // 重绘
    // resize() {
    //     if (!this.root_stage) return;
    //     this.init();
    //     Events.StageAutoSize(this)
    //     this.root_stage.draw();
    // }

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
    // 创建舞台
    // get stage(): Konva.Group{ 
    //     const x = 0
    //     const y = 0
    //     const width = this.width
    //     const height = this.height
    //     const bgColor = '#f6f6f6'
    //     const stage = newObject.group({
    //         id: this.UUID,
    //         title: "页面1",
    //         name: "page",
    //         x: x, 
    //         y: y,
    //         width: width, 
    //         height: height, 
    //     })
    //     const stage_bg = new Konva.Rect({
    //         x: stage.x(), 
    //         y: stage.y(),
    //         width: stage.width(), 
    //         height: stage.height(), 
    //         fill: bgColor
    //     });
    //     stage.add(stage_bg);
    //     this.root_layer.add(stage)
    //     stage.moveToBottom();
    //     stage_bg.moveToBottom();
    //     return stage
    // }
    //
    get page(): Konva.Group{ 
        const x = 0
        const y = 0
        const width = this.width
        const height = this.height
        const bgColor = '#f6f6f6'
        const page = newObject.group({
            id: this.UUID,
            title: "页面1",
            name: "page",
            x: x, 
            y: y,
            width: width, 
            height: height, 
        })

        this.stage.add(page)

        this.stage.moveToBottom();

        return page
    }
}