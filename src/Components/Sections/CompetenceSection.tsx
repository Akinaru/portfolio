import React, { useRef, useEffect, useState } from 'react';
import { cn } from "../../libs/utils";


const WaveTransition = ({ 
  direction = 'down',
  className = ''
}: {
  direction?: 'up' | 'down';
  className?: string;
}) => {
  return (
    <div 
      className={`w-full h-48 overflow-hidden ${
        direction === 'up' ? '-mb-1' : '-mt-1'
      } ${className} relative z-10`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ 
          transform: direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        {/* Première vague avec un fond glassmorphic */}
        <path
          d="M0,0 C400,40 800,80 1200,40 L1200,120 L0,120 Z"
          className="fill-white/10 backdrop-blur-xl"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,0 C400,40 800,80 1200,40 L1200,120 L0,120 Z;
              M0,0 C400,80 800,40 1200,80 L1200,120 L0,120 Z;
              M0,0 C400,40 800,80 1200,40 L1200,120 L0,120 Z"
          />
        </path>

        {/* Deuxième vague avec opacité réduite */}
        <path
          d="M0,0 C300,60 600,30 1200,60 L1200,120 L0,120 Z"
          className="fill-white/5 backdrop-blur-xl"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0,0 C300,60 600,30 1200,60 L1200,120 L0,120 Z;
              M0,0 C300,30 600,60 1200,30 L1200,120 L0,120 Z;
              M0,0 C300,60 600,30 1200,60 L1200,120 L0,120 Z"
          />
        </path>

        {/* Troisième vague avec opacité encore plus réduite */}
        <path
          d="M0,0 C200,50 400,20 1200,50 L1200,120 L0,120 Z"
          className="fill-white/2 backdrop-blur-xl"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,0 C200,50 400,20 1200,50 L1200,120 L0,120 Z;
              M0,0 C200,20 400,50 1200,20 L1200,120 L0,120 Z;
              M0,0 C200,50 400,20 1200,50 L1200,120 L0,120 Z"
          />
        </path>
      </svg>
    </div>
  );
};

const CompetenceSection = () => {
  const interactiveRef = useRef<HTMLDivElement | null>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  const sections = {
    techStack: {
      title: "💻 Tech Stack",
      items: ["JavaScript", "PHP", "Java", "HTML5", "TypeScript", "CSS3", "Python", "C#", "Arduino", "Raspberry Pi", "PostgreSQL", "MySQL", "MongoDB", "Docker"]
    },
    frameworks: {
      title: "🛠️ Frameworks", 
      items: ["React", "Vue.js", "Node.js", "Express.js", "Laravel", "Flutter", "Symfony", "Monogame", "Blazor", "Spring Boot", "Flask"]
    },
    libraries: {
      title: "📖 Libraries",
      items: ["TailwindCSS", "Socket.io", "DaisyUI", "Bootstrap", "ThreeJS", "TensorFlow", "PyTorch", "Keras", "Pandas", "Matplotlib", "NumPy", "Scikit-learn"]
    },
    tools: {
      title: "🛠️ Softwares & Tools",
      items: ["Visual Studio Code", "Visual Studio", "Vim", "IntelliJ IDEA", "Eclipse"]
    },
    os: {
      title: "🎛️ OS",
      items: ["Debian", "Ubuntu", "iOS", "Kali", "Linux", "macOS", "Windows"]
    }
  };

  const getDuration = (itemCount: number): string => {
    return `${itemCount * 10}s`;
  };

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", "rgb(0, 0, 0)");
    document.body.style.setProperty("--gradient-background-end", "rgb(0, 0, 0)");
    document.body.style.setProperty("--first-color", "18, 113, 255");
    document.body.style.setProperty("--second-color", "221, 74, 255");
    document.body.style.setProperty("--third-color", "100, 220, 255");
    document.body.style.setProperty("--fourth-color", "200, 50, 50");
    document.body.style.setProperty("--fifth-color", "180, 180, 50");
    document.body.style.setProperty("--pointer-color", "140, 100, 255");
    document.body.style.setProperty("--size", "80%");
    document.body.style.setProperty("--blending-value", "hard-light");
  }, []);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!interactiveRef.current) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    setTgX(event.clientX - rect.left);
    setTgY(event.clientY - rect.top);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <WaveTransition direction="up" />
<div className="absolute inset-0 bg-black/90 z-0" />

      {/* SVG Filters */}
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter> 
        </defs>
      </svg>

      {/* Animated Background */}
      <div className={cn(
        "gradients-container h-full w-full blur-lg absolute top-0 left-0",
        isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
      )}>
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:center_center]",
          "animate-first",
          "opacity-100"
        )}></div>
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-400px)]",
          "animate-second",
          "opacity-100"
        )}></div>
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%+400px)]",
          "animate-third",
          "opacity-100"
        )}></div>
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-200px)]",
          "animate-fourth",
          "opacity-70"
        )}></div>
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
          "animate-fifth",
          "opacity-100"
        )}></div>

        <div
          ref={interactiveRef}
          onMouseMove={handleMouseMove}
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2",
            "opacity-70"
          )}
        ></div>
      </div>

      {/* Content */}
      <div className="relative w-full bg-transparent text-white p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(sections).map(([key, section], sectionIndex) => (
            <div key={key} className="mb-16">
  <h2 className="text-3xl font-semibold mb-8 text-center">{section.title}</h2>
  
  {/* Container avec effet glass */}
  <div className="relative rounded-3xl p-1 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
    {/* Effet de brillance */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50" />
    
    {/* Zone de défilement */}
    <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-xl">
      {/* Masques de dégradé */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10"
           style={{
             maskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
             WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
             backgroundColor: 'rgba(255,255,255,0.1)'
           }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10"
           style={{
             maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
             WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
             backgroundColor: 'rgba(255,255,255,0.1)'
           }}
      />

      {/* Contenu défilant */}
      <div className="whitespace-nowrap py-4">
        <div 
          className="inline-flex" 
          style={{
            animation: `${sectionIndex % 2 === 0 ? 'scrollRight' : 'scrollLeft'} ${getDuration(section.items.length)} linear infinite`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)'
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="inline-flex gap-4 px-2">
              {section.items.map((item, index) => (
                <div
                  key={`${item}-${i}-${index}`}
                  className="backdrop-blur-xl bg-white/5
                           border border-white/10
                           px-6 py-3 rounded-xl
                           hover:bg-white/10
                           transition-all duration-300 
                           shadow-lg hover:shadow-xl
                           transform hover:-translate-y-1"
                >
                  <span className="text-lg whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollRight {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-16.666%, 0, 0);
          }
        }
        @keyframes scrollLeft {
          0% {
            transform: translate3d(-16.666%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default CompetenceSection;