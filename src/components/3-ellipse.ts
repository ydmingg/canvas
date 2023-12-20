import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesEllipse = () => {
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
  // 椭圆
  const ellipse = new Konva.Ellipse({
    x: clientWidth / 2,
    y: clientHeight / 2,
    radiusX: 200,
    radiusY: 100,
    fill: "red",
    stroke: "black",
    strokeWidth: 1,
    draggable: true
  })
  layer.add(ellipse)
}