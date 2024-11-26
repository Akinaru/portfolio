import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import img_unknown from '../assets/projects/unknown.jpeg';
import { Project, projectsData } from '../projects';


interface ProjectContentProps {
  project: Project;
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

  const ProjectContentCards: React.FC<ProjectContentProps> = ({ project }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section titre et type */}
        <div className="md:col-span-2 bg-neutral-800/50 p-8 rounded-xl">
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <span className="text-xl text-neutral-400">{project.type}</span>
        </div>

        {/* Description */}
        <div className="bg-neutral-800/50 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">À propos</h2>
          <p className="text-neutral-300 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Technologies */}
        <div className="bg-neutral-800/50 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Stack technique</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="md:col-span-2 bg-neutral-800/50 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Fonctionnalités clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-neutral-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liens */}
        <div className="md:col-span-2 flex gap-4 justify-center mt-4">
          {project.links?.website && (
            <a
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl hover:from-blue-700 hover:to-blue-500 transition-all transform hover:scale-105"
            >
              Voir le site
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-xl hover:from-neutral-700 hover:to-neutral-600 transition-all transform hover:scale-105"
            >
              Voir sur GitHub
            </a>
          )}
        </div>
      </div>
    );
  };



const InfoProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0', 10) - 1;
  const project = projectId >= 0 && projectId < projectsData.length ? projectsData[projectId] : null;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="fixed inset-0 z-40">

          <img
            src={img_unknown}
            alt="Image projet introuvable."
            className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              isLoading ? 'opacity-0' : 'opacity-70'
            }`}
          />
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
              isLoading ? 'opacity-100' : 'opacity-85'
            }`} 
          />
        </div>
        <div className={`relative w-full max-w-7xl z-50 p-8 transition-opacity duration-700 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold  text-white">Projet non trouvé</h1>
            <p className="text-neutral-500 mb-4">Le projet demandé n'est pas disponible.</p>
            <Link to="/" className={`flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors w-fit`}>
              <ChevronLeft />
              <p>Accueil</p>
            </Link>
            </div>
          </div>
        </div>

    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="fixed inset-0 z-40">
        <img
          src={project.img}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isLoading ? 'opacity-0' : 'opacity-70'
          }`}
        />
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
            isLoading ? 'opacity-100' : 'opacity-80'
          }`} 
        />
      </div>

      <div className={`relative z-50 p-8 transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
          <Link to="/" className={`flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors w-fit`}>
              <ChevronLeft />
              <p>Accueil</p>
            </Link>

          </div>

          <ProjectContentCards project={project} />
        </div>
      </div>
    </div>
  );
};

export default InfoProjectPage;