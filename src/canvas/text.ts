const pages = () => { 
    let oCanvas = document.querySelector("#app .text canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;

    
    
    ctx.fillText('asdfasdf', 50, 50)
    var text1 = ctx.measureText('Hello world');

    
    ctx.font = 'Bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.strokeText('asdfasdf',50,100)
    var text2 = ctx.measureText('Hello world');
    // console.log(text1.width,text2.width);
    

}

export default pages;