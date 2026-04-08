import Index from './pages/Index'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import GlobalPortfolioSection from './components/GlobalPortfolioSection'
import ServicesSection from './components/ServicesSection'
import BeliefSection from './components/BeliefSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-black">
      <Index />
      <AboutSection />
      <FeaturedVideoSection />
      {/* <GlobalPortfolioSection /> */}
      <ServicesSection />
      <BeliefSection />
      <Footer />
    </div>
  )
}

export default App
