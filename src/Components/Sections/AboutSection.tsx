import React from 'react';
import { motion } from "framer-motion";
import logo from '../../assets/logo_computer.svg';
import goal from '../../assets/goal.svg';
import peace from '../../assets/peace.svg';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, children, className = "" }: FeatureCardProps) => (
  <motion.div 
    className={`rounded-lg bg-white/90 flex flex-col gap-4 ${className} rounded-t-xl shadow-lg shadow-black/25 h-[500px]`}
    transition={{ duration: 0.2 }}
  >
    <div className="bg-gradient-to-r from-sky-200/70 to-sky-200/30 w-full h-48 rounded-t-xl flex items-center justify-center">
      {children}
    </div>
    <div className='p-12'>
      <h3 className="text-2xl font-bold text-black mb-1">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-base">{description}</p>
    </div>
  </motion.div>
);

const LongFeatureCard = ({ title, description, children }: FeatureCardProps) => (
  <motion.div 
    className="bg-white/90 rounded-lg flex flex-row md:col-span-2 h-[500px] shadow-lg shadow-black/25 w-full col-span-2"
    transition={{ duration: 0.2 }}
  >
    <div className="bg-gradient-to-r from-sky-200/70 to-sky-200/30 w-1/2 rounded-l-lg flex items-end justify-center">
      {children}
    </div>
    <div className='w-1/2 p-12 flex flex-col justify-center'>
      <h3 className="text-2xl font-bold text-black mb-1">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-base">{description}</p>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const features = [
    {
      title: "👨‍💻 Présentation",
      description: "20 ans, basé à Annecy (74000), je suis passionné par le développement web le sport et la musique.",
      visual: <img src={peace} alt="Avatar with laptop" className="w-36 h-36" />
    },
    {
      title: "🌐 Compétences linguistiques",
      description: "Trilingue avec une excellente maîtrise du Français (langue maternelle), de l'Anglais (C2 intermédiaire), et de l'Italien (B2 intermédiaire).",
      visual: <img src={goal} alt="Languages icon" className="w-36 h-36" />
    },
    {
      title: "🎯 Objectifs & Expérience",
      description: "Spécialisé dans le développement web et les algorithmes, je suis actuellement chercheur au LISMB. Mon expertise s'étend de la réalisation de catalogues au développement full-stack, avec une appétence particulière pour la programmation et la résolution de problèmes complexes.",
      long: true,
      visual: <img src={logo} alt="Goals icon" className="w-96 h-96" />
    },
    {
      title: "👨‍💻 Présentation",
      description: "20 ans, basé à Annecy (74000), je suis passionné par le développement web le sport et la musique.",
      visual: <img src={logo} alt="Avatar with laptop" className="w-36 h-36" />
    },
    {
      title: "🌐 Compétences linguistiques",
      description: "Trilingue avec une excellente maîtrise du Français (langue maternelle), de l'Anglais (C2 intermédiaire), et de l'Italien (B2 intermédiaire).",
      visual: <img src={goal} alt="Languages icon" className="w-36 h-36" />
    },
  ];

  return (
    <section id="about" className="min-h-screen relative py-24 px-8 bg-gradient-to-b from-[#0079EC] to-[#8ed0ff]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex flex-col justify-start *:w-fit">
            {["Innovation.", "Expertise.", "Excellence."].map((text, index) => (
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
                className="text-7xl font-bold text-white drop-shadow-md"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 relative">
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
              title={features[2].title} 
              description={features[2].description}
            >
              {features[2].visual}
            </LongFeatureCard>
          </motion.div>

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

          {features.slice(3, 5).map((feature, index) => (
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