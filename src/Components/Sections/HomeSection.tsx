import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from '../../assets/logo_memo.webp';

const HomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const text = "Étudiant en Informatique";

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
            className="w-32 h-32 rounded-full mx-auto floating-element"
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
          className="text-2xl"
        >
          <span>🖥️ </span>
          <span className="wave-text">
            {text.split("").map((char, index) => (
              <span 
                key={index} 
                className={char === " " ? "space" : "wave-letter"}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
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

          .floating-element {
            animation: float 4s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
          }

          .wave-text {
            color: #808080;
            display: inline-block;
          }

          .wave-letter {
            display: inline-block;
            animation: wave 3s ease-in-out infinite;
          }

          .space {
            display: inline-block;
            width: 0.3em;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-5px);
              opacity: 1;
            }
          }

          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-3px);
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HomeSection;