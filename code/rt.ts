export const rt = (canvas,render) => { 
    render.then(() => { 
        const popout = document.querySelector(".scale") as HTMLInputElement
        popout.value = Math.round(canvas.scale * 100) + "%"
        // canvas.deleteElements('02')
    
        // 缩放舞台方法
        // canvas.scaleStage(.2)
        // Render.then(()=>{
        //     // canvas.scale = .2
        //     // console.log(canvas.scale);
        //     xx.innerHTML = Math.round(canvas.scale * 100) + "%"
        //     canvas.deleteElements('02')
            
        // })

        // console.log(canvas.scale);
    })
}