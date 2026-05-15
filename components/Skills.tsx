import React, { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";

const skills = [
  { name: "React.js",    image: "/images/react2.svg" },
  { name: "Next.js",    image: "/images/next2.svg" },
  { name: "Node.js",    image: "/images/node2.svg" },
  { name: "Express",    image: "/images/express.svg" },
  { name: "MongoDB",    image: "/images/mongo.svg" },
  { name: "MySQL",      image: "/images/mysql.svg" },
  { name: "TypeScript", image: "/images/typescript.svg" },
  { name: "JavaScript", image: "/images/javascript.svg" },
  { name: "C++",        image: "/images/cpp.svg" },
  { name: "Python",     image: "/images/python.svg" },
  { name: "HTML",       image: "/images/html.svg" },
  { name: "CSS",        image: "/images/css.svg" },
  { name: "Tailwind",   image: "/images/tailwind.svg" },
  { name: "Redis",      image: "/images/redis.svg" },
  { name: "AWS",        image: "/images/aws.svg" },
  { name: "Git",        image: "/images/git.svg" },
  { name: "GitHub",     image: "/images/github.svg" },
  { name: "VS Code",    image: "/images/vscode.svg" },
  { name: "SQL",        image: "/images/sql.svg" },
  { name: "REST APIs",  image: "/images/api.svg" },
];

// Deterministic random-ish values so layout is stable across renders
const seedData = skills.map((_, i) => ({
  x: ((i * 137.5) % 80) + 5,         // % of container width
  y: ((i * 97.3) % 70) + 10,         // % of container height
  size: 56 + ((i * 31) % 24),        // 56–80px
  dur: 4 + ((i * 1.3) % 4),          // animation duration 4–8s
  delay: -((i * 0.7) % 8),           // stagger start
  rotate: (i * 37) % 360,
}));

const Skills: React.FC = () => {
  return (
    <section className="py-20" id="skills">
      <SectionHeader title="skills --interactive" />

      <div
        className="w-full h-[560px] mt-8 rounded-lg border border-terminal-green/30 relative bg-black overflow-hidden"
        style={{ cursor: "default" }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,0,0) 50%, rgba(0,0,0,0.4) 50%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Floating skill orbs */}
        {skills.map((skill, i) => {
          const s = seedData[i];
          return (
            <div
              key={skill.name}
              title={skill.name}
              className="absolute group"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                animation: `float-skill ${s.dur}s ease-in-out ${s.delay}s infinite`,
                transform: `rotate(${s.rotate}deg)`,
                zIndex: 2,
              }}
            >
              {/* Glow ring on hover */}
              <div
                className="absolute inset-0 rounded-xl border border-terminal-green/0 group-hover:border-terminal-green/40 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,204,68,0.2)]"
                style={{ borderRadius: 10 }}
              />
              <img
                src={skill.image}
                alt={skill.name}
                className="w-full h-full object-contain rounded-xl select-none"
                style={{
                  borderRadius: 10,
                  background: "rgba(10,10,10,0.85)",
                  padding: 6,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                }}
                draggable={false}
              />
              {/* Tooltip */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-terminal-green/0 group-hover:text-terminal-green/80 transition-colors whitespace-nowrap pointer-events-none">
                {skill.name}
              </span>
            </div>
          );
        })}

        {/* Corner labels */}
        <span className="absolute top-3 left-4 text-[10px] font-mono text-terminal-green/30 z-20">
          {'> tech_stack.map(skill => <Orb />)'}
        </span>
        <span className="absolute bottom-3 right-4 text-[10px] font-mono text-terminal-green/30 z-20">
          {skills.length} skills loaded
        </span>

        <style>{`
          @keyframes float-skill {
            0%   { transform: translateY(0px) rotate(var(--rot, 0deg)); }
            50%  { transform: translateY(-14px) rotate(var(--rot, 0deg)); }
            100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Skills;