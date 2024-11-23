import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from '../../assets/logo_memo.webp';

const HomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const logoVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      filter: "blur(10px)"
    },
    visible: {
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const glowAnimation = {
    initial: { boxShadow: "0 0 10px rgba(255,255,255,0.1)" },
    animate: {
      boxShadow: [
        "0 0 10px rgba(255,255,255,0.1)", 
        "0 0 20px rgba(255,255,255,0.2)", 
        "0 0 10px rgba(255,255,255,0.1)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} id="home" className="h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] via-[#161616] to-[#202020]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center text-white max-w-7xl mx-auto"
      >
        <motion.div 
          variants={logoVariants}
          className="mb-8"
        >
          <motion.img
            src={logo}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
            {...glowAnimation}
          />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-9xl font-bold mb-16 shimmer"
        >
          Maxime Gallotta
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-2xl text-neutral-400"
        >
          <span>🖥️ </span><span className="subtitle-shine  tracking-wider" data-text="Étudiant en Informatique">Étudiant en Informatique</span>
          
        </motion.p>
      </motion.div>

      <style>
        {`
          .shimmer {
            background: linear-gradient(
              90deg,
              #ffffff 0%,
              #808080 50%,
              #ffffff 100%
            );
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shine 3s linear infinite;
          }

          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }

          .subtitle-shine {
            position: relative;
            color: #808080;
          }

          .subtitle-shine::before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.8) 5%,
              transparent 10%
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 5s linear infinite;
          }

                    @keyframes shine {
            from {
              background-position: 150% center;
            }
            to {
              background-position: -50% center;
            }
        `}
      </style>
    </section>
  );
};

export default HomeSection;