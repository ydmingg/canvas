import template from "template"
import Konva from "konva"

export const index = () => { 
    const app = document.querySelector("#app") as HTMLDivElement;
    let oCanvas = document.createElement("canvas");
    oCanvas.id = "myCanvas"
    app.appendChild(oCanvas)

    class CanvasComponent {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private radius: number;
      
        constructor(canvasId: string, radius: number) {
          this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
          this.ctx = this.canvas.getContext('2d')!;
          this.radius = radius;
        }
      
        draw(): void {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.beginPath();
          this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.radius, 0, 2 * Math.PI);
          this.ctx.fillStyle = 'blue';
          this.ctx.fill();
        }
    }
      
    // 使用示例
    const myCanvasComponent = new CanvasComponent('myCanvas', 20);
    myCanvasComponent.draw();


    // let arr: number[] = [1, 2, 3];
    // let arr3: string[] = ["1",];
    // let arr4: (number | string)[] = []
    // let arr45 : Array<(number|string)> = [1,"12"]

    // console.log(  arr3,arr,arr45 );
    
    interface Arrobj { 
        name: string,
        age:12
    }
    
    type Arr3 = {
        name: string,
        age:12
    }

    let arr: Arr3[] = [{ name: '11', age: 12 }]
    
    console.log(arr);

    let num: 1 | 2 = 1;
    type EventNames = 'click' | 'scroll' | 'mousemove';
    


}


  