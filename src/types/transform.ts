// matrix
export interface TransformMatrix {
    method: 'matrix';
    args: [number, number, number, number, number];
}

// translate
export interface TransformTranslate { 
    method: 'translate';
    args: [number, number, number];
}

// rotate
export interface TransformRotate { 
    method: 'rotate';
    args: [number];
}

// scale
export interface TransformScale { 
    method: 'scale';
    args: [number, number];
}


// 导出Transform
export type Transform = TransformMatrix | TransformTranslate | TransformRotate | TransformScale;