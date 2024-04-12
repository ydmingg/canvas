# ui-canvas

## 简介
ui-canvas是一个基于KonvaJS 的 2D 图形渲染方法库，可以方便地在 canvas 元素上绘制各种图形，如矩形、圆形、线段、文本和图片等。渲染方法库还提供了一些变换功能，如旋转和缩放 canvas 的坐标系，以及保存和恢复 canvas 的状态。

## 安装

```js
npm i -D git+ssh://git@gitee.com:funxd/ui-canvas.git
```

## 初始化舞台

```ts
import { CanvasRender } from "../index";
// container<HTMLDivElement>：挂载点
// width<number>：动态宽度
// height<number>: 动态高度
const canvas = new CanvasRender(container, width, height);
```

## 渲染元素方法-示例（图片元素）

```ts
const data = [
    {
        type: "Image", // 元素类型名称（必填不能修改）
        params: {   
            id: "01",   
            title: "图片元素",   
            x: 100,         
            y: 100,
            imageSrc: "https://book.funxdata.com/public/applogo/ai.png",
            width: 600,
            height: 600,
            draggable: false,

        }
    },
]
// 开始渲染
canvas.render(Data)
```


### 方法-示例
```ts

window.addEventListener('wheel', (event) => { 
    // 获取鼠标在画布宽高方法
    console.log(canvas.width, canvas.height);
    
    // 获取鼠标在画布中的坐标方法
    console.log(canvas.x, canvas.y);

    // 获取画布的缩放比例方法
    console.log("舞台缩放比例：",Math.round((canvas.scale * 100)) + "%");

})
```


## 渲染组件方法-示例（评论点组件）
```ts
import { CanvasEventHandlers } from "ui-canvas";
const data = [
    {
        type: "Component_Comment", // 组件类型名称（必填不能修改）
        params: {
            id: "01",
            title: "评论点组件", // 组件的序号(可选)
            x: canvas.x, 
            y: canvas.y,
        }
    },
    
]
// 开始渲染
canvas.render(Data)
```


## 渲染数据(data)中 params 的API

<table border="1" style="width:100%;text-align:left">
    <thead>
        <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>元素或组件的唯一标识符</td>
            <td>string</td>
        </tr>
        <tr>
            <td>id</td>
            <td>唯一标识符</td>
            <td>string</td>
        </tr>
        <tr>
            <td>x</td>
            <td>可选: X轴坐标</td>
            <td>number</td>
        </tr>
        <tr>
            <td>y</td>
            <td>可选: Y轴坐标</td>
            <td>number</td>
        </tr>
        <tr>
            <td>width</td>
            <td>可选: 元素的宽度</td>
            <td>number</td>
        </tr>
        <tr>
            <td>height</td>
            <td>可选: 元素的高度</td>
            <td>number</td>
        </tr>
        <tr>
            <td>fill</td>
            <td>可选: 元素的填充颜色</td>
            <td>string</td>
        </tr>
        <tr>
            <td>draggable</td>
            <td>可选: 指示元素是否可拖动 </td>
            <td>boolean</td>
        </tr>
        <tr>
            <td>title</td>
            <td>可选: 与元素关联的标题或标签</td>
            <td>string</td>
        </tr>
        <tr>
            <td>imageSrc</td>
            <td>可选: 图像元素的源URL</td>
            <td>string</td>
        </tr>
        <tr>
            <td>radius</td>
            <td>可选: 圆形元素（例如，圆形、点）的半径</td>
            <td>number</td>
        </tr>
    </tbody>
</table>

## type 方法

<table border="1" style="width:100%;text-align:left">
    <thead>
        <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Component_View</td>
            <td>预览组件</td>
            <td>string</td>
        </tr>
        <tr>
            <td>Component_Comment</td>
            <td>评论点组件，params数据中必须包含 x、y</td>
            <td>string</td>
        </tr>
        <tr>
            <td>Component_Container</td>
            <td>容器组件</td>
            <td>string</td>
        </tr>
    </tbody>
</table>


<table border="1" style="width:100%;text-align:left">
    <thead>
        <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
        </tr>
    </thead>
        <tr>
            <td>Image</td>
            <td>图片元素</td>
            <td>string</td>
        </tr>
        <tr>
            <td>Rect</td>
            <td>矩形元素</td>
            <td>string</td>
        </tr>
    </tbody>
</table>



## Function API方法

<table border="1" style="width:100%;text-align:left">
    <thead>
        <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>elementsVisible</td>
            <td>显示隐藏画布元素.elementsVisible('type',bool),type为元素的类型，bool为布尔值，true时显示，false隐藏</td>
            <td>function</td>
        </tr>
        <tr>
            <td>deleteElements</td>
            <td>删除画布元素.deleteElements('id'),id：id名</td>
            <td>function</td>
        </tr>
    </tbody>
</table>