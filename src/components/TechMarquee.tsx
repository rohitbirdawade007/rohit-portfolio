const techs = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "C++", "Node.js",
  "React", "Docker", "AWS", "Raspberry Pi", "Arduino", "MongoDB",
  "OpenCV", "Keras", "FastAPI", "PostgreSQL", "Flask", "Next.js", "TypeScript",
];

const TechMarquee = () => (
  <div
    className="relative w-full overflow-hidden border-y py-3.5"
    style={{ background: "var(--surface)", borderColor: "var(--line)" }}
  >
    {/* Fade masks */}
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

    <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
      {[...techs, ...techs, ...techs].map((t, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 mx-6 mono text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-widest hover:text-[#1A56DB] transition-colors cursor-default"
        >
          <span className="w-1 h-1 rounded-full bg-[#1A56DB]/30 inline-block" />
          {t}
        </span>
      ))}
    </div>
  </div>
);

export default TechMarquee;
