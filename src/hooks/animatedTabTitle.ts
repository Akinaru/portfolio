import { useEffect } from 'react';

const AnimatedTabTitle = () => {
    useEffect(() => {
      const emojis = ['👨‍💻', '🚀', '💡', '⚡', '🎨'];
      const nameParts = [
        '🔥 >',
        '🔥 > M',
        '🔥 > Ma',
        '🔥 > Max',
        '🔥 > Maxi',
        '🔥 > Maxim',
        '🔥 > Maxime',
        '🔥 > Maxime G',
        '🔥 > Maxime GA',
        '🔥 > Maxime GAL',
        '🔥 > Maxime GALL',
        '🔥 > Maxime GALLO',
        '🔥 > Maxime GALLOT',
        '🔥 > Maxime GALLOTT',
        '🔥 > Maxime GALLOTTA',
        '⚡ > Maxime GALLOTTA',
        '🚀 > Maxime GALLOTTA',
        '💡 > Maxime GALLOTTA',
        '👨‍💻 > Maxime GALLOTTA',
        '🎨 > Maxime GALLOTTA',
        '🔥 > Maxime GALLOTTA',
        '🔥 > Maxime GALLOTT',
        '🔥 > Maxime GALLO',
        '🔥 > Maxime GALL',
        '🔥 > Maxime GAL',
        '🔥 > Maxime GA',
        '🔥 > Maxime G',
        '🔥 > Maxime',
        '🔥 > Maxim',
        '🔥 > Maxi',
        '🔥 > Max',
        '🔥 > Ma',
        '🔥 > M',
      ];
      
      let index = 0;
      
      const intervalId = setInterval(() => {
        document.title = nameParts[index];
        index = (index + 1) % nameParts.length;
      },  500);
   
      return () => clearInterval(intervalId);
    }, []);
   
    return null;
   };

export default AnimatedTabTitle;