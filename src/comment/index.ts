import Konva from "konva";

const init = () => { 
    const app = document.querySelector("#app") as HTMLDivElement;
    const width =  window.innerWidth
    const height = window.innerHeight
    
    // 创建画布
    const state = new Konva.Stage({
        container: app,
        width: width,
        height:height
    });
    // 创建层
    const layer = new Konva.Layer({
        name: 'comment',
        x: state.width() / 2 - width / 2,
        y: state.height() / 2 - height / 2,
    });
    // 创建组
    const group1 = new Konva.Group({
        scaleX: 1,
        
    });
    

    // 渲染画板
    layer.add(group1);
    state.add(layer);

    function gitPosition(node:any) { 
        let transform = node.getAbsoluteTransform().copy();
        transform.invert();
        let pos = node.getStage().getPointerPosition();
        return transform.point(pos);
    }


    state.on('click', function () { 
        // 检测input
        if (document.querySelectorAll("input").length > 0) { 
            document.querySelectorAll("input").forEach(el => { 
                el.remove();
            })
        }

        let pos = gitPosition(group1);
        // 创建矩形
        const rect1 = new Konva.Rect({
            x: pos.x,
            y: pos.y - 32,
            width: 32,
            height: 32,
            fill: "#fff",
            cornerRadius: [32,32,32,0],
            shadowOffset: { x: 0, y: 0 },
            shadowBlur: 5,
            shadowColor: '#111',
            shadowOpacity: 0.35,
            
        });

        group1.add(rect1);
        layer.batchDraw();

        // 创建输入框
        let input = document.createElement("input");
        input.style.position = "absolute"
        input.style.left = pos.x + rect1.width() + 20 + "px";
        input.style.top = pos.y - rect1.height() / 2 - 12 + "px";
        input.style.border = "1px solid #ccc";
        document.body.appendChild(input)

        // 创建缓动器
        const tween = new Konva.Tween({
            node: rect1,
            easing: Konva.Easings.EaseIn,
            duration: .3,
            
        });

        // 交互
        rect1.on("mouseover ", function () { 
            this.y( pos.y - 52 );
            this.width(260);
            this.height(52);
            tween.play()
            
        })
        rect1.on("mouseout ", function () { 
            this.y(pos.y - 32);
            this.width(32);
            this.height(32);
            tween.play()
        })
    })


    














}

export default init;