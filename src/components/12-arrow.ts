import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesArrow = () => {
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
  // 箭头
  const regularPolygon = new Konva.Arrow({
    x: clientWidth / 2,
    y: clientHeight / 2,
    points: [0, 0, clientWidth / 4, clientHeight / 4],
    pointerLength: 10,
    pointerWidth: 10,
    stroke: "black",
    strokeWidth: 5,
    draggable: true,
  })
  layer.add(regularPolygon)
}