/**
 * 表示Canvas中图形的属性类型
 * 
*/
export interface CanvasDetail {
    background?: string;          // 可选: 元素的填充颜色
    draggable?: boolean;          // 可选: 指示元素是否可拖动
    imageSrc?: string;            // 可选: 图像元素的源URL
    radius?: number;              // 可选: 圆形元素（例如，圆形、点）的半径

    // 形状其他属性
    scaleX?: number;              // 可选: X轴缩放因子
    scaleY?: number;              // 可选: Y轴缩放因子
    // rotation?: number;            // 可选: 旋转角度（度数）
    // opacity?: number;             // 可选: 不透明度值（0到1）
    // visible?: boolean;            // 可选: 元素是否可见
    borderSize?: number;         // 可选: 描边的宽度
    borderColor?: string;              // 可选: 描边颜色
    // strokeScaleEnabled?: boolean; // 可选: 启用或禁用描边缩放

    // // 特定形状的属性
    // cornerRadius?: number;        // 可选: 矩形的圆角半径
    // sides?: number;               // 可选: 多边形的边数
    // innerRadius?: number;         // 可选: 环形的内半径
    // outerRadius?: number;         // 可选: 环形的外半径
    // text?: string;                // 可选: 文本元素的文本内容
    // fontFamily?: string;          // 可选: 文本元素的字体系列
    // fontSize?: number;            // 可选: 文本元素的字体大小
    // fontStyle?: string;           // 可选: 文本元素的字体样式（例如，'normal'，'italic'）
    // align?: string;               // 可选: 文本对齐方式（例如，'left'，'center'，'right'）
    // padding?: number;             // 可选: 文本元素的填充

    // // 其他的属性
    // dash?: number[];              // 可选: 描边虚线样式
    // shadowColor?: string;         // 可选: 元素的阴影颜色
    // shadowBlur?: number;          // 可选: 元素的阴影模糊度
    // shadowOffsetX?: number;       // 可选: 元素的阴影水平偏移
    // shadowOffsetY?: number;       // 可选: 元素的阴影垂直偏移
    // draggableChildren?: boolean;  // 可选: 元素的子元素是否可拖动
    // dragDistance?: number;        // 可选: 拖动开始前必须移动的最小像素数
    // dragBoundFunc?: Function;     // 可选: 拖动边界处理函数
    // transformsEnabled?: string;   // 可选: 转换是否启用
    // // filter?: ;        // 可选: 图形的滤镜效果
    
}