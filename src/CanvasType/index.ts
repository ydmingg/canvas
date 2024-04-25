import style from '../CanvasStyle'

export default interface CanvasType { 
    id: string;
    type: string;
    title?: string;
    params: style;
    element?: any; 
}