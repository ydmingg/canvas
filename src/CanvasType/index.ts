import { CanvasStyle } from '../CanvasStyle'

export type CanvasComponentsType =
    "canvas"|
    "board" |
    "image" |
    "rect" |
    "circle" |
    "text" |
    "mark" |
    ""
    ;

export interface CanvasComponentsMap { 
    id: string;     // 组件的唯一标识
    type: string;   // 组件的类型
    title?: string; // 组件的标题
    name?: string;  // 组件的名称
    x?: number;     // 组件的X坐标
    y?: number;     // 组件的Y坐标
    width?: number; // 组件的宽度
    height?: number;    // 组件的高度
    style: CanvasStyle;   // 组件的样式
}