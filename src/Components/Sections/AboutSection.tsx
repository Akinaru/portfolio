import { motion } from "framer-motion";

const AboutSection = () => (
    <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-t from-[#0f0f0f] via-[#121212] to-[#151515]">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl text-white"
    >
      <h2 className="text-3xl font-bold mb-8">À propos</h2>
      <p className="text-neutral-300 leading-relaxed mb-8">
        Passionné par le développement web depuis plus de 5 ans, je crée des applications
        modernes et performantes en utilisant les dernières technologies.
      </p>
      <div className="grid grid-cols-2 gap-8">
        {/* Skills and tools sections... */}
      </div>
    </motion.div>
  </section>
)

export default AboutSection;