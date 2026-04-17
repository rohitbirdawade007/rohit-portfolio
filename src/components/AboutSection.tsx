import { useProfile } from "@/context/ProfileContext";
import { GraduationCap, Code2, Terminal, Cpu, Linkedin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Sandip Birdawade";
  const title = profile?.title || "AI & ML Engineer";
  const aboutText = profile?.about || "Highly motivated and results-driven Computer Science Engineer with a strong foundation in software development, data analytics, and deep learning models.";
  const profileImage = profile?.profileImage || "/profile.png";

  const skillCategories = [
    { icon: <Code2 size={20} />, title: "Languages", items: "Python, C, C++, HTML, CSS" },
    { icon: <Terminal size={20} />, title: "Tools", items: "Jupyter Notebook, Google Colab, Arduino, Raspberry Pi" },
    { icon: <Cpu size={20} />, title: "Technologies", items: "Data Science, Machine Learning, Deep Learning, IoT" },
  ];

  return (
    <section id="about" className="py-20 relative bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">About Me</h2>
          <div className="h-[2px] w-12 bg-primary mt-2" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side: Profile Card */}
          <div className="w-full lg:w-[400px] shrink-0">
             <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-[2rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 p-3">
                   <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden relative">
                      <img 
                        src={profileImage.startsWith('http') ? profileImage : `https://rohit-portfolio-qgd8.onrender.com${profileImage}`} 
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-center">
                         <h3 className="text-xl font-bold">{name}</h3>
                         <p className="text-xs text-white/70 uppercase tracking-widest mt-1">Aspiring AI & ML Engineer</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex-1">
             <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                Computer Science Engineer with a passion for <span className="text-primary italic font-serif">AI and ML</span>
             </h3>
             <div className="text-gray-600 space-y-4 leading-relaxed text-sm md:text-base mb-10">
                <p>{aboutText}</p>
                <p>Demonstrated ability to work collaboratively on interdisciplinary projects and deliver innovative solutions. Committed to continuous learning and applying cutting-edge technologies.</p>
             </div>

             {/* Education Timeline (Reference style) */}
             <div className="mb-12">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                   <GraduationCap size={20} />
                   <span className="uppercase tracking-widest text-xs">Education</span>
                </div>
                <div className="space-y-8 pl-4 border-l-2 border-gray-100">
                   <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-sm" />
                      <h4 className="font-bold text-gray-900">Bachelor of Computer Science Engineering</h4>
                      <p className="text-sm text-gray-500 mt-1">Rajgad Dnyanpeeth's Shree Chhatrapati Shivajiraje College of Engineering, Bhor, Pune</p>
                      <p className="text-xs text-primary mt-1 font-semibold">Expected Graduation: May 2025</p>
                      <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide">Machine Learning, Python, Artificial Intelligence, Data Science</p>
                   </div>
                   <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-4 h-4 bg-gray-200 rounded-full border-4 border-white shadow-sm" />
                      <h4 className="font-bold text-gray-900">H.S.C</h4>
                      <p className="text-sm text-gray-500 mt-1">Vidya Pratishthan's Arts, Science and Commerce College, Baramati, Pune</p>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">IT, Science</p>
                   </div>
                </div>
             </div>

             {/* Categories Grid (Reference style) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {skillCategories.map((cat, i) => (
                   <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="text-primary mb-4">{cat.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-2">{cat.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{cat.items}</p>
                   </div>
                ))}
             </div>

             <div className="flex flex-wrap gap-4">
                <Button 
                   className="bg-primary hover:bg-primary/90 rounded-lg px-8 py-6 h-auto transition-transform active:scale-95"
                   onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                >
                   View My Skills
                </Button>
                <Button 
                   variant="outline"
                   className="border-primary text-primary hover:bg-primary/5 rounded-lg px-8 py-6 h-auto transition-transform active:scale-95"
                   onClick={() => window.open(profile?.socialLinks?.linkedin || '#', '_blank')}
                >
                   <Linkedin size={18} className="mr-2" /> LinkedIn Profile
                </Button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
