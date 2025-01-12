import React from 'react';
import { motion } from "framer-motion";
import logo from '../../assets/logo_computer.svg';
import banner from '../../assets/banner.png';
import { useTranslation } from 'react-i18next';

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

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}


const FeatureCard = ({ title, description, children, className = "" }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-lg bg-white/90 flex flex-col ${className} rounded-t-xl shadow-[12px_12px_10px_rgba(0,0,0,0.2)] h-full`}
    >
      <div
        className="select-none pointer-events-none w-full h-24 md:h-32 rounded-t-xl flex items-center justify-center bg-cover bg-center shrink-0 border-[0.5px] border-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="scale-75 md:scale-100">
          {children}
        </div>
      </div>
      <div className="p-4 md:p-8 flex flex-col h-full">
        <h3 className="text-lg md:text-xl font-bold text-black mb-1">
          {title}
        </h3>
        <p className="ml-5 text-neutral-500 leading-relaxed text-sm md:text-base overflow-y-auto whitespace-pre-line">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const LongFeatureCard = ({ title, description, children }: FeatureCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="transform-gpu">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white/90 rounded-lg flex flex-col md:flex-row col-span-2 shadow-[12px_12px_10px_rgba(0,0,0,0.2)] w-full h-full overflow-hidden"
      >
        <div 
          className="select-none pointer-events-none w-full md:w-1/2 h-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center md:items-end justify-center bg-cover bg-center border-[0.5px] border-white"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="scale-75 md:scale-100 m-3">
            {children}
          </div>
        </div>
        <div className='w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center'>
          <h3 className="text-lg md:text-xl font-bold text-black mb-1">
            {title}
          </h3>
          <p className="ml-5 text-neutral-500 leading-relaxed text-sm md:text-base whitespace-pre-line">
            {description}
          </p>
          <div className='w-full flex justify-center items-center mt-10'>
            <motion.a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center 
                gap-2 px-4 py-2 
                rounded-full text-sm
                text-neutral-500 hover:bg-neutral-200
                transition-colors
                w-fit
              "
            >
              <span>{t('about.cv')}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();

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
      <WaveTransition direction="down" color="#1E3A8A" />
      <div id="about" className="bg-gradient-to-b from-[#1E3A8A] via-[#172554] to-[#020617]">
        <div className="max-w-7xl mx-auto relative z-10 py-16 md:py-32 px-4 md:px-8">
          <div className="text-center mb-8 md:mb-16">
            <div className="flex flex-col justify-start *:w-fit">
              <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-[5px_5px_5px_rgba(0,0,0,0.4)]">
                {t('about.title')}  
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative min-h-[800px]">
            <div className="col-span-1 md:col-span-2">
              <LongFeatureCard 
                title={features[0].title} 
                description={features[0].description}
                className="h-full"
              >
                {features[0].visual}
              </LongFeatureCard>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 h-full">
              <div className="flex-1">
                <FeatureCard 
                  title={features[1].title} 
                  description={features[1].description}
                  className="h-full"
                >
                  {features[1].visual}
                </FeatureCard>
              </div>
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
      <WaveTransition direction="up" color="#020617" />
    </section>
  );
};

export default AboutSection;