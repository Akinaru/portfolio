import img_ilc from './assets/projects/ilc.jpeg';
import logo_ilc from './assets/projects/logo_ilc.png';
import img_lightzino from './assets/projects/lightzino.jpeg';
import logo_lightzino from './assets/projects/logo_lightzino.png';
import img_fifa from './assets/projects/fifa.jpeg';
import logo_fifa from './assets/projects/logo_fifa.png';

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    img: string;
    logo: string;
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
        logo: logo_lightzino,
        type: "Personnel",
        technologies: ["React", "TypeScript", "Express", "Socket.io" ],
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
        description: "Application web de géstion des déplacements internationnaux.",
        longDescription: "Application web permettant la gestion complète des déplacements internationaux pour les étudiants de l'IUT d'Annecy. Le site permet la visualisations (avec filtres) des destinations. Les étudiants peuvent gérer leurs voeux et les administrateurs peuvent faire l'arbitrage pour valider les choix de destinations.",
        img: img_ilc,
        logo: logo_ilc,
        type: "Stage",
        technologies: ["Vue.js", "TailwindCSS", "MySQL", "Laravel", "Javascript", "DaisyUI"],
        features: [
          "Affichage des destinations",
          "Gestion des voeux et des documents",
          "Arbitrage des déplacements",
          "Gestion des éléments du site (articles, événements, destinations, utilisateurs)",
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
        logo: logo_fifa,
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