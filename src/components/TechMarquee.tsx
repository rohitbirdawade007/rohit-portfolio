const techs = [
  { name: "Python",       color: "#3572A5" },
  { name: "PyTorch",      color: "#EE4C2C" },
  { name: "TensorFlow",   color: "#FF6F00" },
  { name: "Scikit-Learn", color: "#F89939" },
  { name: "C++",          color: "#00599C" },
  { name: "Node.js",      color: "#339933" },
  { name: "React",        color: "#61DAFB" },
  { name: "Docker",       color: "#2496ED" },
  { name: "AWS",          color: "#FF9900" },
  { name: "Raspberry Pi", color: "#A22846" },
  { name: "Arduino",      color: "#00979D" },
  { name: "MongoDB",      color: "#47A248" },
  { name: "OpenCV",       color: "#5C3EE8" },
  { name: "FastAPI",      color: "#009688" },
  { name: "PostgreSQL",   color: "#336791" },
  { name: "TypeScript",   color: "#3178C6" },
  { name: "Next.js",      color: "#000000" },
  { name: "Keras",        color: "#D00000" },
];

const TechMarquee = () => (
  <div
    className="marquee-wrapper relative w-full overflow-hidden border-y py-3.5"
    style={{ background: "var(--surface)", borderColor: "var(--line)" }}
  >
    {/* Fade masks */}
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

    <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
      {[...techs, ...techs, ...techs].map((t, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 mx-6 mono text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-widest hover:text-[#0A0A0A] transition-colors duration-200 cursor-default select-none group"
        >
          {/* Colored dot */}
          <span
            className="w-1.5 h-1.5 rounded-full inline-block transition-transform group-hover:scale-125"
            style={{ background: t.color }}
          />
          {t.name}
        </span>
      ))}
    </div>
  </div>
);

export default TechMarquee;
