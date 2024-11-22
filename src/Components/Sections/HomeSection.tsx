import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from '../../assets/logo.webp'

const HomeSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

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
  }

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
  }

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
  }

  return (
    <section ref={ref} id="home" className="h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#151515]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center text-white"
      >
        <motion.div 
          variants={logoVariants}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-8xl font-bold mb-4 animated-gradient"
          style={{
            background: "linear-gradient(-45deg, white 30%, rgb(107 114 128) 50%, white 70%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "shine 3s linear infinite"
          }}
        >
          Maxime Gallotta
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-2xl text-neutral-400 tracking-wider"
        >
          Étudiant en Informatique
        </motion.p>
      </motion.div>

      <style>
        {`
          @keyframes shine {
            to {
              backgroundPosition: 200% center;
            }
          }
        `}
      </style>
    </section>
  )
}

export default HomeSection;