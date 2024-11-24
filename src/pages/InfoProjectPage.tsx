import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import img_ilc from '../assets/projects/ilc.jpeg';
import img_lightzino from '../assets/projects/lightzino.jpeg';
import img_fifa from '../assets/projects/fifa.jpeg';

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

const InfoProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0', 10) - 1;
  const project = projectId >= 0 && projectId < projectsData.length ? projectsData[projectId] : null;
  const [isAnimating, setIsAnimating] = useState(true);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const animationTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }, 1500);

    const effectsTimer = setTimeout(() => {
      setShowEffects(true);
    }, 1000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(effectsTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-600 underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="fixed inset-0 z-40">
        <motion.img
          src={project.img}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-1000 ${showEffects ? 'grayscale opacity-20' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: showEffects ? 0.9 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>

      <motion.div 
        className="relative z-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-block mb-8 text-neutral-400 hover:text-white transition-colors"
          >
            &larr; Retour à l'accueil
          </Link>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              {project.title}
            </h1>

            <div>
              <h2 className="text-xl font-semibold mb-2">Type</h2>
              <p className="text-neutral-300">{project.type}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-neutral-300">{project.longDescription}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-neutral-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Fonctionnalités</h2>
              <ul className="list-disc list-inside space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="text-neutral-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-6">
              {project.links?.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Voir le site
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  Voir sur GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoProjectPage;