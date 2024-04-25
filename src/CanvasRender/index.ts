import Konva from "konva";
import CanvasType from "../CanvasType/index";
import { ObjectImage,ObjectMark } from '../CanvasObject'
import { Events,Others } from "../CanvasEvents";
import CanvasMark from "../CanvasMark";


export class CanvasRender { 
    app: HTMLDivElement //挂载点
    width: number   //视口宽度
    height: number  //视口高度
    scale: number  //设置缩放因子
    scale_by: { value: number; min: number; max: number } //基础缩放倍数为1.05,最小0.02，最大256
    stage: Konva.Stage | null
    layer: Konva.Layer
    group: Konva.Group
    resizeTimer: any = null  // 刷新页面定时器
    moveStatus: boolean = false // 设置画布移动状态

    startDragPosition: { x: number; y: number } | null = null; // 存储初始拖动位置
    startStagePosition: { x: number; y: number } | null = null; // 存储初始阶段位置
    mouseStagePosition: { x: number; y: number } | null = null; // 存储鼠标在舞台中的位置
    pinchStartDistance: number | null = null
    shapeAttrs: any[] = [] 
    scaleBool: boolean = false
    
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
        this.stage.on('click tap', (e) => CanvasMark.markClick(e,this))
        
        // 键盘事件
        window.addEventListener('keydown', (e) => Events.KeyDown(e, this))
        window.addEventListener('keyup', (e) => Events.Keyup(e, this))
        window.addEventListener('contextmenu', (e)=> {
            e.preventDefault();
        });

        // 
    }



    // 渲染图片
    async Component_View(shapeType: CanvasType) { 
        if (!shapeType.params.imageSrc) return;
        
        let image = await this.asyncLoadImage(shapeType.params.imageSrc)
        // this.image.element = image;
        // this.image.width = image.width;
        // this.image.height = image.height;   
        const Img = new ObjectImage(shapeType, this, image);
        // this.shapeAttrs = shapeType
        // console.log(shapeType);
        this.shapeAttrs.push({
            attrs: Img.image.attrs,
            element: Img.image
        })
        
        return Img;
    }
    // 标注
    async Component_Comment(shapeType: CanvasType) { 
        const Mark = new ObjectMark(shapeType, this);
        this.shapeAttrs.push({
            attrs: Mark.mark.attrs,
            element: Mark.mark
        })

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

        // 重新绘制舞台
        this.stage?.batchDraw();

    }


    // 
    startDrag(startX: number, startY: number) { Others.startDrag(startX, startY, this) }
    appMoving(mouseX: number, mouseY: number) { Others.appMoving(mouseX, mouseY, this) }
    appEndDrag() { Others.appEndDrag(this) }
    deleteElements(id:string) { Others.deleteElements(id,this) }

    //
    newStage(data: Konva.StageConfig) { return new Konva.Stage(data) }
    newLayer() { return new Konva.Layer() }
    newGroup(data: Konva.NodeConfig) { return new Konva.Group(data) }
    newRect(data: Konva.NodeConfig) { return new Konva.Rect(data) }
    newCircle(data: Konva.NodeConfig) { return new Konva.Circle(data) }
    newText(data: Konva.NodeConfig) { return new Konva.Text(data)}
    newImage(data: Konva.ImageConfig) { return new Konva.Image(data) }
    
    // 缩放画布
    scaleStage(num: number) { 
        this.scaleBool = true
        if (!this.stage) return;
    
        // 计算新的缩放比例
        const newScale = this.stage.scaleX() * num;
        this.scale = newScale
        
        // 确保缩放在最小和最大值之间
        if (newScale < this.scale_by.min || newScale > this.scale_by.max) return;

        // 设置舞台缩放比例
        this.stage.scale({ x: newScale, y: newScale });
        const allElements = this.stage.getClientRect({ relativeTo: this.stage });

        const stageWidth = this.width; 
        const stageHeight = this.height; 
        // 计算元素总体积和偏移量
        const totalWidth = allElements.width;
        const totalHeight = allElements.height;
        const offsetX = allElements.x;
        const offsetY = allElements.y;
        const scaledOffsetX = offsetX * newScale;
        const scaledOffsetY = offsetY * newScale;

        
        // 计算偏移量，并在缩放后将元素居中
        const offsetXDiff = (stageWidth - totalWidth * newScale) / 2 - scaledOffsetX;
        const offsetYDiff = (stageHeight - totalHeight * newScale) / 2 - scaledOffsetY;
        this.stage.position({ x: offsetXDiff, y: offsetYDiff });
        

        // 重新绘制舞台
        this.stage.batchDraw();
    }

    

    // 重绘
    resize() { 
        if (!this.stage) return;
        this.init();
        this.initEvents()
        Events.StageAutoSize(this)
        this.stage.draw();
    }

    
     

}