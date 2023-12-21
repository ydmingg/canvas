import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesImage = () => {
    // 渲染DOM
    const oApp = document.querySelector("#app") as HTMLDivElement;
    template.nodeRender(tplExample.index, {}, oApp)
    
    const el = document.getElementById("canvas")
    if (!el) {
        return
    }

    const { clientWidth, clientHeight } = el
    const stage = new Konva.Stage({
        container: 'canvas',
        width: clientWidth,
        height: clientHeight,
    })

    const layer = new Konva.Layer()
    stage.add(layer)
    // 图片
    Konva.Image.fromURL('http://192.168.5.235:8060/src/assets/address.png', (image: Konva.Image) => { 
        image.setAttrs({
            x: clientWidth / 2 - 25,
            y: clientHeight / 2 - 25,
            height: 50,
            width: 50,
            scaleY: 1,
            scaleX: 1,
            draggable: true,
        })
        layer.add(image)
    })

}