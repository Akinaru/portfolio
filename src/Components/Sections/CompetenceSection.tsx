import React from 'react';

const CompetenceSection = () => {
  const sections = {
    techStack: {
      title: "💻 Tech Stack",
      items: ["JavaScript", "PHP", "Java", "HTML5", "TypeScript", "CSS3", "Python", "C#", "Arduino", "Raspberry Pi", "PostgreSQL", "MySQL", "MongoDB", "Docker"]
    },
    frameworks: {
      title: "🛠️ Frameworks", 
      items: ["React", "Vue.js", "Node.js", "Express.js", "Laravel", "Flutter", "Symfony", "Monogame", "Blazor", "Spring Boot", "Flask"]
    },
    libraries: {
      title: "📖 Libraries",
      items: ["TailwindCSS", "Socket.io", "DaisyUI", "Bootstrap", "ThreeJS", "TensorFlow", "PyTorch", "Keras", "Pandas", "Matplotlib", "NumPy", "Scikit-learn"]
    },
    tools: {
      title: "🛠️ Softwares & Tools",
      items: ["Visual Studio Code", "Visual Studio", "Vim", "IntelliJ IDEA", "Eclipse"]
    },
    os: {
      title: "🎛️ OS",
      items: ["Debian", "Ubuntu", "iOS", "Kali", "Linux", "macOS", "Windows"]
    }
  };

  const getDuration = (itemCount: number) => {
    return `${itemCount * 10}s`;
  };

  return (
    <div className="w-full bg-white dark:bg-black text-gray-800 dark:text-white p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(sections).map(([key, section], sectionIndex) => (
          <div key={key} className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">{section.title}</h2>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
              <div className="whitespace-nowrap">
                <div 
                  className="inline-flex" 
                  style={{
                    animation: `${sectionIndex % 2 === 0 ? 'scrollRight' : 'scrollLeft'} ${getDuration(section.items.length)} linear infinite`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transform: 'translate3d(0,0,0)'
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="inline-flex gap-4 px-2">
                      {section.items.map((item, index) => (
                        <div
                          key={`${item}-${i}-${index}`}
                          className="backdrop-blur-xl bg-white/10 dark:bg-black/10 
                                   border border-gray-200/20 dark:border-gray-800/20 
                                   px-6 py-3 rounded-xl
                                   hover:bg-white/20 dark:hover:bg-white/5
                                   transition-all duration-300 
                                   shadow-lg hover:shadow-xl
                                   transform hover:-translate-y-1"
                        >
                          <span className="text-lg whitespace-nowrap">{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scrollRight {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-16.666%, 0, 0);
          }
        }
        @keyframes scrollLeft {
          0% {
            transform: translate3d(-16.666%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default CompetenceSection;