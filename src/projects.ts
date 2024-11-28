import img_ilc from './assets/projects/ilc.jpeg';
import img_ilc_mobile from './assets/projects/ilc_mobile.jpeg';
import logo_ilc from './assets/projects/logo_ilc.png';

import img_lightzino from './assets/projects/lightzino.jpeg';
import img_lightzino_mobile from './assets/projects/lightzino_mobile.jpeg';
import logo_lightzino from './assets/projects/logo_lightzino.png';

import img_fifa from './assets/projects/fifa.jpeg';
import img_fifa_mobile from './assets/projects/fifa_mobile.jpeg';
import logo_fifa from './assets/projects/logo_fifa.png';

export interface Project {
    id: number;
    img: string;
    img_mobile: string;
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
    img_mobile: img_lightzino_mobile,
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
    img_mobile: img_ilc_mobile,
    logo: logo_ilc,
    technologies: ["Vue.js", "TailwindCSS", "MySQL", "Laravel", "Javascript", "DaisyUI"],
    date: "2022",
    translationKey: "ilc"
  },
  {
    id: 3,
    img: img_fifa,
    img_mobile: img_fifa_mobile,
    logo: logo_fifa,
    technologies: ["React", "Express", "MySQL", "Stripe", "AWS"],
    date: "2023",
    translationKey: "fifa",
    links: {
      github: "https://github.com/user/fifa-shop"
    }
  }
];