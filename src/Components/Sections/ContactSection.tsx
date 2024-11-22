import { motion } from "framer-motion"

const ContactSection = () => (
    <section id="contact" className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-t from-[#0f0f0f] via-[#121212] to-[#151515]">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl w-full text-white"
    >
      <h2 className="text-3xl font-bold mb-8">Contact</h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm">Nom</label>
          <input
            type="text"
            className="w-full bg-neutral-800 rounded p-3"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full bg-neutral-800 rounded p-3"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Message</label>
          <textarea
            className="w-full bg-neutral-800 rounded p-3 min-h-32"
          />
        </div>
        <button className="w-full bg-white text-black font-medium py-3 rounded">
          Envoyer
        </button>
      </form>
    </motion.div>
  </section>
)

export default ContactSection;