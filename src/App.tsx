import { useEffect } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './lang/i18n';
import './App.css';

function App() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();

  // Gestion du changement de langue
  useEffect(() => {
    if (lang && (lang === "en" || lang === "fr")) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div className="overflow-x-hidden">
      <Outlet />
    </div>
  );
}

export default App;