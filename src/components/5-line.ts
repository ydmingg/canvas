import Konva from "konva"
import template from "template";
import { tplExample } from "pages/tplExample";

export const pagesLine = () => {
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
  // 线、曲线、闭合
  const line = new Konva.Line({
    x: 400,
    points: [100, 100, 200, 300, 500, 400, 800, 500],//[x1,y1,x2,y2...]
    stroke: "red",
    strokeWidth: 2,
    // closed: true,
    draggable: true,
    fill: "red",
    tension: 0.5// 值越大，拉伸越大
  })
  layer.add(line)
}