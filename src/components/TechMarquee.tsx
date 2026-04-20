import React from "react";
import { motion } from "framer-motion";

const TechMarquee = () => {
  const techs = [
    "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "C++", "Node.js", 
    "React", "Docker", "AWS", "Raspberry Pi", "Arduino", "MongoDB", 
    "OpenCV", "Keras", "FAST API", "PostgreSQL", "Flask"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-50/50 py-6 border-y border-slate-100 mt-20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...techs, ...techs].map((tech, i) => (
          <span 
            key={i} 
            className="text-2xl md:text-3xl font-black text-slate-200 uppercase tracking-tighter hover:text-sky-500 transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
