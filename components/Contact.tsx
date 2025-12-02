import React from 'react';
import SectionHeader from './SectionHeader';
import { SOCIAL_LINKS } from '../constants';
import { Download, Mail, Twitter, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="py-20" id="contact">
      <SectionHeader title="contact_info" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6 font-mono">
          <ContactCommand cmd="contact --email" value={SOCIAL_LINKS.email} icon={<Mail size={16}/>} isLink href={`mailto:${SOCIAL_LINKS.email}`} />
          <ContactCommand cmd="contact --twitter" value="@smilelikemanu" icon={<Twitter size={16}/>} isLink href={SOCIAL_LINKS.twitter} />
          <ContactCommand cmd="contact --github" value="manukesharwani09" icon={<Github size={16}/>} isLink href={SOCIAL_LINKS.github} />
        </div>

        <div className="flex flex-col items-start justify-center border-l border-terminal-green/20 pl-8">
           <p className="text-gray-400 mb-6 max-w-md">
             Open to opportunities in Full-Stack Development and AI Engineering. 
             Let's build something scalable together.
           </p>
           
           <a 
             href="https://drive.google.com/file/d/1VRcHh48iSYPGJD-3TFiaxvCk9AqC2XCz/view?usp=sharing"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-3 px-6 py-3 bg-terminal-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,0,0.6)] hover:bg-[#33ff33] transition-all group"
           >
             <Download className="group-hover:animate-bounce" size={20} />
             <span>DOWNLOAD_RESUME.pdf</span>
           </a>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-terminal-green/20 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Manu Kesharwani.</p>
        <p className="text-xs mt-2 text-terminal-green/40">System Status: ONLINE</p>
      </footer>
    </section>
  );
};

interface ContactCommandProps {
  cmd: string;
  value: string;
  icon?: React.ReactNode;
  isLink?: boolean;
  href?: string;
}

const ContactCommand: React.FC<ContactCommandProps> = ({ cmd, value, icon, isLink, href }) => (
  <div className="group">
    <div className="text-gray-500 text-sm mb-1 opacity-70 flex items-center gap-2">
      <span className="text-terminal-green font-bold">&gt;</span> {cmd}
    </div>
    <div className="pl-5 text-xl">
      {isLink ? (
        <a href={href} className="flex items-center gap-2 text-white hover:text-terminal-green hover:underline decoration-terminal-green/50 underline-offset-4 transition-all">
          {icon} {value}
        </a>
      ) : (
        <span className="flex items-center gap-2 text-white">{icon} {value}</span>
      )}
    </div>
  </div>
);

export default Contact;