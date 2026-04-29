import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import brandLogo from '../../cropped-Moises_Villaverde_Mier_013-1-2.png'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Visión', href: '#vision' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contact' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return
      gsap.fromTo(
        navRef.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      )
    },
    { scope: navRef }
  )

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.05] bg-navy-900/95 py-3 backdrop-blur-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 lg:px-12">
        <a
          href="#hero"
          onClick={(e) => handleLink(e, '#hero')}
          className="group flex items-center"
          aria-label="Moisés Villaverde Mier — inicio"
        >
          <img
            src={brandLogo}
            alt="Villaverde"
            className="h-auto w-[8.5rem] object-contain transition-opacity duration-300 group-hover:opacity-90 sm:w-[12rem] lg:w-[13.25rem]"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="group relative py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream-300/78 transition-colors duration-200 hover:text-cream-50"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold-500 transition-all duration-300 ease-expo-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleLink(e, '#contact')}
            className="group hidden items-center gap-2 bg-gold-500 px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-navy-900 transition-colors duration-200 hover:bg-gold-400 lg:inline-flex"
          >
            Agendar Consulta
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
          </a>

          <button
            className="p-2 text-cream-200 focus:outline-none lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <div className="flex h-3.5 w-5 flex-col justify-between">
              <span className={`block h-px origin-center bg-current transition-all duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'scale-x-0 opacity-0' : ''}`} />
              <span className={`block h-px origin-center bg-current transition-all duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-400 lg:hidden ${menuOpen ? 'max-h-[32rem]' : 'max-h-0'}`}>
        <div className="glass-dark border-t border-white/[0.05] px-6 py-6">
          <nav className="flex flex-col gap-5" aria-label="Menú móvil">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="text-sm font-semibold uppercase tracking-[0.16em] text-cream-200 transition-colors duration-200 hover:text-gold-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLink(e, '#contact')}
              className="mt-2 inline-flex items-center gap-2 bg-gold-500 px-5 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-navy-900"
            >
              Agendar Consulta ↗
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
