import img_ilc from './assets/projects/ilc.jpeg';
import img_lightzino from './assets/projects/lightzino.jpeg';
import img_fifa from './assets/projects/fifa.jpeg';

export interface Project {
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

export const projectsData: Project[] = [
    {
        id: 1,
        title: "Lightzino",
        subtitle: "Design et Développement",
        description: "Casino en cryptomonnaie en ligne.",
        longDescription: "Une plateforme de casino en ligne innovante utilisant les cryptomonnaies comme moyen de paiement. Le projet intègre des jeux de hasard modernes avec une interface utilisateur intuitive et des transactions sécurisées.",
        img: img_lightzino,
        type: "Personnel",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Web3.js", "Solidity", ],
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