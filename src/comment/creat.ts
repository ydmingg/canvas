import Konva from "konva";
// import comment from "./init";

const creat = () => { 
    const app = document.querySelector("#app") as HTMLDivElement;
    const width = app.offsetWidth
    const height = app.offsetHeight
    

    // 创建图片（模拟数据图片）
    let bgImg = new Image();
    bgImg.onload = function () { 
        const stateImg = new Konva.Image({
            x: 50,
            y: 50,
            width: layer1.width(),
            height: layer1.height(),
            image: bgImg
        })
        layer1.add(stateImg)
    }
    bgImg.src = 'https://static.funxdata.com/2023/06/19/0ee4ba8f350c40499ea4f2ca2c3df756.png';












    // let x = 0, y = 0;
    // const data = {
    //     userUrl: "https://book.funxdata.com/public/img/webmanage/AI.png"
    // }






    // // 点击时创建评论点
    // app.addEventListener('click', e => {
    //     x = Math.abs(e.offsetX)
    //     y = Math.abs(e.offsetY)

    //     comment({
    //         node: app,
    //         x: x,
    //         y: y,
    //         url: data.userUrl,
    //     });

    // })


    
    
    
    
    
    

    

}


export default {
    creat
};







// const textData = document.querySelectorAll("#Text li input") as unknown as HTMLInputElement;
//     const textBtn = document.querySelector("#Text li.list.row.justify-end button") as HTMLButtonElement;
//     const app = document.querySelector("#app") as HTMLDivElement;


//     // function dateFormat() {
//     //     const now = new Date();
//     //     const year = now.getFullYear();
//     //     const month = String(now.getMonth() + 1).padStart(2, '0');
//     //     const day = String(now.getDate()).padStart(2, '0');
//     //     const hours = String(now.getHours()).padStart(2, '0');
//     //     const minutes = String(now.getMinutes()).padStart(2, '0');
//     //     const seconds = String(now.getSeconds()).padStart(2, '0');
//     //     return `${month}月${day}日，${hours}:${minutes}`;
//     // }
    
//     // 更新数据
//     const data = {
//         url: "https://book.funxdata.com/public/img/webmanage/AI.png",
//         name: "Zhang",
//         time: dateFormat(),
//         content: "我这边换了贴图看了以后，和没有贴图的情况 没有区别"
//     }
