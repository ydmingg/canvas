import type { IDrawMode, IDrawStorage } from '../types';
import { IDrawEvent } from './event';

// 设置交互类型
function isValidMode(mode: string | IDrawMode) {
    return ['select', 'drag', 'readOnly'].includes(mode);
}

