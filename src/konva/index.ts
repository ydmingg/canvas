import Konva from "konva";


const pages = () => {

    // const app = document.querySelector("#app") as HTMLDivElement;
    // // 创建stage舞台
    // const stage = new Konva.Stage({
    //     container: app,
    //     width: 500,
    //     height: 500
    // });
    // // 创建一个Layer，把这个Layer加入到Stage里面
    // const layer1 = new Konva.Layer();
    // stage.add(layer1)
    // // 创建一个图形或者Group，把这个图形或者Group加入到Layer里面
    // const circle = new Konva.Circle({
    //     x: 54,
    //     y: 54,
    //     radius: 50,
    //     fill: 'block',
    //     stroke: "green",
    //     strokeWidth: 4
    // })
    // const ellipse = new Konva.Ellipse({
    //     x: 50*2+54+4+10,
    //     y: 54,
    //     radiusX: 50,
    //     radiusY: 25,
    //     fill: 'skyblue',
    //     stroke: "blue",
    //     strokeWidth: 4,
    //     draggable:true
    // })
    // const Ring = new Konva.Ring({
    //     x: (50*2+54+4+10)+100+10,
    //     y: 54,
    //     fill: 'block',
    //     innerRadius: 40,
    //     outerRadius: 50,
    //     draggable: true,
    //     dragBoundFunc(currentPos) {
    //         return {
    //             x: currentPos.x > 400 ? 400 : currentPos.x,
    //             y: currentPos.y > 200 ? 200 : currentPos.y
                
    //         }
    //     }
    // })
    // const Arc = new Konva.Arc({
    //     x: ((50*2+54+4+10)+100+10)+100+10,
    //     y: 54,
    //     angle: 0,
    //     innerRadius:50,
    //     outerRadius:40,
    //     fill:"red"

    // })
    // layer1.add(circle, ellipse, Ring, Arc);
    // layer1.draw();

    // // 事件监听
    // Arc.on('click', e => { 
    //     console.log(e.evt.pageX);
        
    // })
    
    // let loop = new Konva.Tween({
    //     node: Arc,
    //     angle: 360,
    //     duration: 8,
    //     easing: Konva.Easings.Linear,
    //     onFinish: function() { 
    //         this.reset()
    //         this.play()
    //     }

    // })
    // loop.play();
    

    // 点击评论功能
    let app = document.querySelector("#app") as HTMLDivElement;

    function change() { 
        let w = app.offsetWidth
        let h = app.offsetHeight
        // 创建容器
        const stage = new Konva.Stage({
            container: app,
            width: w,
            height: h,
        })
        // 创建层
        const layer = new Konva.Layer()
        stage.add(layer)
        // 绘制圆点
        const circle = new Konva.Circle({
            x: stage.scaleX(),
            y: stage.scaleY(),
            fill: "red",
            radius: 20,
            
        })
        layer.add(circle)
        layer.on('click', e => { 
            
            console.log(111);
            
        })
    }

    change();


    window.addEventListener('resize', change)

    
    console.log(1111111);
    
    
    
    


}

export default pages;
