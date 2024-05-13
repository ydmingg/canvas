import type { CoreEventMap, Data } from '../types';
// import { eventChange } from '@idraw/core';

// const idrawEventChange = eventChange;
export type IDrawEvent = CoreEventMap & {
    element: {
      data: Data;
      type:
        | 'updateElement'
        | 'deleteElement'
        | 'moveElement'
        | 'addElement'
        | 'dragElement'
        | 'resizeElement'
        | 'setData'
        | 'undo'
        | 'redo'
        | 'changeLayout'
        | 'other';
    };
  };