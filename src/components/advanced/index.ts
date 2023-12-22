import Konva from "konva";
import template from "template";
import { tplExample } from "pages/tplExample";
import { shapesRect } from "./init";


export const pagesAdvanced = () => {
  // 渲染DOM
  const oApp = document.querySelector("#app") as HTMLDivElement;
  template.nodeRender(tplExample.index, {}, oApp)

  // 获取dom元素
  const el = document.getElementById("canvas")
  if (!el) { return }
  const { clientWidth, clientHeight } = el
  // 
  const stage = new Konva.Stage({
    container: "canvas",
    width: clientWidth,
    height: clientHeight,
    
  })
  const layer = new Konva.Layer();
  stage.add(layer)
  
  // 定义rect参数
  const data_rect = {
    id: "001",
    title: "矩形1",
    x: clientWidth / 2 - 200,
    y: clientHeight / 2 - 130,
    width: 400,
    height: 260,
    background: "#1e80ff",
    border: {
      width:10,
      style: "solid",
      color: "#fff",
    },
    borderRadius: 30,
    boxShadow: {
      inset: "",
      offsetX: 10,
      offsetY: 10,
      blurRadius: 10,
      spreadRadius: 0,
      color: "rgba(0,0,0,.1)"
    },
    transformRotate:30,
    opacity:1,

  }

  console.log(shapesRect);
  
  // 渲染rect形状
  // let rect = new Konva.Rect({
  //   id: data_rect.id,
  //   title: data_rect.title,
  //   x: data_rect.x,
  //   y: data_rect.y,
  //   width: data_rect.width,
  //   height: data_rect.height,
  //   fill: data_rect.background,
  //   strokeWidth: data_rect.border.width,
  //   stroke: data_rect.border.color,
  //   cornerRadius: data_rect.borderRadius,
  //   shadowColor: data_rect.boxShadow.color,
  //   shadowBlur: data_rect.boxShadow.blurRadius,
  //   shadowOffset: { x: data_rect.boxShadow.offsetX, y: data_rect.boxShadow.offsetY },
  //   opacity: data_rect.opacity,
    

  // })
  
  // layer.add(rect)
  
  
}

