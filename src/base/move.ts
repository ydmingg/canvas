import Konva from "konva";

const pages = () => {   
    (document.querySelector("#Text") as HTMLDivElement).classList.add("hide")
    let app = document.querySelector("#app") as HTMLDivElement;
    let width = app.offsetWidth
    let height = app.offsetHeight

    // 创建画布
    const state = new Konva.Stage({
        container: app,
        width: width,
        height:height
    })
    // 创建页面
    const layer = new Konva.Layer();
    // 创建组
    const group = new Konva.Group();
    // 创建图形
    const colors = ["#ff0", "#00f", "#0f0", "#f00"]
    group.setAttrs({
        x: width / 3,
        y: height / 3,
        draggable:true
    })

    for (let i = 0; i < colors.length; i++) {
        const rect = new Konva.Rect({
            id: `rect${i}`,
            name: "testName",
            x: i*20,
            y: i*20,
            width: 200,
            height: 200,
            fill: colors[i],
            draggable:false
        });
        group.add(rect)
    }

    const moveToTop = () => { 
        if (!state) return;
        const shapes = state.findOne("#rect0");
        if (!shapes) return;
        shapes.moveUp()
    }
    
    // const moveToTop = () => { 
    //     if (!state) return;
    //     const shapes = state.findOne("#rect0");
    //     if (!shapes) return;
    //     shapes.moveToTop()
    // }

    

    document.addEventListener('click',moveToTop)

    

    layer.add(group);
    state.add(layer);

    

    
}

export default pages;