import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesWedge = () => {
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
  // 楔形
  const wedge = new Konva.Wedge({
    x: 200,
    y: 300,
    radius: 150,
    angle: 45,
    fill: "#ff0000",
    stroke: "black",
    strokeWidth: 1,
    draggable: true,
    rotation: 60
  })
  layer.add(wedge)
}