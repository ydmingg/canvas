import Konva from "konva";
import CanvasType from "../CanvasType/index";
import { ObjectImage } from '../CanvasObject'


export class CanvasRender { 
    app: HTMLDivElement //挂载点
    width: number   //视口宽度
    height: number  //视口高度
    stage: Konva.Stage | null
    layer: Konva.Layer
    group: Konva.Group


    constructor(app, width, height) { 
        this.app = app    
        this.width = width
        this.height = height
        this.stage = null
        this.layer = this.newLayer()
        this.group = this.newGroup({ x: 0, y: 0 })
        this.init()
        

    }
    // 初始化
    init() { 
        this.stage = this.newStage({
            container: this.app,
            width: this.width,
            height: this.height,
            draggable: false,
        })
        this.layer.add(this.group)
        this.stage.add(this.layer)
    }

    // 渲染图片
    async uiImage(shapeType:CanvasType) { 
        let image = await this.asyncLoadImage(shapeType.style.imageSrc)
        // this.image.element = image;
        // this.image.width = image.width;
        // this.image.height = image.height;
        

    }
    asyncLoadImage(url: string) { 
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.src = url;
            
            image.onload = () => resolve(image)
            image.onerror = () => reject(new Error('图片地址错误！！！'))
            
        });
    }



    // 渲染
    async render(data:CanvasType[]) { 
        for (const item of data) {
            await this.uiImage(item)
  
        }
    }


    //
    newStage(data: Konva.StageConfig) { return new Konva.Stage(data) }
    newLayer() { return new Konva.Layer() }
    newGroup(data: Konva.NodeConfig) { return new Konva.Group(data) }
    newRect(data: Konva.NodeConfig) { return new Konva.Rect(data) }
    newImage(data: Konva.ImageConfig) { return new Konva.Image(data) }
    
    
    
}