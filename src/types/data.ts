import type { Component, ElementType, ElementAssets, ElementSize, ElementGroupDetail } from './component';

export type DataLayout = Pick<ElementSize, 'x' | 'y' | 'width' | 'height'> & {
    detail: Pick<
      ElementGroupDetail,
      'background' | 'borderWidth' | 'overflow' | 'borderColor' | 'borderDash' | 'borderRadius' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'
    >;
    operations?: {
      disabledLeft?: boolean;
      disabledTop?: boolean;
      disabledRight?: boolean;
      disabledBottom?: boolean;
      disabledTopLeft?: boolean;
      disabledTopRight?: boolean;
      disabledBottomLeft?: boolean;
      disabledBottomRight?: boolean;
    };
};
  
export interface Data<E extends Record<string, any> = Record<string, any>> {
    elements: Component<ElementType, E>[];
    assets?: ElementAssets;
    layout?: DataLayout;
}