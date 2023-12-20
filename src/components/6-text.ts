import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesText = () => {
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
  // 文本
  const text = new Konva.Text({
    x: clientWidth / 2,
    y: clientHeight / 2,
    text: "吃了么!",
    fontSize: 54,
    fill: "black",
    draggable: true
    
  })
  text.x(clientWidth / 2 - text.width() / 2)
  layer.add(text)
}