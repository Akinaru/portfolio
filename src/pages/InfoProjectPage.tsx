import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import img_ilc from '../assets/projects/ilc.jpeg';
import img_lightzino from '../assets/projects/lightzino.jpeg';
import img_fifa from '../assets/projects/fifa.jpeg';
import img_unknown from '../assets/projects/unknown.jpeg';

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    img: string;
    type: string;
    technologies: string[];
    features: string[];
    links?: {
      github?: string;
      website?: string;
    };
    date: string;
}

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

const projectsData: Project[] = [
    {
        id: 1,
        title: "Lightzino",
        subtitle: "Design et Développement",
        description: "Casino en cryptomonnaie en ligne.",
        longDescription: "Une plateforme de casino en ligne innovante utilisant les cryptomonnaies comme moyen de paiement. Le projet intègre des jeux de hasard modernes avec une interface utilisateur intuitive et des transactions sécurisées.",
        img: img_lightzino,
        type: "Personnel",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Web3.js", "Solidity"],
        features: [
          "Système de paiement en cryptomonnaie",
          "Jeux de casino en temps réel",
          "Interface utilisateur moderne et responsive",
          "Système de récompenses et de fidélité",
          "Sécurité renforcée des transactions"
        ],
        date: "2023",
        links: {
          website: "https://lightzino.com"
        }
    },
    {
        id: 2,
        title: "ILC",
        subtitle: "Design et Développement",
        description: "Création d'une application web de géstion des déplacements internationnaux.",
        longDescription: "Application web permettant la gestion complète des déplacements internationaux pour les entreprises. L'outil optimise le processus de planification, de suivi et de reporting des voyages d'affaires.",
        img: img_ilc,
        type: "Stage",
        technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "Docker"],
        features: [
          "Planning des déplacements",
          "Gestion des visas et documents",
          "Suivi des dépenses en temps réel",
          "Rapports analytiques",
          "Interface multilingue"
        ],
        date: "2022"
    },
    {
        id: 3,
        title: "Fifa",
        subtitle: "Design et Développement",
        description: "Boutique non officle d'articles de football.",
        longDescription: "Une boutique en ligne spécialisée dans les produits de football, offrant une large gamme d'équipements et d'accessoires pour les passionnés du ballon rond.",
        img: img_fifa,
        type: "Scolaire",
        technologies: ["React", "Express", "MySQL", "Stripe", "AWS"],
        features: [
          "Catalogue produits détaillé",
          "Système de panier d'achat",
          "Paiement sécurisé",
          "Gestion des commandes",
          "Système de recherche avancé"
        ],
        date: "2023",
        links: {
          github: "https://github.com/user/fifa-shop"
        }
    }
];

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
            <Link to="/" className="text-neutral-800  bg-white p-3 w-fit hover:opacity-70 transition-colors flex items-center justify-center rounded-lg">
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
            <Link to="/" className="text-neutral-800  bg-white p-3 w-fit hover:opacity-70 transition-colors flex items-center justify-center rounded-lg">
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