import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";
import { tplList } from "pages/tplList";

export const pagesGroup = () => {
    // 渲染DOM
    const oApp = document.querySelector("#app") as HTMLDivElement;
    template.nodeRender(tplExample.tag, {}, oApp)
    const oHeader = oApp.querySelector('[fxtag="header"]') as HTMLDivElement;
    template.nodeRenderFor(tplList.tagHeader, [
        { text: "置顶" },
        { text: "置底" },
        { text: "上一层" },
        { text: "下一层" },
        
    ], oHeader)
    
    let stage: Konva.Stage | null = null
    let layer: Konva.Layer = new Konva.Layer()
    let group: Konva.Group = new Konva.Group()
    
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

    // 组
    group.setAttrs({
        x: clientWidth / 2,
        y: clientHeight / 2,
        draggable: true,
    })
    const colors = ["#ff8800", "#ff0000", "#ff00ff", "#00ffff"]
    for (let i = 0; i < 4; i++) {
        const rect = new Konva.Rect({
            id: `rect${i}`,
            name: "testName",
            x: i * 20,
            y: i * 20,
            width: 100,
            height: 50,
            fill: colors[i],
            stroke: 'black',
            strokeWidth: 1,
            draggable: true
        })
        group.add(rect)
    }
    layer.add(group)

    // 显示隐藏
    const aBtn = oHeader.querySelectorAll('button') as NodeListOf<HTMLElement>;
    aBtn[0].addEventListener('click', () => { 
        if (!stage) { return }
        const shapes = stage.findOne("#rect0")
        shapes?.moveToTop()
    })
    aBtn[1].addEventListener('click', () => { 
        if (!stage) { return }
        const shapes = stage.findOne("#rect0")
        shapes?.moveToBottom()
    })
    aBtn[2].addEventListener('click', () => { 
        if (!stage) { return }
        const shapes = stage.findOne("#rect0")
        shapes?.moveUp()
    })
    aBtn[3].addEventListener('click', () => { 
        if (!stage) { return }
        const shapes = stage.findOne("#rect0")
        shapes?.moveDown()
    })
    
    

}