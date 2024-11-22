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
      className={`bg-white/5 rounded-lg backdrop-blur-sm flex flex-col gap-4 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-black/10 w-full h-48 rounded-t-lg flex items-center justify-center">
        {children}
      </div>
      <div className='p-12'>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-gray-200 leading-relaxed text-base">{description}</p>
      </div>
    </motion.div>
  );

const LongFeatureCard = ({ title, description, children }: FeatureCardProps) => (
  <FeatureCard 
    title={title} 
    description={description} 
    className="md:col-span-2 flex-row gap-8"
  >
    {children}
  </FeatureCard>
);

const AboutSection = () => {
  const features = [
    {
      title: "iCloud Private Relay",
      description: "Takes your privacy to the next level when browsing with Safari. It's designed to prevent websites and network providers from building a profile about you based on your IP address, location, and browsing activity - all while ensuring you're instantly protected.",
      visual: <img src={logo} alt="Avatar with laptop" className="w-36 h-36" />
    },
    {
      title: "Hide My Email",
      description: "Lets you generate unique, random email addresses that automatically forward to your personal inbox. You can use these whenever you reply or sign up for services, so you don't have to share your real email address.",
      visual: <div className="bg-white rounded-lg w-2/3 py-3 text-sm text-black font-bold flex items-center justify-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 7H3M15 12H3M3 17H15M21 17L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        maxime@gallotta.fr
      </div>
    },
    {
      title: "HomeKit Secure Video",
      description: "Enables activity detected by your security cameras to be recorded, analyzed on your home hub device, and uploaded to iCloud as you can view it. Video clips are encrypted end-to-end, so you can trust that your video is always private.",
      visual: <img src="/api/placeholder/400/200" alt="Device mockup" className="w-full h-48 object-contain" />,
      long: true
    }
  ];

  return (
    <section className="min-h-screen relative py-24 px-8 bg-[#0066FF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white leading-tight"
          >
            More privacy.<br/>
            More protection.<br/>
            More peace of mind.
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.slice(0, 2).map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description}>
              {feature.visual}
            </FeatureCard>
          ))}
          <LongFeatureCard title={features[2].title} description={features[2].description}>
            {features[2].visual}
          </LongFeatureCard>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;