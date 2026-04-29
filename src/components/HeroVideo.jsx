import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useScrollVideo } from '../hooks/useScrollVideo'

gsap.registerPlugin(ScrollTrigger)

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroVideo({ heading, subheading, cta }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)

  // Desktop: scrub narrativo del video con pin.
  // Mobile:  video en loop como fondo ambiente, sin pin (Fase 2).
  useScrollVideo(videoRef, containerRef)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const items = textRef.current?.querySelectorAll('[data-hero-item]')
      if (!items?.length) return

      const mm = gsap.matchMedia()

      // Desktop — entrada desde más abajo, stagger largo
      mm.add('(min-width: 768px)', () => {
        gsap.set(items, { y: 60, opacity: 0 })
        gsap.to(items, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.18, delay: 0.5 })
      })

      // Mobile — entrada más corta y rápida; el texto ya arranca más arriba
      mm.add('(max-width: 767px)', () => {
        gsap.set(items, { y: 35, opacity: 0 })
        gsap.to(items, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.12, delay: 0.3 })
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <div
      id="hero"
      ref={containerRef}
      className="h-screen"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* GPU-accelerated scroll-driven video */}
      <video
        ref={videoRef}
        preload="auto"
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <source src="/MOISES-HERO.mp4" type="video/mp4" />
      </video>

      {/* Overlay desktop — degradado lateral, favorece legibilidad del texto a la izquierda */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.10) 55%,
            rgba(0,0,0,0.05) 100%
          )`,
        }}
      />

      {/* Overlay móvil — degradado ascendente que garantiza legibilidad del texto en la zona baja */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)',
        }}
      />

      {/* Vignette superior para la navbar */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%)' }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden="true" />

      {/* Gold accent line — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(48,193,34,0.25), transparent)' }}
        aria-hidden="true"
      />

      {/* Bloque de texto
          Desktop: anclado bottom-left con maxWidth 520px (igual que antes)
          Mobile:  ancho casi completo, más arriba del borde inferior para
                   evitar que la barra del browser lo tape con dvh */}
      <div
        ref={textRef}
        className="absolute z-10
          bottom-[18%] left-[5%] right-[5%]
          md:bottom-[8%] md:left-[6%] md:right-auto md:max-w-[520px]"
      >
        <p
          data-hero-item
          className="mb-6 text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-300/95"
          style={{ fontSize: '11px' }}
        >
          Consultoría Ejecutiva · Innovación Tecnológica · México
        </p>

        <h1
          data-hero-item
          className="mb-6 max-w-[11ch] font-black text-cream-50"
          style={{
            fontSize: 'clamp(2.4rem, 5.2vw, 4.9rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            textShadow: '0 18px 48px rgba(0, 0, 0, 0.26)',
          }}
        >
          {heading}
        </h1>

        <p
          data-hero-item
          className="mb-9 text-[1.04rem] font-normal tracking-[0.01em] text-body-premium text-cream-200/82
            max-w-full md:max-w-[420px]"
        >
          {subheading}
        </p>

        <div data-hero-item className="flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className="inline-flex items-center gap-3 bg-gold-500 px-7 py-3.5 text-[0.74rem] font-bold uppercase tracking-[0.18em] text-navy-900 transition-colors duration-200 group hover:bg-gold-400"
          >
            {cta}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollTo('#about') }}
            className="inline-flex items-center gap-3 border border-cream-200/20 px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-cream-200 transition-all duration-300 hover:border-gold-500/50 hover:text-cream-50"
          >
            Conocer más
          </a>
        </div>
      </div>

      {/* Scroll indicator — solo desktop; en móvil no hay scrub que comunicar */}
      <div
        className="absolute z-10 hidden md:flex flex-col items-center gap-3 pointer-events-none"
        style={{ right: '3rem', bottom: '4rem' }}
        aria-hidden="true"
      >
        <span
          className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-cream-300/34"
          style={{ fontSize: '10px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-cream-300/20 to-transparent" />
      </div>
    </div>
  )
}
