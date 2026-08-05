const TECHS = [
  { name: "Python",       color: "#3572A5" },
  { name: "PyTorch",      color: "#EE4C2C" },
  { name: "TensorFlow",   color: "#FF6F00" },
  { name: "Scikit-Learn", color: "#F89939" },
  { name: "C++",          color: "#00599C" },
  { name: "LangChain",    color: "#1C3C3C" },
  { name: "FastAPI",      color: "#009688" },
  { name: "React",        color: "#61DAFB" },
  { name: "TypeScript",   color: "#3178C6" },
  { name: "Node.js",      color: "#339933" },
  { name: "Docker",       color: "#2496ED" },
  { name: "MongoDB",      color: "#47A248" },
  { name: "PostgreSQL",   color: "#336791" },
  { name: "OpenCV",       color: "#5C3EE8" },
  { name: "Raspberry Pi", color: "#A22846" },
  { name: "Arduino",      color: "#00979D" },
  { name: "AWS",          color: "#FF9900" },
  { name: "Keras",        color: "#D00000" },
];

const TechMarquee = () => (
  <div className="relative w-full overflow-hidden border-y border-slate-200 bg-white py-3">
    {/* Fade masks */}
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

    <div
      className="animate-marquee flex whitespace-nowrap"
      style={{ width: "max-content" }}
    >
      {[...TECHS, ...TECHS, ...TECHS].map((t, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 mx-7 mono text-[10.5px] font-semibold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors duration-200 cursor-default select-none group"
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block transition-transform duration-200 group-hover:scale-150"
            style={{ background: t.color }}
          />
          {t.name}
        </span>
      ))}
    </div>
  </div>
);

export default TechMarquee;
