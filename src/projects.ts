import img_ilc from './assets/projects/ilc.jpeg';
import logo_ilc from './assets/projects/logo_ilc.png';
import img_lightzino from './assets/projects/lightzino.jpeg';
import logo_lightzino from './assets/projects/logo_lightzino.png';
import img_fifa from './assets/projects/fifa.jpeg';
import logo_fifa from './assets/projects/logo_fifa.png';

export interface Project {
    id: number;
    img: string;
    logo: string;
    technologies: string[];
    date: string;
    translationKey: string;
    links?: {
      github?: string;
      website?: string;
    };
}

export const projectsData: Project[] = [
  {
    id: 1,
    img: img_lightzino,
    logo: logo_lightzino,
    technologies: ["React", "TypeScript", "Express", "Socket.io"],
    date: "2023",
    translationKey: "lightzino",
    links: {
      website: "https://lightzino.com"
    }
  },
  {
    id: 2,
    img: img_ilc,
    logo: logo_ilc,
    technologies: ["Vue.js", "TailwindCSS", "MySQL", "Laravel", "Javascript", "DaisyUI"],
    date: "2022",
    translationKey: "ilc"
  },
  {
    id: 3,
    img: img_fifa,
    logo: logo_fifa,
    technologies: ["React", "Express", "MySQL", "Stripe", "AWS"],
    date: "2023",
    translationKey: "fifa",
    links: {
      github: "https://github.com/user/fifa-shop"
    }
  }
];