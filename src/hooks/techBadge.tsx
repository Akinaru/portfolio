// techBadge.tsx
import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faVuejs, 
  faNode, 
  faPhp,
  faJs,
  faStripe,
  faAws 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase,
  faCode,
  faNetworkWired
} from '@fortawesome/free-solid-svg-icons';

export interface TechInfo {
  name: string;
  icon: IconDefinition;
}

export const techList: { [key: string]: TechInfo } = {
  'React': {
    name: 'React',
    icon: faReact
  },
  'Vue.js': {
    name: 'Vue.js',
    icon: faVuejs
  },
  'TypeScript': {
    name: 'TypeScript',
    icon: faCode
  },
  'JavaScript': {
    name: 'Javascript',
    icon: faJs
  },
  'Express': {
    name: 'Express',
    icon: faNode
  },
  'Socket.io': {
    name: 'Socket.io',
    icon: faNetworkWired
  },
  'MySQL': {
    name: 'MySQL',
    icon: faDatabase
  },
  'Laravel': {
    name: 'Laravel',
    icon: faPhp
  },
  'TailwindCSS': {
    name: 'TailwindCSS',
    icon: faCode
  },
  'DaisyUI': {
    name: 'DaisyUI',
    icon: faCode
  },
  'Stripe': {
    name: 'Stripe',
    icon: faStripe
  },
  'AWS': {
    name: 'AWS',
    icon: faAws
  }
};

interface TechBadgeGroupProps {
  technologies: string[];
  isVisible?: boolean;
  className?: string;
}

export const TechBadgeGroup: React.FC<TechBadgeGroupProps> = ({ 
  technologies,
  isVisible = true,
  className = ''
}) => {
  return (
    <div className={`rounded-xl transform transition-all duration-500 delay-150 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    } ${className}`}>
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => {
          const techInfo = techList[tech];
          
          return (
            <span 
              key={tech}
              className={`px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium 
                transform transition-all duration-500 hover:bg-blue-500/30
                inline-flex items-center gap-2
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {techInfo && <FontAwesomeIcon icon={techInfo.icon} className="w-4 h-4" />}
              {tech}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Composant optionnel pour le titre si nécessaire
interface TechStackTitleProps {
  title: string;
  className?: string;
}

export const TechStackTitle: React.FC<TechStackTitleProps> = ({ 
  title,
  className = ''
}) => (
  <h2 className={`text-2xl font-semibold mb-4 ${className}`}>
    {title}
  </h2>
);