import React from 'react';
import { motion } from "framer-motion";
import logo from '../../assets/logo_computer.svg';
import goal from '../../assets/goal.svg';
import peace from '../../assets/peace.svg';
import banner from '../../assets/banner.png';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, children, className = "" }: FeatureCardProps) => (
  
  <motion.div 
    className={`rounded-lg bg-white/90 flex flex-col gap-4 ${className} rounded-t-xl shadow-[12px_12px_10px_rgba(0,0,0,0.2)] h-[350px]`}
    transition={{ duration: 0.2 }}
  >
    <div 
      className="w-full h-32 rounded-t-xl flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {children}
    </div>
    <div className='p-8'>
      <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-sm whitespace-pre-line">{description}</p>
    </div>
  </motion.div>
);

const LongFeatureCard = ({ title, description, children }: FeatureCardProps) => (
  <motion.div 
    className="bg-white/90 rounded-lg flex flex-row md:col-span-2 h-[350px] shadow-[12px_12px_10px_rgba(0,0,0,0.2)] w-full col-span-2"
    transition={{ duration: 0.2 }}
  >
    <div 
      className="w-1/2 rounded-l-lg flex items-end justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {children}
    </div>
    <div className='w-1/2 p-8 flex flex-col justify-center'>
      <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-sm whitespace-pre-line">{description}</p>
    </div>
  </motion.div>
);

const AboutSection = () => {
const { t } = useTranslation();
  const features = [
    {
      title: t('about.longCard'),
      description: t('about.longCardDesc'),
      long: true,
      visual: <img src={logo} alt="Profile" className="w-64 h-64" />
    },
    {
      title: t('about.card1'),
      description: t('about.card1Desc'),
      visual: <img src={peace} alt="Languages and Skills" className="w-24 h-24" />
    },
    {
      title: t('about.card2'),
      description: t('about.card2Desc'),
      visual: <img src={logo} alt="Contact info" className="w-24 h-24" />
    },
  ];

  return (
    <section id="about" className="min-h-screen relative py-32 px-8 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-400">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex flex-col justify-start *:w-fit">
            {[t('about.title1'), t('about.title2'), t('about.title3')].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                animate={{
                  x: [0, 8, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl font-bold text-white drop-shadow-[12px_12px_10px_rgba(0,0,0,0.2)]"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 relative">
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <LongFeatureCard 
              title={features[0].title} 
              description={features[0].description}
            >
              {features[0].visual}
            </LongFeatureCard>
          </motion.div>

          {features.slice(1).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -50 : 50
              }}
              whileInView={{ 
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FeatureCard title={feature.title} description={feature.description}>
                {feature.visual}
              </FeatureCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;