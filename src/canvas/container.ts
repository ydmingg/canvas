const page = () => { 
    let oCanvas = document.querySelector("#app .container canvas") as HTMLCanvasElement;
    let ctx = oCanvas.getContext("2d") as CanvasRenderingContext2D;
    
    let img = new Image();
    img.src = 'https://book.funxdata.com/public/img/webmanage/AI.png'

    img.onload = () => { 
        ctx.drawImage(img,50,50,300,300,50,50,100,100)
    }

    var languages = [
        { name: "JavaScript", fileExtension: ".js" },
        { name: "TypeScript", fileExtension: ".ts" },
        { name: "CoffeeScript", fileExtension: ".coffee" }
    ];
      
    console.table(languages);
    
    
    
    
}

export default page;