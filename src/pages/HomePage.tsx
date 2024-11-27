import HomeSection from '../Components/Sections/HomeSection'
import AboutSection from '../Components/Sections/AboutSection'
import ProjectsSection from '../Components/Sections/ProjectSection'
import ContactSection from '../Components/Sections/ContactSection'

const HomePage = ({}) => {
  return (
    <>

      <div className="relative h-screen">

        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>

  )
}

export default HomePage