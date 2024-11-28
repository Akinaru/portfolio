import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo_memo.webp';

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
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center text-white max-w-7xl mx-auto relative z-10"
      >
        <motion.div variants={logoVariants} className="mb-8">
          <motion.img
            src={logo}
            alt={t('home.profileAlt')}
            className="w-32 h-32 rounded-full mx-auto floating-element"
          />
        </motion.div>
        
        <motion.h1 
  variants={itemVariants} 
  className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-8 md:mb-12 lg:mb-16 shimmer"
>
  Maxime Gallotta
</motion.h1>

<motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl">
  <span>🖥️</span>
  <span className="text-neutral-600 ml-2 md:ml-3">{t('home.title')}</span>
</motion.p>

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