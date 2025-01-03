import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ContactSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: false, amount: 0.2 });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormStatus('idle');
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  const inputClasses = "w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-[background,border,box-shadow] duration-200 text-white placeholder-white/50";
  
  
  return (
    <section id="contact" ref={sectionRef} className="bg-black relative text-white">
      <div className="relative">
        <div className="min-h-screen py-16 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Title */}
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              {t('contact.title', 'Contact')}
            </motion.h2>
            
            <motion.p 
              className="text-sm md:text-base text-neutral-400 mb-8 md:mb-12"
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('contact.description', "Let's get in touch! Fill out the form below and I'll get back to you as soon as possible.")}
            </motion.p>

            <motion.div
              ref={formRef}
              className="relative max-w-7xl mx-auto"
              animate={isFormInView ? { 
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative backdrop-blur-sm rounded-xl p-6 md:p-8 bg-black/30 border border-white/10 shadow-lg overflow-hidden">
                  
                  <div className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-200 mb-2">
                          {t('contact.form.name', 'Name')}
                        </label>
                        <input
                          type="text"
                          required
                          className={`${inputClasses} resize-none`}
                          placeholder={t('contact.form.namePlaceholder', 'Your name')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-200 mb-2">
                          {t('contact.form.email', 'Email')}
                        </label>
                        <input
                          type="email"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.emailPlaceholder', 'your@email.com')}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-200 mb-2">
                        {t('contact.form.subject', 'Subject')}
                      </label>
                      <input
                        type="text"
                        required
                        className={inputClasses}
                        placeholder={t('contact.form.subjectPlaceholder', 'What is this about?')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-200 mb-2">
                        {t('contact.form.message', 'Message')}
                      </label>
                      <textarea
                        required
                        rows={4}
                        className={`${inputClasses} min-h-[100px] max-h-[700px]`}
                        placeholder={t('contact.form.messagePlaceholder', 'Your message here...')}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' && t('contact.form.sending', 'Sending...')}
                      {formStatus === 'success' && t('contact.form.sent', 'Message Sent!')}
                      {formStatus === 'error' && t('contact.form.error', 'Error - Try Again')}
                      {formStatus === 'idle' && t('contact.form.submit', 'Send Message')}
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;