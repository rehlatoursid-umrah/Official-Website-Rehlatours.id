/* UX: Final touchpoint that reinforces trust, provides essential links, and maintains brand presence
   Converts through contact options and builds confidence with certifications and social proof */
/* DESIGN: Multi-column responsive layout with company info, quick links, contact details, and social media */

'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ArrowUp,
  Shield,
  Award,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FooterSection, SocialLink, ContactInfo } from '@/types/landing'

interface FooterProps {
  className?: string
}

const footerSections: FooterSection[] = [
  {
    title: 'Layanan Umroh',
    links: [
      { label: 'Paket Umroh Reguler', href: '/paket/reguler' },
      { label: 'Paket Umroh Premium', href: '/paket/premium' },
      { label: 'Paket Umroh VIP', href: '/paket/vip' },
      { label: 'Umroh Plus Turki', href: '/paket/turki' },
      { label: 'Umroh Keluarga', href: '/paket/keluarga' },
      { label: 'Umroh Haji Plus', href: '/paket/haji-plus' },
    ],
  },
  {
    title: 'Informasi',
    links: [
      { label: 'Tentang ZeenTravel', href: '/tentang' },
      { label: 'Mengapa Memilih Kami', href: '/keunggulan' },
      { label: 'Tim Profesional', href: '/tim' },
      { label: 'Sertifikasi', href: '/sertifikasi' },
      { label: 'Galeri Jamaah', href: '/galeri' },
      { label: 'Blog & Tips', href: '/blog' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Panduan Booking', href: '/panduan' },
      { label: 'Syarat & Ketentuan', href: '/syarat' },
      { label: 'Kebijakan Privasi', href: '/privasi' },
      { label: 'Cara Pembayaran', href: '/pembayaran' },
      { label: 'Hubungi Kami', href: '/kontak' },
    ],
  },
]

const socialLinks: SocialLink[] = [
  { platform: 'Facebook', href: 'https://facebook.com/zeentravel', icon: 'Facebook' },
  { platform: 'Instagram', href: 'https://instagram.com/zeentravel', icon: 'Instagram' },
  { platform: 'YouTube', href: 'https://youtube.com/zeentravel', icon: 'Youtube' },
  { platform: 'Twitter', href: 'https://twitter.com/zeentravel', icon: 'Twitter' },
]

const contactInfo: ContactInfo = {
  phone: '(021) 123-4567',
  email: 'info@zeentravel.com',
  address: 'Jl. Raya Umroh No. 123, Jakarta Selatan 12345',
  whatsapp: '+62 812-3456-7890',
}

const certifications = [
  { name: 'Kementerian Agama RI', logo: '/images/logo-kemenag.png' },
  { name: 'IATA', logo: '/images/logo-iata.png' },
  { name: 'ASITA', logo: '/images/logo-asita.png' },
  { name: 'ISO 9001', logo: '/images/logo-iso.png' },
]

const socialIcons = {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={cn('bg-[#0B0B0B] text-white relative overflow-hidden', className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-20" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-[#0A7B64] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">ZeenTravel</span>
                  <span className="text-sm text-gray-400">Umroh Terpercaya</span>
                </div>
              </Link>

              {/* Company Description */}
              <p className="text-gray-300 leading-relaxed mb-6">
                ZeenTravel adalah travel umroh terpercaya dengan pengalaman 8+ tahun melayani ribuan
                jamaah. Kami berkomitmen memberikan pelayanan terbaik untuk perjalanan spiritual
                Anda.
              </p>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#C19F50]" />
                  <span className="text-sm text-gray-300">Berlisensi Resmi Kemenag RI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-[#C19F50]" />
                  <span className="text-sm text-gray-300">Sertifikat ISO 9001:2015</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#C19F50]" />
                  <span className="text-sm text-gray-300">Member ASITA & IATA</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg text-white mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: (sectionIndex + 1) * 0.1 + linkIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-[#C19F50] transition-colors duration-300 text-sm block hover:translate-x-1 transform transition-transform"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact & Social Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-16 pt-8 border-t border-gray-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="font-bold text-lg text-white mb-6">Hubungi Kami</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <MapPin className="w-5 h-5 text-[#C19F50] mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-gray-300 text-sm leading-relaxed">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <Phone className="w-5 h-5 text-[#C19F50] group-hover:scale-110 transition-transform duration-300" />
                    <Link
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-300 hover:text-[#C19F50] transition-colors duration-300 text-sm"
                    >
                      {contactInfo.phone}
                    </Link>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <MessageCircle className="w-5 h-5 text-[#C19F50] group-hover:scale-110 transition-transform duration-300" />
                    <Link
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      className="text-gray-300 hover:text-[#C19F50] transition-colors duration-300 text-sm"
                    >
                      {contactInfo.whatsapp}
                    </Link>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <Mail className="w-5 h-5 text-[#C19F50] group-hover:scale-110 transition-transform duration-300" />
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-300 hover:text-[#C19F50] transition-colors duration-300 text-sm"
                    >
                      {contactInfo.email}
                    </Link>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <Clock className="w-5 h-5 text-[#C19F50] group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 text-sm">Senin - Minggu: 08:00 - 22:00 WIB</span>
                  </div>
                </div>
              </div>

              {/* Social Media & Newsletter */}
              <div>
                <h3 className="font-bold text-lg text-white mb-6">Ikuti Kami</h3>

                {/* Social Links */}
                <div className="flex space-x-4 mb-6">
                  {socialLinks.map((social, index) => {
                    const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                    return (
                      <motion.div
                        key={social.platform}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 hover:bg-[#0A7B64] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                          aria-label={`Follow us on ${social.platform}`}
                        >
                          <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-semibold text-white mb-2 text-sm">Newsletter</h4>
                  <p className="text-gray-400 text-xs mb-3">
                    Dapatkan info promo dan tips umroh terbaru
                  </p>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0A7B64] transition-colors duration-300"
                    />
                    <button className="bg-[#0A7B64] hover:bg-[#0A7B64]/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <h3 className="font-bold text-lg text-white mb-6 text-center">
              Sertifikasi & Kemitraan
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div className="w-20 h-12 bg-white/10 rounded border border-gray-800 flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-medium text-center">
                      {cert.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm text-center md:text-left">
                <p>
                  © 2024 ZeenTravel. All rights reserved. |{' '}
                  <Link
                    href="/privasi"
                    className="hover:text-[#C19F50] transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>{' '}
                  |{' '}
                  <Link
                    href="/syarat"
                    className="hover:text-[#C19F50] transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </p>
                <p className="mt-1">Licensed by Ministry of Religious Affairs RI No. 123/2024</p>
              </div>

              {/* Back to Top Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="w-10 h-10 bg-[#0A7B64] hover:bg-[#0A7B64]/90 rounded-full flex items-center justify-center transition-colors duration-300 group"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 text-white group-hover:translate-y-[-2px] transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0A7B64]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C19F50]/10 rounded-full blur-3xl" />
    </footer>
  )
}

export default Footer
