import { useEffect, useState } from "react";

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden lg:block"
        style={{ 
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isPointer ? 2.5 : 1})`,
        }}
      >
        <div className={`w-full h-full rounded-full border-2 border-primary/50 flex items-center justify-center transition-all duration-300 ${isPointer ? 'bg-primary/10 border-transparent' : ''}`}>
           <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
      </div>
      
      {/* Background Glow */}
      <div 
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full pointer-events-none z-[-1] blur-[100px] transition-transform duration-700 ease-out opacity-50 hidden lg:block"
        style={{ 
          transform: `translate3d(${position.x - 250}px, ${position.y - 250}px, 0)`,
        }}
      />
    </>
  );
};

export default CursorFollower;
