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
    id: string;
    type: string;
    title?: string;
    params: CanvasStyle;
    element?: any; 
}