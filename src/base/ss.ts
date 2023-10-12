import Konva from "konva";

const init = ({ node, url, name, time, content }) => {
    // 初始化组件
    const initdata = {
        radius: 32,
        borderWidth: 4,
        width: 260,
        height: 58,
        space: 10
    }

    const width = node.offsetWidth
    const height = node.offsetHeight

    // 创建画布
    const state = new Konva.Stage({
        container: node,
        width: width,
        height:height
    });
    // 创建图片（模拟数据图片）
    let bgImg = new Image();
    bgImg.onload = function () { 
        const stateImg = new Konva.Image({
            x: 50,
            y: 50,
            width:state.width() - 100,
            height: state.height() - 100,
            image: bgImg
        })
        layer.add(stateImg)
    }
    bgImg.src = 'https://static.funxdata.com/2023/06/19/0ee4ba8f350c40499ea4f2ca2c3df756.png';
    
    // 创建层
    const layer = new Konva.Layer({
        name: 'comment',
        x: state.width() / 2 - width / 2,
        y: state.height() / 2 - height / 2,
    });
    

    // 渲染画板
    state.add(layer);

    function gitPosition(node:any) { 
        let transform = node.getAbsoluteTransform().copy();
        transform.invert();
        let pos = node.getStage().getPointerPosition();
        return transform.point(pos);
    }


    state.on('click', function () { 
        // 检测input
        // if (document.querySelectorAll("input").length > 0) {
        //     document.querySelectorAll("input").forEach(el => {
        //         el.remove();
        //     })
        // }
        // 创建组件容器
        const group1 = new Konva.Group({
            id: "el" + Math.floor(Math.random() * 1000),
            scaleX: 1,
        });
        // 创建字体容器
        layer.add(group1)

        function gie(node:any) { 
            let transform = node.getAbsoluteTransform().copy();
            transform.invert();
            let pos = node.getStage().getPointerPosition()
            return transform.point(pos);
        }
        let pos = gitPosition(group1);

        let Images = new Image();
        Images.src = url
        Images.width = initdata.radius - initdata.borderWidth;
        Images.height = initdata.radius - initdata.borderWidth;

        // 创建矩形
        const rect1 = new Konva.Rect({
            x: pos.x,
            y: pos.y - initdata.radius,
            width: initdata.radius,
            height: initdata.radius,
            fill: "#fff",
            cornerRadius: [initdata.radius, initdata.radius, initdata.radius, 0],
            shadowOffset: { x: 0, y: 0 },
            shadowBlur: 5,
            shadowColor: '#111',
            shadowOpacity: 0.35,
        });
        // 创建头像
        const circle1 = new Konva.Circle({
            x: rect1.x() + rect1.width() / 2 ,
            y: rect1.y() + rect1.height() / 2 ,
            sides: 5,
            radius: Math.abs(initdata.radius - initdata.borderWidth) / 2,
            fillPatternImage: Images,
            fillPatternOffset: { x: pos.x, y: pos.y }
            // fillPatternOffset: { x: pos.x, y: pos.y }
        });
        // 创建文本
        const textName = new Konva.Text({
            x: circle1.x() + circle1.width() + initdata.space,
            y: Math.abs(circle1.y() - circle1.height()),
            width: Math.max(circle1.width(), 50),
            text: name,
            fontSize: 13,
            fontStyle: "bold",
            fontFamily: "Calibri",
            fill: "#222",
            wrap: "none",
            visible: false
        });
        // console.log(textName.width()); // width有问题
        
        const textTime = new Konva.Text({
            x: textName.x() + textName.width() + initdata.space,
            y: textName.y() + 3, 
            width: 90,
            text: time,
            fontSize: 10,
            fontFamily: "Calibri",
            fill: "#999",
            visible: false
        });
        const textContent = new Konva.Text({
            x: textName.x(),
            y: Math.abs(textName.y() + textName.height()) + initdata.space / 2,
            width:260,
            text: content,
            fontSize: 13,
            fontStyle: "bold",
            fontFamily: "Calibri",
            fill: "#222",
            wrap: "none",
            ellipsis:true,
            visible: false
        });

        group1.add(rect1, circle1, textName, textTime, textContent); 
        layer.batchDraw();
        
        // 创建缓动器
        const tween = new Konva.Tween({
            node: rect1,
            easing: Konva.Easings.EaseIn,
            duration: .3,
            
        });

        // 交互
        group1.on("mouseover", function () { 
            // tween.play();
            rect1.y( pos.y - 52 );
            rect1.width( circle1.width() + textContent.width() + initdata.borderWidth );
            rect1.height(52);
            circle1.x(pos.x + 26);
            circle1.y(pos.y - 26);
            circle1.radius(16);
            textName.show();
            textTime.show();
            textContent.show();

            // 层级
            group1.findOne = group1.id
            group1.moveToTop()

        })
        group1.on("mouseout ", function () { 
            // tween.play();
            rect1.y(pos.y - initdata.radius);
            rect1.width(initdata.radius);
            rect1.height(initdata.radius);
            circle1.x(rect1.x() + rect1.width() / 2 );
            circle1.y(rect1.y() + rect1.height() / 2);
            circle1.radius(Math.abs(initdata.radius - initdata.borderWidth) / 2);
            
            textName.hide();
            textTime.hide();
            textContent.hide();

        })
        
        group1.setAttrs({
            draggable: true
        })

        

    })

    
}

export default init;