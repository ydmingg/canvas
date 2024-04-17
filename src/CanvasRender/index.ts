import Konva from "konva";
import CanvasType from "../CanvasType/index";
import { ObjectImage } from '../CanvasObject'
import { Events,Others } from "../CanvasEvents";


export class CanvasRender { 
    app: HTMLDivElement //挂载点
    width: number   //视口宽度
    height: number  //视口高度
    scale: number  //设置缩放因子
    scale_by: { value: number; min: number; max: number } //基础缩放倍数为1.05,最小0.02，最大256
    stage: Konva.Stage | null
    layer: Konva.Layer
    group: Konva.Group
    image: CanvasImageSource | undefined
    resizeTimer: any = null  // 刷新页面定时器
    moveStatus: boolean = false // 设置画布移动状态

    // docMouseMove:(e: any) => void
    // curLayout: any = { zoom: 1, offsetX: 0, offsetY: 0 } // 当前布局
    startDragPosition: { x: number; y: number } | null = null; // 存储初始拖动位置
    startStagePosition: { x: number; y: number } | null = null; // 存储初始阶段位置
    pinchStartDistance: number | null = null
    shapeAttrs: any[] = [] 
    scaleBool:boolean = false



    constructor(app: HTMLDivElement, width: number, height: number) { 
        this.app = app    
        this.width = width
        this.height = height
        this.scale = 1
        this.scale_by = { value: 1.05, min: 0.02, max: 256 }
        this.stage = null
        this.layer = this.newLayer()
        this.group = this.newGroup({ x: 0, y: 0 })
        this.init()

        // this.docMouseMove = (e) => {
        //     let { x, y } = this.app.getBoundingClientRect()
        //     x = e.clientX - x
        //     y = e.clientY - y
        //     let point = this.pointMapping({ x, y })
        //     // let event: any = { x, y }
        //     // if (e.target) event.origin = { target: e.target }
        //     // event.buttons = e.buttons
        //     // event.spaceKey = this.moveStatus
        //     Others.startDrag1(e,this)
        // }
        // this.app.addEventListener('mousemove', this.docMouseMove)
        
    }
    
    


    // 初始化配置
    init() { 
        this.stage = this.newStage({
            container: this.app,
            width: this.width,
            height: this.height,
            draggable: false,
            visible: false,
        })
        this.layer.add(this.group)
        this.stage.add(this.layer)
        
    }

    // 初始化事件
    initEvents() { 
        if (!this.stage) return;
        
        // 缩放事件
        this.stage.on('wheel', (e) => Events.Wheel(e, this))
        
        // 鼠标事件
        this.stage.on('mousedown touchstart', (e) => Events.mouseDown(e, this))
        this.stage.on('mousemove touchmove', (e) => Events.mouseMove(e, this));
        this.stage.on('mouseup touchend', () => Events.mouseUp(this))
        this.stage.on('click tap', (e) => Events.mouseClick(e,this))
        
        // 键盘事件
        window.addEventListener('resize', (e) => Events.Resize(this))
        window.addEventListener('keydown', (e) => Events.KeyDown(e, this))
        window.addEventListener('keyup', (e) => Events.Keyup(e, this))
    }

    /** 计算相对底图的坐标点位 */
    // pointMapping(point) {
    //     // 新的点位
    //     let newPoint = { x: 0, y: 0 }
        
    //     // 还原偏移缩放
    //     newPoint.x = (point.x - this.curLayout.offsetX) / this.curLayout.zoom
    //     newPoint.y = (point.y - this.curLayout.offsetY) / this.curLayout.zoom
    //     // 返回
    //     return newPoint

    // }

    

    // 渲染图片
    async Component_View(shapeType: CanvasType) { 
        if (!shapeType.style.imageSrc) return;
        
        let image = await this.asyncLoadImage(shapeType.style.imageSrc) as CanvasImageSource
        // this.image.element = image;
        // this.image.width = image.width;
        // this.image.height = image.height;
        this.image = image        
        const img = new ObjectImage(shapeType, this)
        // this.shapeAttrs = shapeType
        // console.log(shapeType);
        this.shapeAttrs.push(img.image.attrs)        
        
        return img;
    }
    asyncLoadImage(url: string) { 
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('图片地址错误！！！'))
            
        });
    }
    // 渲染
    async render(data: CanvasType[]) { 
        for (const item of data) {
            await this[`${item.type}`](item);
        }
        // 加载事件方法
        this.initEvents()
        Events.StageAutoSize(this)
        
    }

    // 
    startDrag(startX: number, startY: number) { Others.startDrag(startX, startY, this) }
    appMoving(mouseX: number, mouseY: number) { Others.appMoving(mouseX, mouseY, this) }
    appEndDrag() { Others.appEndDrag(this) }

    //
    newStage(data: Konva.StageConfig) { return new Konva.Stage(data) }
    newLayer() { return new Konva.Layer() }
    newGroup(data: Konva.NodeConfig) { return new Konva.Group(data) }
    newRect(data: Konva.NodeConfig) { return new Konva.Rect(data) }
    newImage(data: Konva.ImageConfig) { return new Konva.Image(data) }
    
    // 缩放画布
    scaleStage(num:number) { 
        this.scaleBool = true
        this.scale = num
        Events.StageAutoSize(this)
    }

    // 重绘
    resize() { 
        if (!this.stage) return;
        this.init();
        this.initEvents()
        this.stage.draw();

    }

}