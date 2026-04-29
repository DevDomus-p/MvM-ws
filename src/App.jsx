import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './sections/01_Hero'
import AboutSection from './sections/02_About'
import ExpertiseSection from './sections/03_Expertise'
import VisionSection from './sections/04_Vision'
import BlogSection from './sections/05_Blog'
import ContactSection from './sections/06_Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <VisionSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
