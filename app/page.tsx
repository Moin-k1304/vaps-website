import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import AIFeaturesSection from '@/components/sections/AIFeaturesSection'
import AIVRMSection from '@/components/sections/AIVRMSection'
import AgenticAISection from '@/components/sections/AgenticAISection'
import DigitalCampusSection from '@/components/sections/DigitalCampusSection'
import DigitalCampusInfraSection from '@/components/sections/DigitalCampusInfraSection'
import StatsSection from '@/components/sections/StatsSection'
import IndiaMapSection from '@/components/sections/IndiaMapSection'
import TrustSection from '@/components/sections/TrustSection'
import ProductFeaturesSection from '@/components/sections/ProductFeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import TimelineSection from '@/components/sections/TimelineSection'
// import NewTimeline from '@/components/sections/NewTimeline'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AIFeaturesSection />
      <AIVRMSection />
      <AgenticAISection />
      <DigitalCampusSection />
      <DigitalCampusInfraSection />
      <StatsSection />
      <IndiaMapSection />
      <TrustSection />
      <TimelineSection />
      <ProductFeaturesSection />
      <TestimonialsSection />
      {/* <NewTimeline /> */}
    </>
  )
}
