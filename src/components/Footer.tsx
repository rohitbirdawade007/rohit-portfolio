import { Github, Linkedin, Mail } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">{profile?.name || "Portfolio"}</h2>
            <p className="text-gray-300">{profile?.title || "Engineer"}</p>
          </div>
          
          <div className="flex space-x-4">
            {profile?.socialLinks?.github && (
            <a 
              href={profile.socialLinks.github} 
              target="_blank" 
              rel="noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
            >
              <Github size={18} />
            </a>
            )}
            {profile?.socialLinks?.linkedin && (
            <a 
              href={profile.socialLinks.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#0077B5] hover:bg-[#0077B5]/90 text-white p-2 rounded-full transition-colors"
            >
              <Linkedin size={18} />
            </a>
            )}
            {profile?.visibility?.showEmail !== false && profile?.email && (
            <a 
              href={`mailto:${profile.email}`} 
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full transition-colors"
            >
              <Mail size={18} />
            </a>
            )}
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {profile?.name || "Portfolio"}. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
