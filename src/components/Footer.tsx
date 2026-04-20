import { Github, Linkedin, Mail } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import AnimatedLogo from "./AnimatedLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();
  
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-900 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-12 md:mb-0 text-center md:text-left">
            <AnimatedLogo className="mb-4 scale-110 origin-left mx-auto md:mx-0" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{profile?.title || "Engineer"}</p>
          </div>
          
          <div className="flex space-x-6 justify-center">
            {profile?.socialLinks?.github && (
            <a 
              href={profile.socialLinks.github} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-400 hover:text-primary transition-all transform hover:scale-110"
            >
              <Github size={22} />
            </a>
            )}
            {profile?.socialLinks?.linkedin && (
            <a 
              href={profile.socialLinks.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-400 hover:text-primary transition-all transform hover:scale-110"
            >
              <Linkedin size={22} />
            </a>
            )}
            {profile?.visibility?.showEmail !== false && profile?.email && (
            <a 
              href={`mailto:${profile.email}`} 
              className="text-gray-400 hover:text-primary transition-all transform hover:scale-110"
            >
              <Mail size={22} />
            </a>
            )}
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-0">
            &copy; {currentYear} {profile?.name || "Portfolio"}. Designed for Excellence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
