import Konva from "konva";
import type { Component, ElementType } from './component';
import type { ViewContext2D } from './context2d';
import type { Data } from './data';
import type { BoardBaseEventMap } from './board';


export interface CoreOptions {
    width: number;
    height: number;
    devicePixelRatio?: number;
    createCustomContext2D?: (opts: { width: number; height: number; devicePixelRatio: number }) => Konva.Vector2d;
}

export type CursorType =
    | 'resize-left'
    | 'resize-right'
    | 'resize-top'
    | 'resize-bottom'
    | 'resize-top-left'
    | 'resize-top-right'
    | 'resize-bottom-left'
    | 'resize-bottom-right'
    | 'drag-default'
    | 'drag-active'
    | 'default';
  
export interface CoreEventCursor {
    type: CursorType | string | null;
    groupQueue?: Component<'group'>[];
    element?: Component<ElementType>;
}

export interface CoreEventChange {
    type: string;
    data: Data;
}
  

export type CoreEventMap = BoardBaseEventMap & {
    cursor: CoreEventCursor;
    change: CoreEventChange;
    [key: string]: any;
};