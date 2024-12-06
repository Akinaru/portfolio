import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo_memo.webp';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 0.85], // Opacité réduite
      y: [20, 0],
      transition: { duration: 1, delay: 2 }
    });

    const checkScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0 && isVisible) {
        controls.start({
          opacity: 0,
          transition: { duration: 0.5 }
        });
        setTimeout(() => setIsVisible(false), 500);
      } else if (scrollPosition === 0 && !isVisible) {
        setIsVisible(true);
        // Animation complète de réapparition
        controls.start({
          opacity: [0, 0.85], // Même animation que l'apparition initiale
          y: [20, 0],
          transition: { duration: 1 }
        });
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    checkScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
    >
      <motion.div
          data-hover
          className="absolute w-8 h-14 top-28 rounded-full border-2 border-white/20 flex justify-center p-1.5"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          initial={{
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}
      >
        <motion.div
          className="w-1 rounded-full bg-white/50"
          animate={{
            height: ["30%", "60%", "30%"],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.76, 0, 0.24, 1]
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const HomeSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const logoVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center mb-1">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="select-none text-center text-white max-w-7xl mx-auto relative z-10"
      >
        <motion.div 
          variants={logoVariants} 
          className="mb-8 select-none pointer-events-none"
          draggable="false"
        >
          <motion.img
            src={logo}
            alt={t('home.profileAlt')}
            className="w-32 h-32 rounded-full mx-auto floating-element select-none pointer-events-none"
            draggable="false"
          />
        </motion.div>
                
        <motion.h1 
          variants={itemVariants} 
          className="select-none text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-8 md:mb-12 lg:mb-16 shimmer"
        >
          Maxime Gallotta
        </motion.h1>

        <motion.p variants={itemVariants} className="select-none text-base md:text-lg lg:text-xl xl:text-2xl mb-8">
          <span>🖥️</span>
          <span className="text-neutral-600 ml-2 md:ml-3">{t('home.title')}</span>
        </motion.p>
        <div className="relative">
          <ScrollIndicator />
        </div>
      </motion.div>

      <style>
        {`
          .shimmer {
            background: linear-gradient(90deg, #ffffff 0%, #808080 50%, #ffffff 100%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shine 3s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HomeSection;