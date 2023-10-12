import Konva from "konva";

const pages = () => {   
    (document.querySelector("#Text") as HTMLDivElement).classList.add("hide")
    let app = document.querySelector("#app") as HTMLDivElement;
    let width = app.offsetWidth
    let height = app.offsetHeight

    // 创建图形修改器
    const tr: Konva.Transformer = new Konva.Transformer();


    // 创建画布
    const stage = new Konva.Stage({
        container: app,
        width: width,
        height:height
    })
    // 创建页面
    const layer = new Konva.Layer();
    // 创建组
    const group = new Konva.Group();
    // 创建图形
    group.setAttrs({
        x: width / 3,
        y: height / 3,
        draggable:true
    })


    layer.add(group);
    stage.add(layer);

    const rect1 = new Konva.Rect({
        name: "rect",
        x: width/2 - 100,
        y: height/2,
        width: 200,
        height: 140,
        fill: "#f0f",
        draggable:true
    });
    layer.add(rect1)
    const rect2 = new Konva.Rect({
        name: "rect",
        x: width/2 + 100,
        y: height/2,
        width: 200,
        height: 140,
        fill: "#f00",
        draggable:true
    });
    layer.add(rect2)

    // 做框选功能
    const selectionRect = new Konva.Rect({
        fill: "rgba(0,0,0,.1)",
        visible: false,
    })
    layer.add(selectionRect,tr)

    stage.on('click tap', e => { 
        const dom = e.target
        if (dom.getType() === "Shape") {
            tr.nodes([dom])
        } else { 
            tr.nodes([])
        }
    })
    
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    stage.on("mousedown touchstart", e => { 
        if (e.target !== stage) { 
            return
        }
        e.evt.preventDefault();
        const { x, y } = stage.getPointerPosition() as Konva.Vector2d
        x1 = x
        x2 = x
        y1 = y
        y2 = y

        selectionRect.visible(true)
        selectionRect.width(0)
        selectionRect.height(0)

    })

    stage.on("mousemove touchmove", e => { 
        if (!selectionRect.visible()) return;
        const { x, y } = stage.getPointerPosition() as Konva.Vector2d
        x2 = x
        y2 = y
        selectionRect.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x1 - x2),
            height: Math.abs(y1 - y2),
            
        })
    })

    stage.on("mouseup touchend", e => { 
        if (!stage) return;
        if (!selectionRect.visible()) return;

        setTimeout(() => { 
            selectionRect.visible(false)
        })
        const shapes = stage.find(".rect")
        const box = selectionRect.getClientRect()
        let selected = shapes.filter((shape) => { 
            Konva.Util.haveIntersection(box,shape.getClientRect())
        })
        tr.nodes(selected)

    })

    
}

export default pages;