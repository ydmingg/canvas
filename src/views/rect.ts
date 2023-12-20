import Konva from "konva";

class KonvaJS {
    public id: HTMLDivElement
    public stage: Konva.Stage | null
    public layer: Konva.Layer
    public group: Konva.Group


    constructor(id: HTMLDivElement) {
        this.id = id
        this.stage = null
        this.layer = this.newLayer()
        this.group = this.newGroup({ x: 0, y: 0 })
        
        this.init()

    }
    
    // 初始化属性
    init() { 
        const el = this.id
        if (!el) return;
        // 定义画布大小
        const { clientWidth, clientHeight } = el
        
        // 初始化画布
        this.stage = this.newStage({
            container: this.id,
            width: clientWidth,
            height: clientHeight,
            draggable: false
        })

        // 将组放入layer中
        this.layer.add(this.group)
        //将layer放到stage中
        this.stage.add(this.layer)
        // 初始化画板
        this.drawBoard()
        
        
    }
    // 创建画板
    drawBoard() { 
        if (!this.stage) return;
        const width = 800
        const height = 500
        // 将画板水平垂直居中
        const x = this.stage.width() / 2 - width / 2
        const y = this.stage.height() / 2 - height / 2
        const bg_color = "#cccccc"
        const border_color = "#444"
        const border_size = 1
        const board = this.newBoard({
            id:"001",
            title:"画板",
            x: x,
            y: y,
            width: width,
            height: height,
            fill: bg_color,
            stroke: border_color,
            strokeWidth:border_size,
            opacity: 1,
            scaleX: 1,
            scaleY:1
        })
        // 将画板放入画布的group中
        this.group.add(board)
    }
    //创建图形
    drawShaps() { 
        if (!this.group) return
        
        let shapes = this.newCircle({
            radius: 40,
            fill: '#eee',   
            stroke: 'black',
            strokeWidth: 1,
            draggable:true
        })
        // 将形状添加到组中
        this.group.add(shapes)
        return shapes
    }
    // 初始化加载
    onresize() { 
        const el = this.id
        if (!el) return
        if(!this.stage)return
        const { clientWidth, clientHeight } = el
        this.stage.setAttrs({
            width: clientWidth,
            height:clientHeight
        })
    }

    //创建画布
    newStage(data:Konva.StageConfig) { 
        return new Konva.Stage(data)
    }
    // 创建页面
    newLayer() {
        return new Konva.Layer();
    }
    // 创建组
    newGroup(data:Konva.NodeConfig) { 
        return new Konva.Group(data);
    }
    // 创建矩形
    newBoard(data:Konva.NodeConfig) { 
        return new Konva.Rect(data);
    }
    // 创建圆形
    newCircle(data: Konva.NodeConfig) { 
        return new Konva.Circle(data);
    }


}

export default KonvaJS;