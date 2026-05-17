import React from 'react';
import SectionHeader from './SectionHeader';
import { SOCIAL_LINKS } from '../constants';
import { Download, Mail, Twitter, Github, Linkedin, ArrowRight, MapPin } from 'lucide-react';

const CONTACT_LINKS = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'manukesharwani125@gmail.com',
    href: `mailto:${SOCIAL_LINKS.email}`,
    desc: 'Best for professional enquiries',
  },
  {
    icon: <Github size={18} />,
    label: 'GitHub',
    value: 'manukesharwani09',
    href: SOCIAL_LINKS.github,
    desc: 'Check out my work',
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    value: 'manukesharwani09',
    href: SOCIAL_LINKS.linkedin,
    desc: 'Connect professionally',
  },
  {
    icon: <Twitter size={18} />,
    label: 'X / Twitter',
    value: '@smilelikemanu',
    href: SOCIAL_LINKS.twitter,
    desc: 'Say hi anytime',
  },
];

const Contact: React.FC = () => {
  return (
    <section className="py-20" id="contact">
      <SectionHeader title="contact" />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT — CTA card */}
        <div className="lg:col-span-2 border border-terminal-green/20 p-6 flex flex-col justify-between bg-terminal-green/[0.03] relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-terminal-green/10" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
              <span className="text-[11px] font-mono text-terminal-green/60">available for hire</span>
            </div>

            <h3 className="text-2xl font-bold text-white leading-snug mb-3">
              Let's build something<br />
              <span className="text-terminal-green">great together.</span>
            </h3>

            <p className="text-gray-500 text-sm font-mono leading-relaxed">
              Open to full-time SWE roles in backend, full-stack, or platform engineering.
            </p>

            <div className="flex items-center gap-1.5 mt-3 text-gray-600 text-xs font-mono">
              <MapPin size={11} />
              Bengaluru, India · Open to remote
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-terminal-green text-black text-sm font-bold hover:bg-[#00aa33] transition-all group"
            >
              <Mail size={15} />
              Send me an email
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://drive.google.com/file/d/1xWgwZtmHhLriROcZ6T_fJ3u_85xblOPb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 border border-terminal-green/30 text-terminal-green text-sm font-mono hover:bg-terminal-green/10 transition-all"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>

        {/* RIGHT — Contact links */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-terminal-green/15 p-4 hover:border-terminal-green/40 hover:bg-terminal-green/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-terminal-green/50 group-hover:text-terminal-green transition-colors">
                  {link.icon}
                </span>
                <ArrowRight
                  size={14}
                  className="text-gray-700 group-hover:text-terminal-green group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <div>
                <div className="text-white text-sm font-mono font-semibold">{link.label}</div>
                <div className="text-terminal-green/60 text-xs font-mono mt-0.5">{link.value}</div>
                <div className="text-gray-600 text-[11px] mt-1">{link.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-16 pt-6 border-t border-terminal-green/10 flex items-center justify-between text-xs font-mono text-gray-700">
        <span>© {new Date().getFullYear()} Manu Kesharwani</span>
        <span className="flex items-center gap-1.5 text-terminal-green/30">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green/50 animate-pulse" />
          System Status: ONLINE
        </span>
      </footer>
    </section>
  );
};

export default Contact;