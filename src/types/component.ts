import { PointSize } from "./point";
import { Transform } from "./transform";

export interface ElementSize {
    x: number;
    y: number;
    width?: number;
    height?: number;
    angle?: number;
} 

export type ElementType = keyof ElementDetailMap;

export interface ElementCircleDetail extends componentBaseDetail {
    radius: number;
    background?: string;
}
export interface ElementTextDetail extends componentBaseDetail {
    text: string;
    color?: string;
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: 'bold' | string | number;
    fontFamily?: string;
    textAlign?: 'center' | 'left' | 'right';
    verticalAlign?: 'middle' | 'top' | 'bottom';
    textShadowColor?: string;
    textShadowOffsetX?: number;
    textShadowOffsetY?: number;
    textShadowBlur?: number;
}
export interface ElementImageDetail extends componentBaseDetail {
    src: string;
}
export interface ElementAssetsItem {
    type: 'svg' | 'image' | 'html';
    value: string;
}

export interface ElementAssets {
    [assetId: string]: ElementAssetsItem;
}
export interface ElementGroupDetail extends componentBaseDetail {
    children: Component<ElementType>[];
    overflow?: 'hidden' | 'visible';
    assets?: ElementAssets;
}


export interface ElementDetailMap {
    // rect: ElementRectDetail;
    circle: ElementCircleDetail;
    text: ElementTextDetail;
    image: ElementImageDetail;
    // html: ElementHTMLDetail;
    // svg: ElementSVGDetail;
    group: ElementGroupDetail;
    // path: ElementPathDetail;
}


export interface GradientStop {
    offset: number;
    color: string;
}


// 线性渐变色
export interface LinearGradientColor { 
    type: 'linear-gradient';
    start: PointSize;
    end: PointSize;
    stops: Array<GradientStop>;
    angle?: number;
    transform?: Transform[];
}

type GadialCircle = PointSize & {
    radius: number;
};
  

export interface RadialGradientColor {
    type: 'radial-gradient';
    inner: GadialCircle;
    outer: GadialCircle;
    stops: Array<GradientStop>;
    angle?: number;
    transform?: Transform[];
}

// export type ElementClipPath = Pick<ElementPathDetail, 'commands' | 'originX' | 'originY' | 'originW' | 'originH'>;

// 组件的基础属性类型
export interface componentBaseDetail { 
    boxSizing: 'content-box' | 'border-box' | 'center-line'; // default center-line
    borderWidth?: number | [number, number, number, number]; // [top, right, bottom, left]
    borderColor?: string;
    borderRadius?: number | [number, number, number, number]; // [top-left, top-right, bottom-left, bottom-right]
    borderDash?: number[];
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
    background?: string | LinearGradientColor | RadialGradientColor;
    opacity?: number;
    // clipPath?: ElementClipPath;
}


export interface Component<T extends ElementType = ElementType, E extends Record<string, any> = Record<string, any>> extends ElementSize {
    id: string;     
    type: T;   
    title?: string; 
    name?: string;   
    detail: ElementDetailMap[T];   // 组件的样式
    // operations?: ElementOperations;
    // extends?: E;
}