import React, { useRef, useEffect, useState } from 'react';
import { DiVisualstudio } from "react-icons/di";
import { 
  DiJava, DiPython, DiEclipse, DiWindows } from "react-icons/di";
import { cn } from "../../libs/utils";
import { useTranslation } from 'react-i18next';
import { 
  SiJavascript, SiPhp, SiHtml5, SiTypescript, SiCss3,
  SiPython, SiArduino, SiRaspberrypi, SiPostgresql,
  SiMysql, SiMongodb, SiDocker, SiReact, SiVuedotjs, SiNodedotjs,
  SiExpress, SiLaravel, SiFlutter, SiSymfony, SiSpring, SiFlask,
  SiTailwindcss, SiSocketdotio, SiBootstrap, SiThreedotjs,
  SiTensorflow, SiPytorch, SiKeras, SiPandas,
  SiNumpy, SiScikitlearn,
  SiVim, SiIntellijidea, SiDebian, SiUbuntu, SiIos,
  SiKalilinux, SiLinux, SiMacos, SiDotnet
} from 'react-icons/si';


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
          className="fill-white/10"
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
          className="fill-white/5"
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
          className="fill-white/2 "
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



interface AnimatedGradientBackgroundProps {
  isSafari: boolean;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({ }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "50px 0px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    
    const rect = interactiveRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    interactiveRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "gradients-container h-full w-full absolute top-0 left-0 transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className={cn(
        "absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]",
        "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
        "[transform-origin:center_center]",
        "animate-first",
        isVisible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000 delay-100"
      )}></div>
      <div className={cn(
        "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
        "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
        "[transform-origin:calc(50%-400px)]",
        "animate-second",
        isVisible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000 delay-200"
      )}></div>
      <div className={cn(
        "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
        "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
        "[transform-origin:calc(50%+400px)]",
        "animate-third",
        isVisible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000 delay-300"
      )}></div>
      <div className={cn(
        "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
        "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
        "[transform-origin:calc(50%-200px)]",
        "animate-fourth",
        isVisible ? "opacity-70" : "opacity-0",
        "transition-opacity duration-1000 delay-400"
      )}></div>
      <div className={cn(
        "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
        "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
        "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
        "animate-fifth",
        isVisible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000 delay-500"
      )}></div>

      <div
        ref={interactiveRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2",
          isVisible ? "opacity-70" : "opacity-0",
          "transition-opacity duration-1000 delay-600"
        )}
      ></div>

      {/* Couche d'assombrissement */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
    </div>
  );
};



