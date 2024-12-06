import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";
import logo from '../../assets/logo_computer.svg';
import banner from '../../assets/banner.png';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, children, className = "" }: FeatureCardProps) => {
  const cardRef = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isInView = useInView(cardRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
      setShouldAnimate(true);
    } else if (!isInView && hasBeenVisible) {
      const timeout = setTimeout(() => {
        setShouldAnimate(false);
        setHasBeenVisible(false);
      }, 500); // Durée de l'animation de sortie
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasBeenVisible]);

  return (
    <motion.div
      ref={cardRef}
      animate={shouldAnimate
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.5 }}
  className={`rounded-lg bg-white/90 flex flex-col ${className} rounded-t-xl shadow-[12px_12px_10px_rgba(0,0,0,0.2)] h-full`}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="select-none pointer-events-none w-full h-24 md:h-32 rounded-t-xl flex items-center justify-center bg-cover bg-center shrink-0"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <motion.div
          animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="scale-75 md:scale-100"
        >
          {children}
        </motion.div>
      </div>
      <div className="p-4 md:p-8 flex flex-col h-full">
        <motion.h3
          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl font-bold text-black mb-1"
        >
          {title}
        </motion.h3>
        <motion.p
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
          className="ml-5 text-neutral-500 leading-relaxed text-sm md:text-base overflow-y-auto whitespace-pre-line"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

interface WaveTransitionProps {
  direction?: 'up' | 'down';
  color?: string;
  className?: string;
}

const WaveTransition = ({ 
  direction = 'down',
  color = '#0099ff',
  className = ''
}: WaveTransitionProps) => {
  return (
    <div 
      className={`w-full h-48 overflow-hidden ${
        direction === 'up' ? '-mb-1' : '-mt-1'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ 
          transform: direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        {/* Première vague avec la couleur exacte passée en paramètre */}
        <path
          d="M0,0 C400,40 800,80 1200,40 L1200,120 L0,120 Z"
          fill={color}
          className="translate-x-0"
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
          fill={color}
          opacity="0.5"
          className="translate-x-0"
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
          fill={color}
          opacity="0.2"
          className="translate-x-0"
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

const LongFeatureCard = ({ title, description, children }: FeatureCardProps) => {
  const cardRef = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isInView = useInView(cardRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
      setShouldAnimate(true);
    } else if (!isInView && hasBeenVisible) {
      const timeout = setTimeout(() => {
        setShouldAnimate(false);
        setHasBeenVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasBeenVisible]);

  return (
    <div className="transform-gpu">
      <motion.div 
        ref={cardRef}
        initial={false}
        animate={shouldAnimate ? { 
          opacity: 1, 
          y: 0,
          scale: 1,
        } : { 
          opacity: 0, 
          y: 50,
          scale: 0.9,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 rounded-lg flex flex-col md:flex-row col-span-2 shadow-[12px_12px_10px_rgba(0,0,0,0.2)] w-full h-full overflow-hidden">
        <div 
          className="select-none pointer-events-none w-full md:w-1/2 h-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center md:items-end justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <motion.div 
            animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="scale-75 md:scale-100 m-3"
          >
            {children}
          </motion.div>
        </div>
        <div className='w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center'>
          <motion.h3 
            animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl font-bold text-black mb-1"
          >
            {title}
          </motion.h3>
          <motion.p 
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="ml-5 text-neutral-500 leading-relaxed text-sm md:text-base whitespace-pre-line"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const titleRef = useRef(null);

  const features = [
    {
      title: t('about.longCard'),
      description: t('about.longCardDesc'),
      long: true,
      visual: <img src={logo} alt="Profile" className="w-48 md:w-64 h-48 md:h-64" />
    },
    {
      title: t('about.card1'),
      description: t('about.card1Desc'),
    },
    {
      title: t('about.card2'),
      description: t('about.card2Desc'),
    },
    {
      title: t('about.card3'),
      description: t('about.card3Desc'),
    },
  ];

  return (
    <section className="min-h-screen relative">
      <WaveTransition direction="down" color="#0099ff" />
      <div id="about" className="bg-gradient-to-b from-[#0099ff] via-sky-500 to-sky-400">
        <div className="max-w-7xl mx-auto relative z-10 py-16 md:py-32 px-4 md:px-8">
          <div ref={titleRef} className="text-center mb-8 md:mb-16">
            <div className="flex flex-col justify-start *:w-fit">
              <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-[5px_5px_5px_rgba(0,0,0,0.4)]">
                {t('about.title')}  
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative min-h-[800px]">

            {/* Carte longue en bas */}
            <div className="col-span-1 md:col-span-2">
              <LongFeatureCard 
                title={features[0].title} 
                description={features[0].description}
                className="h-full"
              >
                {features[0].visual}
              </LongFeatureCard>
            </div>

            {/* Colonne de gauche */}
            <div className="flex flex-col gap-4 md:gap-6 h-full">
              {/* Carte en haut à gauche */}
              <div className="flex-1">
                <FeatureCard 
                  title={features[1].title} 
                  description={features[1].description}
                  className="h-full"
                >
                  {features[1].visual}
                </FeatureCard>
              </div>
              {/* Nouvelle petite carte en bas à gauche */}
              <div className="flex-1">
                <FeatureCard 
                  title={features[3].title} 
                  description={features[3].description}
                  className="h-full"
                >
                  {features[3].visual}
                </FeatureCard>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="h-full">
              <FeatureCard 
                title={features[2].title} 
                description={features[2].description}
                className="h-full"
              >
                {features[2].visual}
              </FeatureCard>
            </div>


          </div>
        </div>
      </div>
      <WaveTransition direction="up" color="#38bdf8" />
    </section>
  );
};

export default AboutSection;