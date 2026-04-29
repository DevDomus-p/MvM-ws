import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

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
          ? 'bg-navy-900/95 backdrop-blur-xl border-b border-white/[0.05] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLink(e, '#hero')}
          className="flex items-center gap-3 group"
          aria-label="Moisés Villaverde Mier — inicio"
        >
          <div className="w-8 h-8 border border-gold-500/50 flex items-center justify-center transition-colors duration-300 group-hover:border-gold-400">
            <span className="text-gold-400 font-black text-[9px] tracking-[0.32em]">MV</span>
          </div>
          <span className="hidden text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-cream-100/88 sm:block">
            Moisés Villaverde
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="relative py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream-300/78 transition-colors duration-200 group hover:text-cream-50"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300 ease-expo-out" />
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleLink(e, '#contact')}
            className="hidden lg:inline-flex items-center gap-2 bg-gold-500 px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-navy-900 transition-colors duration-200 group hover:bg-gold-400"
          >
            Agendar Consulta
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
          </a>

          <button
            className="lg:hidden p-2 text-cream-200 focus:outline-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span className={`block h-px bg-current origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-px bg-current origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
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
