import { motion } from 'framer-motion'

// Add this section to replace your existing projects section
const ProjectsSection = () => (
  <section id="projects" className="min-h-screen p-8 pt-24 bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#151515]">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-12 text-white">Mes Projets</h2>
      
      <div className="grid grid-cols-4 auto-rows-[240px] gap-4">
        {/* Featured Project */}
        <motion.div
          className="col-span-2 row-span-2 relative group overflow-hidden rounded-3xl bg-neutral-900"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/project1.jpg" 
            alt="iGoods App"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
            <p className="text-neutral-400 mb-2 text-sm">FEATURED PROJECT</p>
            <h3 className="text-2xl font-bold text-white mb-2">iGoods Redesign</h3>
            <p className="text-neutral-300">Increased conversion rate by 70%</p>
          </div>
        </motion.div>

        {/* ASO Project */}
        <motion.div
          className="col-span-2 relative group overflow-hidden rounded-3xl bg-neutral-900"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-800 p-6">
            <p className="text-neutral-400 mb-2 text-sm">ASO OPTIMIZATION</p>
            <h3 className="text-xl font-bold text-white mb-2">300K MAU Achievement</h3>
            <p className="text-neutral-300">40.3% to 53.8% conversion improvement</p>
          </div>
        </motion.div>

        {/* Memo App */}
        <motion.div
          className="relative group overflow-hidden rounded-3xl bg-neutral-900"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-purple-800/50 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Memo App</h3>
            <p className="text-neutral-300">Language learning through memes</p>
          </div>
        </motion.div>

        {/* Award */}
        <motion.div
          className="relative group overflow-hidden rounded-3xl bg-neutral-900"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/50 to-yellow-800/50 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Awwwards</h3>
            <p className="text-neutral-300">Best Agency Recognition</p>
          </div>
        </motion.div>

        {/* Additional Projects */}
        <motion.div
          className="col-span-2 relative group overflow-hidden rounded-3xl bg-neutral-900"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-800/50 p-6">
            <h3 className="text-xl font-bold text-white mb-2">More Projects</h3>
            <p className="text-neutral-300">Discover my other work</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-800/50 text-sm text-white">Web Apps</span>
              <span className="px-3 py-1 rounded-full bg-blue-800/50 text-sm text-white">Mobile</span>
              <span className="px-3 py-1 rounded-full bg-blue-800/50 text-sm text-white">Design</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
)

export default ProjectsSection