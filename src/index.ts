import template from "template";
import { aside } from "../pages/aside";
import { CanvasRender } from "ui-canvas";
import canvasInit from "./canvas/index";
import canvasEvent from "./event/index";


// 渲染主框架
template.render(aside.index, {}, "app");

const el = document.querySelector('[fxtag="content"]') as HTMLDivElement;
const { clientWidth, clientHeight } = el
const canvas = new CanvasRender(el, clientWidth, clientHeight);


// 渲染canvas
canvasInit(canvas);


// 事件
canvasEvent(canvas);