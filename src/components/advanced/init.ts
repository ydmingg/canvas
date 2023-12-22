import Konva from 'konva'

export class shapesRect {
    public x:number
    constructor(data: any) { 
        //   super()
        this.x = data.x
      
        
        this.init()
      
    }
    init() { 
        let rect = this.newRect({

        })
    }
    newRect(data: Konva.NodeConfig) {
      return new Konva.Rect(data); 
    }
}