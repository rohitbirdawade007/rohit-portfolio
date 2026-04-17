import { useRef, useState, useEffect, ReactNode } from 'react';

export const Magnetic = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    }

    return (
        <div
            ref={ref}
            onMouseMove={(e: any) => handleMouse(e)}
            onMouseLeave={reset}
            style={{ 
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                transition: 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)' 
            }}
        >
            {children}
        </div>
    )
}
