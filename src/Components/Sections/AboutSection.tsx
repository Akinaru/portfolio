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
    className={`rounded-lg bg-white/90 flex flex-col gap-4 ${className} rounded-t-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] h-[350px]`}
    transition={{ duration: 0.2 }}
  >
    <div className="bg-gradient-to-r from-sky-200/70 to-sky-200/30 w-full h-32 rounded-t-xl flex items-center justify-center">
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
    className="bg-white/90 rounded-lg flex flex-row md:col-span-2 h-[350px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-full col-span-2"
    transition={{ duration: 0.2 }}
  >
    <div className="bg-gradient-to-r from-sky-200/70 to-sky-200/30 w-1/2 rounded-l-lg flex items-end justify-center">
      {children}
    </div>
    <div className='w-1/2 p-8 flex flex-col justify-center'>
      <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
      <p className="text-neutral-500 leading-relaxed text-sm whitespace-pre-line">{description}</p>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const features = [
    {
      title: "🎓 Présentation",
      description: "Je suis étudiant en 2ème année de BUT Informatique à l'IUT d'Annecy, spécialisé en développement.\n\nPassionné par la musculation, le codage, les jeux vidéo et la musique. La programmation est une seconde nature.\n\nJ'aime chercher les solutions les plus équipées pour prendre des décisions réfléchies.",
      long: true,
      visual: <img src={logo} alt="Profile" className="w-64 h-64" />
    },
    {
      title: "🎯 Formation",
      description: "BUT INFORMATIQUE (BACHELOR UNIVERSITAIRE DE TECHNOLOGIE)\nUMR / UT (ANEC) - Annecy-le-Vieux, France\nSeptembre 2022 - Présent\n\nBAC TECHNOLOGIQUE STI2D AVEC MENTION BIEN (SIN)\nLycée Louis Lachenal - Argonay, France\nJuillet 2022",
      visual: <img src={goal} alt="Education" className="w-24 h-24" />
    },
    {
      title: "🌐 Langues & Compétences",
      description: "Langues :\n• Français : Langue maternelle\n• Anglais : B2 intermédiaire\n• Italien : B2 intermédiaire\n\nCompétences :\n• Web : HTML, CSS, PHP, JavaScript\n• Programmation : C#, Python\n• Base de données : MySQL, PostgreSQL",
      visual: <img src={peace} alt="Languages and Skills" className="w-24 h-24" />
    },
    {
      title: "📍 Contact & Localisation",
      description: "Adresse :\n3 Rue sainte bernadette\n74940 Annecy, France\n\nContact :\n+33(0)7 85 83 60 07\nmaxime@gmail.fr\n\nPermis B",
      visual: <img src={logo} alt="Contact info" className="w-24 h-24" />
    },
    {
      title: "👨‍💻 Expérience",
      description: "DÉVELOPPEUR FULLSTACK\nMetanwork - Annecy, France\nAvril 2023 - Présent\n\nCréation d'une application de gestion pour étudiants avec aspects sociaux et gestion privée.",
      visual: <img src={goal} alt="Experience" className="w-24 h-24" />
    },
  ];

  return (
    <section id="about" className="min-h-screen relative py-16 px-8 bg-gradient-radial-chaos">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex flex-col justify-start *:w-fit">
            {["Développement.", "Innovation.", "Excellence."].map((text, index) => (
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
                className="text-6xl font-bold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.35)]"
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

      <style>
        {`
          .bg-gradient-radial-chaos {
            background: radial-gradient(circle at 10% 20%, rgb(0, 160, 240) 0%, rgb(0, 200, 255) 90.1%),
                        radial-gradient(circle at 80% 60%, rgb(0, 120, 220) 0%, rgb(0, 180, 255) 100%);
            background-blend-mode: overlay;
            position: relative;
            overflow: hidden;
          }

          .bg-gradient-radial-chaos::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 70% 30%, rgb(0, 140, 230) 0%, transparent 70%);
            mix-blend-mode: overlay;
            pointer-events: none;
          }
        `}
      </style>
    </section>
  );
};

export default AboutSection;