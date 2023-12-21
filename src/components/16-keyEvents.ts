import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";
import { tplList } from "pages/tplList";

export const pagesKeyEvents = () => {
    // 渲染DOM
    const oApp = document.querySelector("#app") as HTMLDivElement;
    template.nodeRender(tplExample.tag, {}, oApp)
    const oHeader = oApp.querySelector('[fxtag="header"]') as HTMLDivElement;
    template.nodeRenderFor(tplList.tagHeader, [
        { text: "显示" },
        { text: "隐藏" },
        
    ], oHeader)
    
    let stage: Konva.Stage | null = null
    let layer: Konva.Layer  = new Konva.Layer()
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
    // 矩形
    const width = 400
    const height = 200
    const x = clientWidth / 2 - width / 2
    const y = clientHeight / 2 - height / 2
    const rect = new Konva.Rect({
        id: "testId",
        name: "testName",
        x: x,
        y: y,
        width: width,
        height: height,
        fill: "#ff8800",
        stroke: 'black',
        strokeWidth: 1,
        opacity: 0.5, // 0~1
        draggable: true,
    })
    layer.add(rect)

    // 键盘事件
    const container = stage.container()
    const step = 10
    container.tabIndex = 1
    container.focus()
    container.addEventListener("keydown", (e) => {
        let keydownArr = {
            ArrowUp: "ArrowUp", 
            ArrowDown: "ArrowDown",
            ArrowLeft: "ArrowLeft",
            ArrowRight: "ArrowRight",
        } 
        switch (e.key) {
            case keydownArr.ArrowUp:
                rect.y(rect.y() - step)
                break;
            case keydownArr.ArrowRight:
                rect.x(rect.x() + step)
                break;
            case keydownArr.ArrowDown:
                rect.y(rect.y() + step)
                break;
            case keydownArr.ArrowLeft:
                rect.x(rect.x() - step)
                break;
            default:
                break;
        }
        e.preventDefault()
    })

    // 显示隐藏
    const aBtn = oHeader.querySelectorAll('button') as NodeListOf<HTMLElement>;
    aBtn[0].addEventListener('click', () => { 
        if (!stage) { return }
        const shapes = stage.findOne("Rect")
        shapes?.show()
        
    })
    aBtn[1].addEventListener('click', () => { 
        if (!stage) { return }
        const shapes = stage.findOne("Rect") 
        shapes?.hide()
        
    })
    
    

}