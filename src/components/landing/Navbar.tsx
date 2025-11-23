'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/landing'
import { useIsPackagesDetailPage } from '@/hooks/useIsPackagesDetailPage'

interface NavbarProps {
  className?: string
}

const navItems: NavItem[] = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Paket Umroh', href: '/packages' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#contact' },
]

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isPackagesDetail = useIsPackagesDetailPage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/95 lg:bg-transparent',
        className,
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={() => handleNavClick('#hero')}
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <img
                src={isScrolled ? '/rehlasticky.png' : '/rehlatrans.png'}
                alt="Logo ZeenTravel"
                className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span
                className={cn(
                  'font-bold text-lg lg:text-xl transition-colors duration-300',
                  isScrolled
                    ? 'text-[var(--primary)]'
                    : `${isPackagesDetail ? 'text-[var(--primary)]' : 'lg:text-white text-[var(--primary)]'}`
                )}
              >
                Rehlatours.id
              </span>

              <span
                className={cn(
                  'text-xs lg:text-sm transition-colors duration-300',
                  isScrolled
                    ? 'text-gray-600'
                    : `${isPackagesDetail ? 'text-gray-600' : 'text-gray-600 lg:text-gray-200'}`
                )}
              >
                Umroh Ditangan Anda
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'text-sm font-medium transition-all duration-300 hover:scale-105 relative group',
                    isScrolled
                      ? 'text-gray-900 hover:text-[var(--primary)]'
                      : `${isPackagesDetail ? 'text-gray-900' : 'text-white'} hover:text-[var(--secondary)]`,
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--secondary)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'border-2 transition-all duration-300 hover:scale-105',
                isScrolled
                  ? 'border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
                  : 'border-white text-[var(--primary)] hover:bg-white hover:text-[var(--primary)]'
              )}
              asChild
            >
              <Link href="tel:+628123456789" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Hubungi Kami</span>
              </Link>
            </Button>

            <Button
              size="sm"
              className="bg-[var(--secondary)] hover:bg-[var(--secondary)]/90 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="https://wa.me/628123456789" className="flex items-center space-x-2 text-[#3a0519]">
                <MessageCircle className="w-4 h-4 text-[#3a0519]" />
                <span>WhatsApp</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={cn('w-6 h-6', isScrolled ? 'text-gray-700' : 'text-gray-700 lg:text-white')} />
            ) : (
              <Menu className={cn('w-6 h-6', isScrolled ? 'text-gray-700' : 'text-gray-700 lg:text-white')} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="block text-gray-700 hover:text-[var(--primary)] font-medium transition-colors duration-300 py-2"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-4 border-t border-gray-200 space-y-3"
                >
                  <Button
                    variant="outline"
                    className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                    asChild
                  >
                    <Link href="tel:+628123456789" className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Hubungi Kami</span>
                    </Link>
                  </Button>

                  <Button
                    className="w-full bg-[var(--secondary)] hover:bg-[var(--secondary)]/90"
                    asChild
                  >
                    <Link href="https://wa.me/628123456789" className="flex items-center justify-center space-x-2 text-[#3a0519]">
                      <MessageCircle className="w-4 h-4 text-[#3a0519]" />
                      <span>Chat WhatsApp</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar


