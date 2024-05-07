export const rt = (canvas, render) => { 
    const popout = document.querySelector(".scale") as HTMLInputElement

    // 显示缩放比例
    render.then(() => {
        popout.value = Math.round(canvas.scale * 100) + "%"

        // 缩放舞台
        popout.addEventListener('change', () => {
            console.log(parseInt(popout.value) / 100);
            
            canvas.scaleStage(parseInt(popout.value) / 100)

        })
        
        
    });
    

}