import React from 'react';
import { motion } from "framer-motion";
import logo from '../../assets/logo_computer.svg';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, children, className = "" }: FeatureCardProps) => (
  <motion.div 
    className={`rounded-lg bg-white backdrop-blur-sm flex flex-col gap-4 ${className} rounded-t-xl shadow-xl shadow-black/20 h-[500px]`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="bg-gradient-to-r from-sky-200/70 to-sky-200/30 w-full h-48 rounded-t-xl flex items-center justify-center">
      {children}
    </div>
    <div className='p-12'>
      <h3 className="text-2xl font-semibold text-black">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-base">{description}</p>
    </div>
  </motion.div>
 );
 
 const LongFeatureCard = ({ title, description, children }: FeatureCardProps) => (
<motion.div 
  className="bg-white rounded-lg backdrop-blur-sm flex flex-row md:col-span-2 h-[500px] shadow-xl shadow-black/20 w-full col-span-2"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
    <div className="bg-gradient-to-r from-sky-200/70 to-sky-200/30 w-1/2 rounded-l-lg flex items-center justify-center">
      {children}
    </div>
    <div className='w-1/2 p-12 flex flex-col justify-center'>
      <h3 className="text-2xl font-semibold text-black">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-base">{description}</p>
    </div>
  </motion.div>
 );

const AboutSection = () => {
  const features = [
    {
      title: "Développement Web",
      description: "Passionné par le développement web et mobile, je maîtrise React, TypeScript et d'autres frameworks modernes. J'aime créer des interfaces élégantes et intuitives qui offrent une expérience utilisateur optimale.",
      visual: <img src={logo} alt="Avatar with laptop" className="w-36 h-36" />
    },
    {
      title: "Musique",
      description: "La musique occupe une place importante dans ma vie. Je joue de plusieurs instruments et m'intéresse à la production musicale. Cette passion me permet de développer ma créativité et ma sensibilité artistique.",
      visual: <img src={logo} alt="Avatar with laptop" className="w-36 h-36" />
    },
    {
      title: "Formation & Objectifs",
      description: "Actuellement étudiant en informatique, je me spécialise dans le développement d'applications. Mon parcours combine études théoriques et projets pratiques, avec un intérêt particulier pour le sport qui m'aide à maintenir un équilibre et développer mon esprit d'équipe.",
      long: true,
      visual: <img src={logo} alt="Avatar with laptop" className="w-48 h-48" />
    }
   ];
  return (
    <section className="min-h-screen relative py-24 px-8 bg-gradient-to-b from-[#0079EC] to-[#8ed0ff]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex flex-col justify-start *:w-fit">
            {["Créativité.", "Inoovation.", "Passion."].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.3,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                className="text-7xl font-bold text-white drop-shadow-md"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
   
        <div className="grid grid-cols-2 gap-8 relative">
  {features.slice(0, 2).map((feature, index) => (
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
          duration: 0.8,
          delay: 0.6 + (index * 0.2),
          ease: [0.16, 1, 0.3, 1]
        }
      }}
    >
      <FeatureCard title={feature.title} description={feature.description}>
        {feature.visual}
      </FeatureCard>
    </motion.div>
  ))}
  
  <motion.div
    className="col-span-2"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }}
  >
    <LongFeatureCard 
      title={features[2].title} 
      description={features[2].description}
    >
      {features[2].visual}
    </LongFeatureCard>
  </motion.div>
</div>
      </div>
    </section>
   );
};

export default AboutSection;