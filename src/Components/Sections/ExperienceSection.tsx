import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Experience {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  type: string;
}

interface Study {
  title: string;
  place: string;
  date: string;
}

interface Experiences {
  title: string;
  [key: string]: Experience | string;
}

interface Studies {
  title: string;
  [key: string]: Study | string;
}

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { t } = useTranslation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });
  const experienceData = t('parcours.experiences', { returnObjects: true }) as Experiences;
  const studyData = t('parcours.study', { returnObjects: true }) as Studies;

  return (
    <>
      <section id="experience" ref={sectionRef} className="relative text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/30 to-black" />
        <div className="absolute inset-0" />
        
        <div className="relative">
          <div className="min-h-screen py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Title */}
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
              >
                {t('parcours.title')}
              </motion.h2>
              
              <motion.p 
                className="text-sm md:text-base text-neutral-400 mb-8 md:mb-12"
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('parcours.description')}
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
                {/* Experiences Section */}
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-8 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  {experienceData.title}
                </motion.h3>

                <div className="relative pl-4">
                  {Object.entries(experienceData)
                    .filter(([key]) => key !== 'title')
                    .map(([key, _], index, array) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className="relative pl-8 pb-12 md:pb-16"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-3 h-3 bg-white rounded-full transform -translate-x-1/2" />
                      
                      {/* Timeline line */}
                      {index !== array.length - 1 && (
                        <div className="absolute left-0 top-3 bottom-0 w-px bg-white/20 transform -translate-x-1/2" />
                      )}
                      
                      <div className="relative backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-black/20 transition-all duration-700 ease-in-out border border-white/10 shadow-lg overflow-hidden group">
                        <div className="absolute inset-0 opacity-0 scale-[0.98] group-hover:scale-[1.5] group-hover:opacity-[0.55] transition-all duration-700 ease-in-out bg-grid-white/[0.2]" />
                        <div className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-[0.15] transition-all duration-700 ease-in-out [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                        
                        <div className="relative z-10 scale-100 group-hover:scale-[0.98] transition-all duration-700 ease-in-out">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                            <h4 className="text-xl md:text-2xl font-bold text-white">
                              {t(`parcours.experiences.${key}.title`)}
                            </h4>
                            <span className="text-sm text-neutral-200">
                              {t(`parcours.experiences.${key}.date`)}
                            </span>
                          </div>

                          <div className="mb-4">
                            <p className="text-lg text-white">
                              {t(`parcours.experiences.${key}.company`)} - {t(`parcours.experiences.${key}.location`)}
                            </p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs md:text-sm font-medium bg-white/20 text-white mt-2">
                              {t(`parcours.experiences.${key}.type`)}
                            </span>
                          </div>

                          <p className="text-neutral-100">
                            {t(`parcours.experiences.${key}.description`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Studies Section */}
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-8 pl-4 mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  {studyData.title}
                </motion.h3>
                
                <div className="relative pl-4">
                  {Object.entries(studyData)
                    .filter(([key]) => key !== 'title')
                    .map(([key, _], index, array) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className="relative pl-8 pb-12 md:pb-16 last:pb-0"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-3 h-3 bg-white rounded-full transform -translate-x-1/2" />
                      
                      {/* Timeline line */}
                      {index !== array.length - 1 && (
                        <div className="absolute left-0 top-3 bottom-0 w-px bg-white/20 transform -translate-x-1/2" />
                      )}
                      
                      <div className="relative backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-black/20 transition-all duration-700 ease-in-out border border-white/10 shadow-lg overflow-hidden group">
                        <div className="absolute inset-0 opacity-0 scale-[0.98] group-hover:scale-[1.5] group-hover:opacity-[0.55] transition-all duration-700 ease-in-out bg-grid-white/[0.2]" />
                        <div className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-[0.15] transition-all duration-700 ease-in-out [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                        
                        <div className="relative z-10 scale-100 group-hover:scale-[0.98] transition-all duration-700 ease-in-out">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                            <h4 className="text-xl md:text-2xl font-bold text-white">
                              {t(`parcours.study.${key}.title`)}
                            </h4>
                            <span className="text-sm text-neutral-200">
                              {t(`parcours.study.${key}.date`)}
                            </span>
                          </div>

                          <p className="text-lg text-white">
                            {t(`parcours.study.${key}.place`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceSection;