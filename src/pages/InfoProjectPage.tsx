import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import img_unknown from '../assets/projects/unknown.jpeg';
import { projectsData } from '../projects';
import { TechBadgeGroup } from '../hooks/techBadge';

interface ProjectContentProps {
  projectId: string;
  isLeaving: boolean;
}

const ChevronLeft = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ViewToggleButton = ({ isFullView, onToggle }: { isFullView: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="fixed top-4 right-4 z-[70] px-4 py-2 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-xl transition-all duration-500 text-white w-40 h-10"
  >
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 transform"
        style={{
          transform: `translateY(${isFullView ? '0' : '-100%'})`,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3Z"/>
          <path d="M9 3V21"/>
        </svg>
        <span className="whitespace-nowrap">Voir détails</span>
      </div>
      <div 
        className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 transform"
        style={{
          transform: `translateY(${isFullView ? '100%' : '0'})`,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h18v18H3z"/>
        </svg>
        <span className="whitespace-nowrap">Vue complète</span>
      </div>
    </div>
  </button>
);

const ProjectContentCards: React.FC<ProjectContentProps> = ({ projectId, isLeaving }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const project = projectsData.find(p => p.translationKey === projectId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (!project) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transform transition-all duration-500 ${
      isLeaving ? 'opacity-0 translate-y-4' : ''
    }`}>
      <div className={`md:col-span-2 bg-neutral-800/70 p-8 rounded-xl transform transition-all duration-500 shadow-[12px_12px_10px_rgba(0,0,0,0.2)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="flex justify-start items-center">
          {project.logo && (
            <img 
              src={project.logo} 
              alt={`${t(`projects.${project.translationKey}.title`)} logo`}
              className={`w-24 h-24 object-contain transition-all duration-500 mr-4 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            />
          )}
          <div>
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              {t(`projects.${project.translationKey}.title`)}
            </h1>
            <span className="text-xl text-neutral-400">
              {t(`projects.${project.translationKey}.type`)}
            </span>
          </div>
        </div>
      </div>

      <div className={`bg-neutral-800/70 p-8 rounded-xl transform transition-all duration-500 delay-75 shadow-[12px_12px_10px_rgba(0,0,0,0.2)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h2 className="text-2xl font-semibold mb-4">{t('projects.about')}</h2>
        <p className="text-neutral-300 leading-relaxed">
          {t(`projects.${project.translationKey}.longDescription`)}
        </p>
      </div>

      <div className={`bg-neutral-800/70 p-8 rounded-xl transform transition-all duration-500 delay-150 shadow-[12px_12px_10px_rgba(0,0,0,0.2)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h2 className="text-2xl font-semibold mb-4">{t('projects.techStack')}</h2>
        <TechBadgeGroup 
          technologies={project.technologies}
          isVisible={isVisible}
          className="flex flex-wrap gap-3"
        />
      </div>

      <div className={`md:col-span-2 bg-neutral-800/70 p-8 rounded-xl transform transition-all duration-500 delay-200 shadow-[12px_12px_10px_rgba(0,0,0,0.2)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">{t('projects.keyFeatures')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(t(`projects.${project.translationKey}.features`, { returnObjects: true })).map((key, index) => (
            <div 
              key={key} 
              className={`flex items-center space-x-3 transform transition-all duration-500 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-neutral-300">
                {t(`projects.${project.translationKey}.features.${key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`md:col-span-2 flex gap-4 justify-center mt-4 transform transition-all duration-500 delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        {project.links?.website && (
          <a
            href={project.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl transition-all duration-300 transform bg-white text-black hover:bg-white/10 hover:text-white"
          >
            {t('projects.viewWebsite')}
          </a>
        )}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-xl transition-all duration-300 transform hover:from-neutral-700 hover:to-neutral-600"
          >
            {t('projects.viewGithub')}
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectLayout: React.FC<{
  children: React.ReactNode;
  backgroundImage: string;
  backgroundImageMobile: string;
  isLoading: boolean;
  isLeaving: boolean;
  className?: string;
  onNavigate: (to: string) => void;
}> = ({ children, backgroundImage, backgroundImageMobile, isLoading, isLeaving, className, onNavigate }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(`/${lang}#projects`);
  };

  const toggleView = () => {
    setIsFullView(!isFullView);
  };

  return (
    <>
      <ViewToggleButton isFullView={isFullView} onToggle={toggleView} />
      
      {/* Overlay de transition noir */}
      <div 
        className={`fixed inset-0 bg-black z-[60] transition-opacity duration-500 pointer-events-none ${
          isLeaving ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Nouveau bouton d'accueil pour la vue dégagée */}
      {isFullView && (
        <button
          onClick={handleNavigate}
          className="fixed top-4 left-4 z-[70] flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
        >
          <ChevronLeft />
          <p>{t('projects.home')}</p>
        </button>
      )}

      <div className="min-h-screen bg-neutral-900 text-white">
        <div className="fixed inset-0 z-40">
          <img
            src={isMobile ? backgroundImageMobile : backgroundImage}
            alt="Background"
            className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              isLoading ? 'opacity-0 scale-105' : 'opacity-70 scale-100'
            }`}
          />
          {!isFullView && (
            <>
              <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" />
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
                  pointerEvents: 'none'
                }}
              />
            </>
          )}
        </div>

        {!isFullView && (
          <div className={`relative z-50 p-8 transition-all duration-700 ease-in-out ${
            isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <div className={`max-w-7xl mx-auto ${className}`}>
              <div className="mb-8">
                <button
                  onClick={handleNavigate}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 w-fit"
                >
                  <ChevronLeft />
                  <p>{t('projects.home')}</p>
                </button>
              </div>
              {children}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const InfoProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id.toString() === id);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (to: string) => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate(to);
    }, 500);
  };

  return (
    <ProjectLayout
      backgroundImage={project ? project.img : img_unknown}
      backgroundImageMobile={project ? project.img_mobile : img_unknown}
      isLoading={isLoading}
      isLeaving={isLeaving}
      onNavigate={handleNavigate}
      className={project ? '' : 'h-[calc(100vh-120px)] flex flex-col justify-center'}
    >
      {project ? (
        <ProjectContentCards 
          projectId={project.translationKey} 
          isLeaving={isLeaving} 
        />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{t('projects.notFound')}</h1>
          <p className="text-neutral-500 mb-4">{t('projects.notFoundDesc')}</p>
        </div>
      )}
    </ProjectLayout>
  );
};

export default InfoProjectPage;