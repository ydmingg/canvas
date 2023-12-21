import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesRegularPolygon = () => {
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
  // 多边形
  const regularPolygon = new Konva.RegularPolygon({
    x: clientWidth / 2,
    y: clientHeight / 2,
    sides: 6,
    radius: 100,
    fill: "#ff8800",
    stroke: "black",
    strokeWidth: 1,
    draggable: true,
  })
  layer.add(regularPolygon)
}