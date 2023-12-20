import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesLabel = () => {
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
  
  // 创建标签
  const tooltip = new Konva.Label({
    x: clientWidth / 2,
    y: clientHeight / 2,
    draggable: true,
  })

  const tag = new Konva.Tag({
    fill: "#ff8800",
    pointerDirection: 'down',
    stroke: "black",
    strokeWidth: 1,
    pointerWidth: 10,
    pointerHeight: 10,
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOpacity: 0.5,
  })

  const tagText = new Konva.Text({
    text: "每天一句，吃了么!",
    fontSize: 18,
    padding: 15,
    fill: "#fff"
  })

  tooltip.add(tag)
  tooltip.add(tagText)
  layer.add(tooltip)
}