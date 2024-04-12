import Konva from "konva";
import CanvasType from "../CanvasType";
import { CanvasRender } from "../CanvasRender/index";

export default class newView {
    image: Konva.Image;
    imgElement: HTMLImageElement; 

    constructor(params: CanvasType, canvasRender: CanvasRender) { 
        this.imgElement = canvasRender.img

        // 图片加载完成事件
        this.imgElement.onload = () => {
            const defaultWidth = params.style.width || this.imgElement.width;
            const defaultHeight = params.style.height || this.imgElement.height;
            
            // 更新图片属性
            this.image.width(defaultWidth);
            this.image.height(defaultHeight);
            this.image.image(this.imgElement);

            // 更新舞台
            canvasRender.stage.draw();

            // // 舞台中的元素加载完成后调用 handleStageLoad 方法
            
            
            
        };

        // 创建 Konva.Image 实例
        this.image = new Konva.Image({
            id:params.id,
            image: this.imgElement,
            draggable: params.style.draggable,
        });

        // 创建 HTMLImageElement 实例
        this.imgElement.src = params.style.imageSrc;

        
        
        

    }
}