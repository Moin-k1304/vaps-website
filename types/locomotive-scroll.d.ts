declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement | string | null;
    name?: string;
    offset?: number | [number, number];
    repeat?: boolean;
    smooth?: boolean;
    smoothMobile?: boolean;
    smoothDesktop?: boolean;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    reloadOnContextChange?: boolean;
    resetNativeScroll?: boolean;
    tablet?: {
      smooth?: boolean;
      breakpoint?: number;
    };
    smartphone?: {
      smooth?: boolean;
      breakpoint?: number;
    };
    scrollbarContainer?: HTMLElement | string | null;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    class?: string;
    scrollFromAnywhere?: boolean;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    touchSensitivity?: number;
    lerp?: number;
    duration?: number;
    easing?: string | number[];
    initPosition?: { x?: number; y?: number };
  }

  export interface LocomotiveScrollInstance {
    scroll: {
      instance: {
        scroll: {
          x: number;
          y: number;
        };
        y: number;
      };
      y: number;
    };
    y: number;
    scrollTo: (target: number | string | HTMLElement, options?: { duration?: number; disableLerp?: boolean }) => void;
    update: () => void;
    start: () => void;
    stop: () => void;
    destroy: () => void;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    scroll: LocomotiveScrollInstance['scroll'];
    y: number;
    scrollTo: LocomotiveScrollInstance['scrollTo'];
    update: LocomotiveScrollInstance['update'];
    start: LocomotiveScrollInstance['start'];
    stop: LocomotiveScrollInstance['stop'];
    destroy: LocomotiveScrollInstance['destroy'];
    on: LocomotiveScrollInstance['on'];
    off: LocomotiveScrollInstance['off'];
  }
}

