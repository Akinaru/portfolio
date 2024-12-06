import { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './lang/i18n';
import './App.css';
import LanguageSwitcher from './Components/LanguageSwitcher';

function App() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
  
    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);
  
    window.addEventListener('mousemove', handleMouseMove);
    // Modification ici pour inclure .hover
    document.querySelectorAll('a, button, [data-hover]').forEach(element => {
      element.addEventListener('mouseenter', handleMouseOver);
      element.addEventListener('mouseleave', handleMouseOut);
    });
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // N'oubliez pas de mettre à jour aussi le cleanup
      document.querySelectorAll('a, button, .hover').forEach(element => {
        element.removeEventListener('mouseenter', handleMouseOver);
        element.removeEventListener('mouseleave', handleMouseOut);
      });
    };
  }, []);

  useEffect(() => {
    if (lang && (lang === "en" || lang === "fr")) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div className="overflow-x-hidden relative">
      <div 
        className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.15s ease-out'
        }}
      />
      <LanguageSwitcher />
      <Outlet />
    </div>
  );
}

export default App;