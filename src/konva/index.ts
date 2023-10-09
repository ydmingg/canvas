import Konva from "konva";


const pages = () => {

    // 点击评论功能
    let app = document.querySelector("#app") as HTMLDivElement;
    let Width = window.innerWidth
    let Height = window.innerHeight

    // 创建容器
    const stage = new Konva.Stage({
        container: app,
        width: Width,
        height: Height,
    })
    // 创建层
    const layer = new Konva.Layer()
    var group = new Konva.Group({
        scaleX: 1
    });

    layer.add(group);
    stage.add(layer)

    function gitPosition(node:any) { 
        let transform = node.getAbsoluteTransform().copy();
        transform.invert();
        let pos = node.getStage().getPointerPosition();
        return transform.point(pos);
    }
    
    stage.on('click', function() {
        var pos = gitPosition(group);
        var circle = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            fill: 'red',
            radius: 10,
            draggable: true,
        });

        // 渲染画板
        group.add(circle);
        layer.batchDraw();

        // 标注点缩放缓动
        const tween = new Konva.Tween({
            node: circle,
            scaleX:1.6,
            scaleY:1.6,
            easing: Konva.Easings.EaseIn,
            duration: .3,
        });
        
        circle.on('mouseover touchstart', function (el) {
            stage.container().style.cursor = 'pointer';
            circle.draw();
            tween.play()
        })
        circle.on('mouseout touchend', function (el) {
            stage.container().style.cursor = "default";
            circle.draw();
            tween.reverse();
        });

    });
    


}

export default pages;
