import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";
import logo from '../../assets/logo_computer.svg';
import peace from '../../assets/peace.svg';
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
      className={`rounded-lg bg-white/90 flex flex-col ${className} rounded-t-xl shadow-[12px_12px_10px_rgba(0,0,0,0.2)] h-[300px] md:h-[400px]`}
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
    <motion.div 
      ref={cardRef}
      animate={shouldAnimate ? { 
        opacity: 1, 
        y: 0,
        scale: 1,
      } : { 
        opacity: 0, 
        y: 50,
        scale: 0.9,
      }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 rounded-lg flex flex-col md:flex-row col-span-2 h-auto md:h-[350px] shadow-[12px_12px_10px_rgba(0,0,0,0.2)] w-full"
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="select-none pointer-events-none w-full md:w-1/2 h-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center md:items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <motion.div 
          animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="scale-75 md:scale-100 mb-0 md:mb-8"
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
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.3 });

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
      visual: <img src={peace} alt="Languages and Skills" className="w-16 md:w-24 h-16 md:h-24" />
    },
    {
      title: t('about.card2'),
      description: t('about.card2Desc'),
      visual: <img src={logo} alt="Contact info" className="w-16 md:w-24 h-16 md:h-24" />
    },
  ];

  return (
    <section id="about" className="min-h-screen relative py-16 md:py-32 px-4 md:px-8 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-400">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-8 md:mb-16">
          <div className="flex flex-col justify-start *:w-fit">
            {[t('about.title1'), t('about.title2'), t('about.title3'), t('about.title4')].map((text, index) => (
              <motion.p
                key={index}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  x: [0, 8, 0]
                } : {
                  opacity: 0,
                  y: 20,
                  x: 0
                }}
                transition={{
                  opacity: { duration: 0.8, delay: index * 0.15 },
                  y: { duration: 0.8, delay: index * 0.15 },
                  x: { duration: 2, repeat: Infinity, repeatType: "loop", delay: index * 0.2 }
                }}
                className="text-2xl md:text-4xl font-bold text-white drop-shadow-[12px_12px_10px_rgba(0,0,0,0.2)]"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative">
          <div className="col-span-1 md:col-span-2">
            <LongFeatureCard 
              title={features[0].title} 
              description={features[0].description}
            >
              {features[0].visual}
            </LongFeatureCard>
          </div>

          {features.slice(1).map((feature, index) => (
            <div key={index}>
              <FeatureCard 
                title={feature.title} 
                description={feature.description}
              >
                {feature.visual}
              </FeatureCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;