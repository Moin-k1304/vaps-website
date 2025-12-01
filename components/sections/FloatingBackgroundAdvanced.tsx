'use client'

import { forwardRef } from 'react';

interface FloatingBackgroundAdvancedProps {
  floatingElementsRef?: React.RefObject<HTMLDivElement>;
}

const FloatingBackgroundAdvanced = forwardRef<HTMLDivElement, FloatingBackgroundAdvancedProps>((props, ref) => {
  return (
    <div ref={ref || props.floatingElementsRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{
      willChange: 'transform',
      transform: 'translateZ(0)'
    }}>
      <div className="floating-element absolute top-20 left-10 w-72 h-72 bg-purple-primary/5 rounded-full blur-3xl" style={{ willChange: 'transform' }} />
      <div className="floating-element absolute top-40 right-20 w-96 h-96 bg-blue-primary/5 rounded-full blur-3xl" style={{ willChange: 'transform' }} />
      <div className="floating-element absolute bottom-20 left-1/4 w-80 h-80 bg-purple-primary/5 rounded-full blur-3xl" style={{ willChange: 'transform' }} />
      <div className="floating-element absolute bottom-40 right-1/3 w-64 h-64 bg-blue-primary/5 rounded-full blur-3xl" style={{ willChange: 'transform' }} />
    </div>
  );
});

FloatingBackgroundAdvanced.displayName = 'FloatingBackgroundAdvanced';

export default FloatingBackgroundAdvanced;

