import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const experienceKeys = ['fullstack', 'polyvalent', 'helpHub', 'webmecanik'];

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { t } = useTranslation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });

  return (
    <>
      <section id="experience" ref={sectionRef} className="bg-black relative text-white">
        <div className="relative">
          <div className="min-h-screen py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
              >
                {t('experience.title')}
              </motion.h2>
              
              <motion.p 
                className="text-sm md:text-base text-neutral-400 mb-8 md:mb-12"
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('experience.description')}
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
                <div className="relative pl-4">
                  {experienceKeys.map((key, index) => (
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
                      {index !== experienceKeys.length - 1 && (
                        <div className="absolute left-0 top-3 bottom-0 w-px bg-white/20 transform -translate-x-1/2" />
                      )}
                      
                      <div className=" backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-white/5 transition-colors border border-white/10 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                          <h3 className="text-xl md:text-2xl font-bold text-white">
                            {t(`experience.${key}.title`)}
                          </h3>
                          <span className="text-sm text-neutral-200">
                            {t(`experience.${key}.date`)}
                          </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-lg text-white">
                            {t(`experience.${key}.company`)} - {t(`experience.${key}.location`)}
                          </p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs md:text-sm font-medium bg-white/20 text-white mt-2">
                            {t(`experience.${key}.type`)}
                          </span>
                        </div>

                        <p className="text-neutral-100">
                          {t(`experience.${key}.description`)}
                        </p>
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