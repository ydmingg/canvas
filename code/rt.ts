export const rt = (canvas, render) => { 
    const popout = document.querySelector(".scale") as HTMLInputElement

    // 显示缩放比例
    render.then(() => {
        popout.value = Math.round(canvas.scale * 100) + "%"

        // 缩放舞台
        popout.addEventListener('change', () => {
            console.log("舞台缩放比例为：", parseInt(popout.value) / 100);
            
            canvas.getScale(parseInt(popout.value) / 100)

        })
        
        
    });
    

}