const CompetenceSection = () => {
  const { t } = useTranslation();
  const interactiveRef = useRef<HTMLDivElement | null>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX] = useState(0);
  const [tgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

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
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const sections = {
    techStack: {
      titleKey: "competences.sections.techStack.title",
      items: [
        { name: "JavaScript", icon: SiJavascript, url: "https://fr.wikipedia.org/wiki/JavaScript" },
        { name: "PHP", icon: SiPhp, url: "https://www.php.net/" },
        { name: "Java", icon: DiJava, url: "https://www.java.com/fr/" },
        { name: "HTML5", icon: SiHtml5, url: "https://fr.wikipedia.org/wiki/HTML5" },
        { name: "TypeScript", icon: SiTypescript, url:"https://www.typescriptlang.org/" },
        { name: "CSS3", icon: SiCss3, url:"https://fr.wikipedia.org/wiki/Feuilles_de_style_en_cascade" },
        { name: "Python", icon: SiPython, url:"https://www.python.org/" },
        { name: "C#", icon: SiDotnet, url:"https://dotnet.microsoft.com/fr-fr/" },
        { name: "Arduino", icon: SiArduino, url:"https://www.arduino.cc/" },
        { name: "Raspberry Pi", icon: SiRaspberrypi, url:"https://www.raspberrypi.com/" },
        { name: "PostgreSQL", icon: SiPostgresql,url:"https://www.postgresql.org/" },
        { name: "MySQL", icon: SiMysql,url:"https://www.mysql.com/fr/" },
        { name: "MongoDB", icon: SiMongodb, url:"https://www.mongodb.com/fr-fr" },
        { name: "Docker", icon: SiDocker,url:"https://www.docker.com/" }
      ]
    },
    frameworks: {
      titleKey: "competences.sections.frameworks.title",
      items: [
        { name: "React", icon: SiReact,url:"https://fr.legacy.reactjs.org/" },
        { name: "Vue.js", icon: SiVuedotjs,url:"https://fr.vuejs.org/" },
        { name: "Node.js", icon: SiNodedotjs,url:"https://nodejs.org/fr" },
        { name: "Express.js", icon: SiExpress,url:"https://expressjs.com/" },
        { name: "Laravel", icon: SiLaravel,url:"https://laravel.com/" },
        { name: "Flutter", icon: SiFlutter,url:"https://flutter.dev/" },
        { name: "Symfony", icon: SiSymfony,url:"https://symfony.com/" },
        { name: "Monogame", icon: SiDotnet,url:"https://monogame.net/" },
        { name: "Blazor", icon: SiDotnet,url:"https://dotnet.microsoft.com/fr-fr/apps/aspnet/web-apps/blazor" },
        { name: "Spring Boot", icon: SiSpring,url:"https://spring.io/projects/spring-boot" },
        { name: "Flask", icon: SiFlask,url:"https://flask.palletsprojects.com/en/stable/" }
      ]
    },
    libraries: {
      titleKey: "competences.sections.libraries.title",
      items: [
        { name: "TailwindCSS", icon: SiTailwindcss,url:"https://tailwindcss.com/" },
        { name: "Socket.io", icon: SiSocketdotio,url:"https://socket.io/" },
        { name: "DaisyUI", icon: SiTailwindcss,url:"https://daisyui.com/" },
        { name: "Bootstrap", icon: SiBootstrap,url:"https://getbootstrap.com/" },
        { name: "ThreeJS", icon: SiThreedotjs,url:"https://threejs.org/" },
        { name: "TensorFlow", icon: SiTensorflow,url:"https://www.tensorflow.org/?hl=fr" },
        { name: "PyTorch", icon: SiPytorch,url:"https://pytorch.org/" },
        { name: "Keras", icon: SiKeras,url:"https://keras.io/" },
        { name: "Pandas", icon: SiPandas,url:"https://pypi.org/project/pandas/" },
        { name: "Matplotlib", icon: DiPython,url:"https://matplotlib.org/" },
        { name: "NumPy", icon: SiNumpy,url:"https://numpy.org/" },
        { name: "Scikit-learn", icon: SiScikitlearn,url:"https://scikit-learn.org/stable/index.html" }
      ]
    },
    tools: {
      titleKey: "competences.sections.tools.title",
      items: [
        { name: "VSCode", icon: DiVisualstudio, url:'https://code.visualstudio.com/download' },
        { name: "Visual Studio", icon: DiVisualstudio,url:'https://visualstudio.microsoft.com/fr/' },
        { name: "Vim", icon: SiVim, url:'https://doc.ubuntu-fr.org/vim' },
        { name: "IntelliJ IDEA", icon: SiIntellijidea, url:'https://www.jetbrains.com/idea/' },
        { name: "Eclipse", icon: DiEclipse,url:'https://www.eclipse.org/downloads/' }
      ]
    },
    os: {
      titleKey: "competences.sections.os.title",
      items: [
        { name: "Debian", icon: SiDebian,url:'https://www.debian.org/index.fr.html' },
        { name: "Ubuntu", icon: SiUbuntu,url:'https://www.ubuntu-fr.org/' },
        { name: "iOS", icon: SiIos,url:'https://www.apple.com/fr/ios/' },
        { name: "Kali", icon: SiKalilinux,url:'https://www.kali.org/' },
        { name: "Linux", icon: SiLinux,url:'https://www.linux.org/pages/download/' },
        { name: "macOS", icon: SiMacos,url:'https://fr.wikipedia.org/wiki/MacOS' },
        { name: "Windows", icon: DiWindows,url:'https://fr.wikipedia.org/wiki/Microsoft_Windows' }
      ]
    }
  };

  return (
    <section id="competences" className="min-h-screen w-screen relative overflow-hidden">
      <WaveTransition direction="up" />
      <div className="absolute inset-0 bg-black/90 z-0" />
      <AnimatedGradientBackground isSafari={isSafari}/>
  
      <div className="relative w-full bg-transparent text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="mb-8 md:mb-16">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-8 text-center">
                  {t(section.titleKey)}
                </h2>
                
                <div className="relative rounded-3xl p-4 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50" />
                  
                  <div className="relative bg-black/20 rounded-2xl p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {section.items.map((item, index) => (
                        <a
                          key={`${item.name}-${index}`}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative isolate overflow-hidden
                                   bg-gradient-to-br from-white/5 to-white/0
                                   border border-white/10
                                   px-4 py-3 rounded-xl
                                   group
                                   transition-all duration-300 
                                   shadow-lg 
                                   transform hover:-translate-y-1
                                   flex items-center gap-2
                                   cursor-pointer
                                   no-underline
                                   text-white
                                   hover:text-white"
                        >
                          {/* Overlay de hover isolé */}
                          <div className="absolute inset-0 -z-10 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                          
                          {item.icon && (
                            <item.icon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 
                                               transition-colors duration-300
                                               group-hover:text-blue-400" />
                          )}
                          <span className="text-sm md:text-base whitespace-nowrap select-none">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
  
      <WaveTransition direction="down" />
    </section>
  );
};

export default CompetenceSection;