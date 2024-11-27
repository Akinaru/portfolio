import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './lang/i18n';
import './App.css';

function App() {
  const { i18n } = useTranslation();
  const { lang } = useParams();

  
  useEffect(() => {
    if(lang && (lang == "en" || lang == "fr")){
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
}

export default App;