import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesPreview = () => {
    // 渲染DOM
    const oApp = document.querySelector("#app") as HTMLDivElement;
    template.nodeRender(tplExample.index, {}, oApp)
    let windowDom = '<div id="preview" class="bg-gray-400" style="position:absolute;top:20px;right:20px;"></div>'
    let oCanvas = oApp.querySelector(".index") as HTMLDivElement;
    template.nodeAfterbeginRender(windowDom, {}, oCanvas)

    
    let stage: Konva.Stage | null = null
    let previewStage: Konva.Stage | null = null
    const layer: Konva.Layer = new Konva.Layer()
    const tr: Konva.Transformer = new Konva.Transformer()

    const el = document.getElementById("canvas")
    if (!el) {
        return
    }
    const { clientWidth, clientHeight } = el
    stage = new Konva.Stage({
        container: 'canvas',
        width: clientWidth,
        height: clientHeight,
    })

    stage.add(layer)

    const rect1 = new Konva.Rect({
        id: "rect1",
        name: "rect",
        x: clientWidth / 2 - 200,
        y: clientHeight / 2 - 100,
        width: 200,
        height: 100,
        fill: '#ff8800',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        strokeScaleEnabled: false,
    })
    layer.add(rect1)

    const rect2 = new Konva.Rect({
        id: "rect2",
        name: "rect",
        x: clientWidth / 2 + 100,
        y: clientHeight / 2,
        width: 200,
        height: 100,
        fill: '#ff00ff',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        strokeScaleEnabled: false,
    })
    layer.add(rect2)

    const selectionRect = new Konva.Rect({
        fill: "rgba(0,0,255,0.1)",
        visible: false,
        stroke: "rgba(0,0,255,0.5)",
        strokeWidth: 1
    })
    layer.add(selectionRect)
    layer.add(tr)

    stage.on("click tap", (e) => {
        const dom = e.target
        if (dom.getType() === "Shape") {
        tr.nodes([dom])
        } else {
        tr.nodes([])
        }
    })
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0
    stage.on("mousedown touchstart", (e) => {
        if (e.target !== stage) {
        return
        }
        e.evt.preventDefault()
        const { x, y } = stage.getRelativePointerPosition() as Konva.Vector2d
        x1 = x
        x2 = x
        y1 = y
        y2 = y
        selectionRect.visible(true)
        selectionRect.width(0)
        selectionRect.height(0)
    })

    stage.on("mousemove touchmove", (e) => {
        if (!selectionRect.visible()) {
        return
        }
        const { x, y } = stage?.getRelativePointerPosition() as Konva.Vector2d
        x2 = x
        y2 = y
        selectionRect.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2)
        })
    })

    stage.on("mouseup touchend", (e) => {
        if (!stage) {
        return
        }
        if (!selectionRect.visible()) {
        return
        }
        setTimeout(() => {
        selectionRect.visible(false)
        })
        const shapes = stage.find(".rect")
        const box = selectionRect.getClientRect()
        let selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
        )
        tr.nodes(selected)
    })
    const SCALE_BY = 1.1
    stage.on("wheel", (e) => {
        if (!stage) {
        return
        }
        const oldScale = stage.scaleX()
        const pointer = stage.getPointerPosition() as Konva.Vector2d
        const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
        }
        let direction = e.evt.deltaY > 0 ? -1 : 1
        if (e.evt.ctrlKey) {
        direction = -direction
        }
        const newScale = direction > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY
        stage.scale({ x: newScale, y: newScale })
        const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
        }
        stage.position(newPos)
    })

    previewStage = new Konva.Stage({
        container: "preview",
        width: clientWidth / 4,
        height: clientHeight / 4,
        scaleX: 1 / 4,
        scaleY: 1 / 4,
    })
    let previewLayer = layer.clone()
    previewStage.add(previewLayer)

    stage.on("dragmove", updatePreview)
    function updatePreview() {
        if (!layer || !layer.children) {
        return
        }
        layer.children.forEach((shape) => {
        const clone = previewLayer.findOne(`#${shape.id()}`)
        if (!clone) {
            return
        }
        clone.position(shape.position())
        })
    }

}