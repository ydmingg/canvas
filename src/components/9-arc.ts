import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesArc = () => {
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
  // 弧形
  const arc = new Konva.Arc({
    x: clientWidth / 2,
    y: clientHeight / 2,
    innerRadius: 40,
    outerRadius: 70,
    angle: 60,
    fill: "#ff8800",
    stroke: "black",
    strokeWidth: 1,
    rotation: 60,
    draggable: true,
  })
  layer.add(arc)
}