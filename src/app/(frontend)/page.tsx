import React from 'react'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import StepsSection from '@/components/landing/StepsSection'
import FeatureSection from '@/components/landing/FeatureSection'
import PackagesSection from '@/components/landing/PackagesSection'
import TestimonialSection from '@/components/landing/TestimonialSection'
import FAQSection from '@/components/landing/FAQSection'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Statistics Section */}
        <StatsSection />

        {/* Steps Process Section */}
        <StepsSection />

        {/* Packages Section */}
        <PackagesSection />

        {/* Features Section */}
        <FeatureSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
