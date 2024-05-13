import type { Data, PointSize, CoreOptions} from '../types';
import { CoreEventMap } from "@src/types";
// import { Board } from '../CanvasRender/index';

export class Core<E extends CoreEventMap = CoreEventMap> { 
    constructor(container: HTMLDivElement, opts: CoreOptions) { 
        const { devicePixelRatio = 1, width, height, createCustomContext2D } = opts;
        
    }
}