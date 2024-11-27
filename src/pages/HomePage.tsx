import HomeSection from '../Components/Sections/HomeSection'
import AboutSection from '../Components/Sections/AboutSection'
import ProjectsSection from '../Components/Sections/ProjectSection'

const HomePage = ({}) => {
  return (
    <>

      <div className="relative h-screen">

        <HomeSection />
        <AboutSection />
        <ProjectsSection />
      </div>
    </>

  )
}

export default HomePage