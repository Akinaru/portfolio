import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../../projects';
import { createNoise3D } from 'simplex-noise';
import { cn } from '../../libs/utils';

type Direction = 1 | -1 | 0;

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const slideVariants: Variants = {
  enter: (direction: Direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  })
};

const imageVariants: Variants = {
  enter: () => ({
    scale: 1.2,
    opacity: 0,
  }),
  center: {
    scale: 1,
    opacity: 1,
  },
  exit: () => ({
    scale: 0.9,
    opacity: 0,
  })
};


const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentColors, setCurrentColors] = useState(colors);
  const [targetColors, setTargetColors] = useState(colors);
  
  useEffect(() => {
    setTargetColors(colors);
  }, [colors]);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    setIsVisible(true);
    render();
  };

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const lerpColor = (color1: string, color2: string, t: number) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    
    const r = Math.round(lerp(c1.r, c2.r, t));
    const g = Math.round(lerp(c1.g, c2.g, t));
    const b = Math.round(lerp(c1.b, c2.b, t));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const drawWave = (n: number, timestamp: number) => {
    nt += getSpeed();
    ctx.clearRect(0, 0, w, h);
    
    // Calcul de la progression de la transition (sur 500ms)
    const transitionDuration = 500;
    const progress = Math.min((timestamp % transitionDuration) / transitionDuration, 1);
    
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      
      // Interpolation des couleurs
      const currentColor = currentColors?.[i] || "#000000";
      const targetColor = targetColors?.[i] || "#000000";
      const interpolatedColor = lerpColor(currentColor, targetColor, progress);
      
      ctx.strokeStyle = interpolatedColor;
      ctx.globalAlpha = waveOpacity;
      
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }

    if (progress === 1) {
      setCurrentColors(targetColors);
    }
  };

  let animationId: number;
  const render = (timestamp = 0) => {
    drawWave(5, timestamp);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div className={cn("relative w-full h-full", containerClassName)} {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <canvas
          className="absolute inset-0 z-0"
          ref={canvasRef}
          id="canvas"
          style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
          }}
        />
      </motion.div>
      <div className={cn("relative z-10 h-full", className)}>
        {children}
      </div>
    </div>
  );
};

interface ProjectBadgeProps {
  type: string;
  className?: string;
}

const ProjectBadge: React.FC<ProjectBadgeProps> = ({ type, className = '' }) => {
  const colors: Record<string, string> = {
    Personnel: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    Personal: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    Scolaire: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    Academic: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    Stage: 'bg-green-500/20 text-green-300 border-green-500/50',
    Internship: 'bg-green-500/20 text-green-300 border-green-500/50'
  };

  const defaultColor = 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  const colorClasses = colors[type] || defaultColor;

  return (
    <div className={`inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full border text-xs md:text-sm font-medium ml-2 md:ml-4 ${colorClasses} ${className}`}>
      {type}
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);
  const [isFading, setIsFading] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.3 });
  const currentProject = projectsData[currentIndex];


  const handleProjectChange = (newIndex: number) => {
    const newDirection = newIndex > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  };

  // Remplacez les lignes où vous appelez handlePrevious et handleNext
  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleProjectChange(currentIndex - 1);
    }
  };


  const handleNext = () => {
    if (currentIndex < projectsData.length - 1) {
      handleProjectChange(currentIndex + 1);
    }
  };


  const handleFadeToBlack = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate(`/${lang}/project/${currentProject.id}`);
    }, 700);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px est le breakpoint md de Tailwind
    };

    // Vérifier initialement
    checkMobile();

    // Ajouter un listener pour le redimensionnement
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative text-white">
      <WavyBackground
          key={currentProject.id} // Utiliser l'ID du projet comme clé unique
          colors={currentProject.waveColors} // Utiliser directement les couleurs du projet actuel
          blur={10}
          speed="fast"
          waveOpacity={0.5}
        />
        {/* Main content container with relative positioning */}
        <div className="relative">
          {/* Project content area */}
          <div className="min-h-screen py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
              >
                {t('projects.title')}
              </motion.h2>
              
              <motion.p 
                className="text-sm md:text-base text-neutral-400 mb-8 md:mb-12"
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('projects.description')}
              </motion.p>
            
              <motion.div 
                ref={contentRef}
                className="relative w-full max-w-7xl mx-auto"
                animate={isContentInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0 
                } : { 
                  opacity: 0, 
                  scale: 0.95,
                  y: 50 
                }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-[500px] md:h-[500px] lg:h-[600px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 }
                      }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <motion.div
                        className="absolute inset-0"
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <img 
                          src={isMobile ? currentProject.img_mobile : currentProject.img}
                          alt={t(`projects.${currentProject.translationKey}.title`)}
                          className="select-none pointer-events-none w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="absolute bottom-0 left-0 w-full p-3 md:p-8 lg:p-12 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl"
                      >
                        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-3 text-white/95 flex items-center flex-wrap gap-y-2">
                          {t(`projects.${currentProject.translationKey}.title`)}
                          <ProjectBadge type={t(`projects.${currentProject.translationKey}.type`)} />
                        </h3>
                        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-2 md:mb-4">
                          {t(`projects.${currentProject.translationKey}.subtitle`)}
                        </p>
                        <p className="text-sm md:text-base lg:text-lg text-white/80 line-clamp-2 md:line-clamp-none">
                          {t(`projects.${currentProject.translationKey}.description`)}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    
                    <motion.button
                      className="px-4 py-2 md:px-6 lg:px-8 md:py-3 lg:py-4 rounded-full bg-white text-black text-sm md:text-base lg:text-lg hover:bg-white/10 hover:text-white transition-colors font-semibold"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFadeToBlack}
                    >
                      {t('projects.learnMore')}
                    </motion.button>
                  </div>
                </div>
  
                <motion.div 
                  className="flex justify-center items-center gap-2 md:gap-4 my-8 md:my-12 lg:my-16"
                  animate={isContentInView ? { 
                    opacity: 1, 
                    y: 0 
                  } : { 
                    opacity: 0, 
                    y: 20 
                  }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    whileTap={currentIndex !== 0 ? { scale: 0.95 } : undefined}
                    className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base ${
                      currentIndex === 0 ? 'text-neutral-500' : 'text-white hover:bg-white/10'
                    } transition-colors`}
                  >
                    <ChevronLeft />
                    <span className="hidden md:inline">{t('projects.previous')}</span>
                  </motion.button>
  
                  <div className="flex gap-1 md:gap-2">
                    {projectsData.map((_, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.75 }}
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === currentIndex ? 'w-6 md:w-8 bg-white' : 'w-1.5 md:w-2 bg-white/30'
                        }`}
                        onClick={() => handleProjectChange(i)}
                      />
                    ))}
                  </div>
  
                  <motion.button
                    onClick={handleNext}
                    disabled={currentIndex === projectsData.length - 1}
                    whileTap={currentIndex !== projectsData.length - 1 ? { scale: 0.95 } : undefined}
                    className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base ${
                      currentIndex === projectsData.length - 1 ? 'text-neutral-500' : 'text-white hover:bg-white/10'
                    } transition-colors`}
                  >
                    <span className="hidden md:inline">{t('projects.next')}</span>
                    <ChevronRight />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
  
          {/* Transition area */}
          <div className="relative h-[40vh]">
            {/* Gradient for smooth transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none" />
            
            {/* Particle fade out effect */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>
        </div>
      </section>
  
      <AnimatePresence>
        {isFading && (
          <motion.div 
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;