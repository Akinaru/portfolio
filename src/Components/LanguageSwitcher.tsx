import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type FlagKey = 'fr'  | 'en' | 'it' | 'ja';

const Flags: Record<FlagKey, JSX.Element> = {
  fr: (
    <svg className="w-5 h-5" viewBox="0 0 640 480">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z"/>
        <path fill="#00267f" d="M0 0h213.3v480H0z"/>
        <path fill="#f31830" d="M426.7 0H640v480H426.7z"/>
      </g>
    </svg>
  ),
  en: (
    <svg className="w-5 h-5" viewBox="0 0 640 480">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
      <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
    </svg>
  ),
  it: (
    <svg className="w-5 h-5" viewBox="0 0 640 480">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z"/>
        <path fill="#009246" d="M0 0h213.3v480H0z"/>
        <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
      </g>
    </svg>
  ),
  ja: (
    <svg className="w-5 h-5" viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <circle fill="#bc002d" cx="320" cy="240" r="144"/>
    </svg>
  ),
};

interface Language {
  code: FlagKey;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (lang: FlagKey) => {
    i18n.changeLanguage(lang);
    const newPath = window.location.pathname.replace(/\/(fr|en|de|it)/, `/${lang}`);
    navigate(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="fixed bottom-6 right-6 z-[1000] text-white">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className="absolute bottom-full mb-2 right-0 w-40 bg-white/25 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
            >
              <div className="py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/20 transition-colors"
                  >
                    <span className="flex-shrink-0">{Flags[lang.code]}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 bg-white/25 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex-shrink-0">{Flags[currentLanguage.code]}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;