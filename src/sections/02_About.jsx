import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Section from '../components/Section'
import iberoLogo from '../../imagenes universidades/Moises_Villaverde_Mier_04.png'
import inapLogo from '../../imagenes universidades/Moises_Villaverde_Mier_05.png'
import iexeLogo from '../../imagenes universidades/Moises_Villaverde_Mier_06.png'
import uchicagoLogo from '../../imagenes universidades/Moises_Villaverde_Mier_07.png'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITY_POINTS = [
  'Desarrollo de Centros de Datos de Alta Disponibilidad',
  'Desarrollo e Integración de Plataformas Digitales (DPD)',
  'Integraciones en Ciberseguridad Avanzada (ICA)',
  'Desarrollo de Redes de Transporte de Datos (RTD)',
  'Desarrollo de Seguridad Lógica y Perimetral',
  'Desarrollo de Redes de Transporte de Datos (RTD)',
]

const ACADEMIC_INSTITUTIONS = [
  {
    name: 'University of Chicago Harris School of Public Policy',
    logo: uchicagoLogo,
    width: '11rem',
  },
  {
    name: 'Universidad Iberoamericana',
    logo: iberoLogo,
    width: '8.5rem',
  },
  {
    name: 'Instituto Nacional de Administración Pública',
    logo: inapLogo,
    width: '8.75rem',
  },
  {
    name: 'IEXE Universidad',
    logo: iexeLogo,
    width: '9.25rem',
  },
]

const STATS = [
  {
    key: '18+',
    countTo: 18,
    suffix: '+',
    kicker: 'Trayectoria',
    label: 'Años de experiencia',
    description: (
      <>
        En proyectos de <strong className="text-key-strong-dark">alto impacto</strong> en <em className="text-key-italic-dark">seguridad pública</em>, <strong className="text-key-strong-dark">ciberseguridad</strong> e infraestructura gubernamental.
      </>
    ),
  },
  {
    key: '3',
    countTo: 3,
    suffix: '',
    kicker: 'Impacto',
    label: 'Sectores transformados',
    description: (
      <>
        <em className="text-key-italic-dark">Seguridad pública</em>, <strong className="text-key-strong-dark">ciberseguridad</strong> y <em className="text-key-italic-dark">digitalización de servicios</em> e infraestructura crítica.
      </>
    ),
  },
  {
    key: 'PhD',
    countTo: null,
    suffix: '',
    kicker: 'Investigación',
    label: 'Doctorante en curso',
    description: (
      <>
        <strong className="text-key-strong-dark">Administración Pública</strong> en INAP, con enfoque en <em className="text-key-italic-dark">transformación digital del Estado</em> y ejecución institucional.
      </>
    ),
  },
]

export default function AboutSection() {
  const statsGridRef = useRef(null)
  const statsRef = useRef([])
  const numberRefs = useRef([])
  const carouselRef = useRef(null)
  const carouselTrackRef = useRef(null)
  const carouselGroupRef = useRef(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const viewport = carouselRef.current
      const track = carouselTrackRef.current
      const group = carouselGroupRef.current

      if (!viewport || !track || !group || prefersReduced) return

      let loopTween
      let visibilityTrigger
      let resizeObserver

      const setupLoop = () => {
        loopTween?.kill()
        visibilityTrigger?.kill()

        const distance = group.offsetWidth
        if (!distance) return

        gsap.set(track, { x: 0, willChange: 'transform' })

        loopTween = gsap.to(track, {
          x: -distance,
          duration: Math.max(distance / 42, 24),
          ease: 'none',
          repeat: -1,
        })

        loopTween.pause()

        visibilityTrigger = ScrollTrigger.create({
          trigger: viewport,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => loopTween?.play(),
          onEnterBack: () => loopTween?.play(),
          onLeave: () => loopTween?.pause(),
          onLeaveBack: () => loopTween?.pause(),
        })

        if (visibilityTrigger.isActive) {
          loopTween.play()
        }
      }

      setupLoop()

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          setupLoop()
        })
        resizeObserver.observe(group)
      }

      return () => {
        resizeObserver?.disconnect()
        visibilityTrigger?.kill()
        loopTween?.kill()
        gsap.set(track, { clearProps: 'transform,willChange' })
      }
    },
    { scope: carouselRef }
  )

  useEffect(() => {
    const statEls = statsRef.current.filter(Boolean)
    if (!statEls.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set(statEls, { opacity: 1, y: 0 })
      return
    }

    const revealTween = gsap.fromTo(
      statEls,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsGridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    const counterTriggers = []

    STATS.forEach((stat, i) => {
      if (stat.countTo === null) return

      const el = numberRefs.current[i]
      const triggerEl = statEls[i]
      if (!el || !triggerEl) return

      const counter = { value: 0 }
      const tween = gsap.to(counter, {
        value: stat.countTo,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 84%',
          once: true,
        },
        onUpdate() {
          el.textContent = Math.round(counter.value) + stat.suffix
        },
      })

      counterTriggers.push(tween.scrollTrigger)
    })

    return () => {
      revealTween.scrollTrigger?.kill()
      revealTween.kill()
      counterTriggers.forEach((trigger) => trigger?.kill())
    }
  }, [])

  return (
    <Section id="about" className="relative overflow-hidden bg-cream-100 pb-32 pt-14 lg:pb-44 lg:pt-16">
      <div className="relative max-w-8xl mx-auto px-6 lg:px-12">
        <div
          className="pointer-events-none absolute -top-12 left-0 h-40 w-40 rounded-full bg-gold-500/8 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-8 top-10 h-56 w-56 rounded-full bg-navy-900/[0.04] blur-3xl"
          aria-hidden="true"
        />

        <div ref={carouselRef} className="mb-14 lg:mb-16">
          <div className="mb-5 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.38em] text-black/50">
            <span className="h-px w-12 bg-gold-500/70" />
            Ámbitos de ejecución
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-navy-900/12 bg-white/84 py-3 shadow-[0_1px_0_rgba(0,0,0,0.05),0_18px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-100 via-cream-100/85 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-100 via-cream-100/85 to-transparent"
              aria-hidden="true"
            />

            <div ref={carouselTrackRef} className="flex w-max">
              {[0, 1].map((cloneIndex) => (
                <div
                  key={cloneIndex}
                  ref={cloneIndex === 0 ? carouselGroupRef : null}
                  className="flex shrink-0 gap-4 pr-4"
                  aria-hidden={cloneIndex === 1}
                >
                  {CAPABILITY_POINTS.map((item, index) => (
                    <article
                      key={`${cloneIndex}-${index}-${item}`}
                      className="flex min-w-[17.75rem] max-w-[17.75rem] items-start gap-4 rounded-[22px] border border-navy-900/12 bg-white/96 px-4 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:min-w-[20rem] sm:max-w-[20rem] lg:min-w-[21rem] lg:max-w-[21rem]"
                    >
                      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold-500/24 bg-gold-500/16 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-gold-800">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[0.9rem] leading-[1.55] tracking-[0.005em] text-navy-900">
                        {item}
                      </p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-16 lg:mb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div className="max-w-3xl">
            <p
              data-reveal
              className="mb-7 text-[10px] font-semibold uppercase tracking-[0.42em] text-black/50"
            >
              Sobre Mí
            </p>
            <h2
              data-reveal
              data-reveal-delay="0.08"
              className="font-black text-navy-900"
              style={{ fontSize: 'clamp(2.35rem, 4.8vw, 5rem)', lineHeight: 0.96, letterSpacing: '-0.055em' }}
            >
              18+ años en el cruce entre tecnología, seguridad y <em className="text-key-italic-dark">transformación pública</em>
            </h2>

            <div
              data-reveal
              data-reveal-delay="0.14"
              className="mt-8 flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-black/50"
            >
              <span className="h-px w-16 bg-gold-500/70" />
              <p>
                Estrategia institucional con ejecución real
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <p
              data-reveal
              data-reveal-delay="0.18"
              className="mb-5 text-[1.03rem] leading-[1.95] tracking-[0.008em] text-navy-900 lg:text-[1.12rem]"
            >
              Soy Moisés Villaverde Mier, un mexicano apasionado por la <em className="text-key-italic-dark">innovación tecnológica</em> y la
              <strong className="text-key-strong-dark"> transformación del Estado</strong>. Mi carrera combina la solidez académica con la experiencia
              práctica en proyectos que impactan directamente la <strong className="text-key-strong-dark">seguridad</strong> y el <em className="text-key-italic-dark">bienestar ciudadano</em>.
            </p>
            <p
              data-reveal
              data-reveal-delay="0.24"
              className="text-[0.96rem] leading-[1.9] tracking-[0.01em] text-navy-900/90 lg:text-[1rem]"
            >
              He estudiado en el INAP y otras instituciones nacionales e internacionales, desarrollando
              una visión integral sobre la <strong className="text-key-strong-dark">administración pública moderna</strong> y el rol de la <em className="text-key-italic-dark">tecnología</em> como
              catalizador del progreso.
            </p>

            <div
              data-reveal
              data-reveal-delay="0.3"
              className="mt-8 rounded-[28px] border border-navy-900/10 bg-white/65 px-6 py-6 shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm"
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-700">
                Enfoque
              </p>
              <p className="max-w-[42ch] text-[0.95rem] leading-[1.9] tracking-[0.01em] text-navy-900 lg:text-[0.97rem]">
                Conecto <strong className="text-key-strong-dark">visión académica</strong>, operación institucional y <em className="text-key-italic-dark">ejecución tecnológica</em> para convertir
                estrategia pública en sistemas que sí funcionan.
              </p>
            </div>
          </div>
        </div>

        <div ref={statsGridRef} className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              ref={(el) => { statsRef.current[i] = el }}
              className="group relative overflow-hidden rounded-[28px] border border-navy-900/10 bg-white/72 px-7 py-7 shadow-[0_1px_0_rgba(0,0,0,0.04),0_18px_40px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 md:px-8 md:py-8"
              style={{ opacity: 0 }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold-500/0 via-gold-500/75 to-gold-500/0"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-gold-500/8 blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col">
                <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.34em] text-black/50">
                  {stat.kicker}
                </p>

                <div
                  ref={(el) => { numberRefs.current[i] = el }}
                  className="mb-4 font-black tracking-tighter text-navy-900 transition-colors duration-200 group-hover:text-gold-600"
                  style={{ fontSize: 'clamp(3.4rem, 6vw, 5.8rem)', lineHeight: 0.92, letterSpacing: '-0.065em' }}
                >
                  {stat.key}
                </div>

                <div className="mt-auto">
                  <p className="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-black/50">
                    {stat.label}
                  </p>
                  <p className="max-w-[30ch] text-[0.93rem] leading-[1.85] tracking-[0.01em] text-navy-900/90">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-navy-900/10 pt-6 lg:mt-14 lg:pt-7">
          <div className="flex flex-col items-center gap-5">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.34em] text-black/50">
              Estudios en
            </p>

            <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-8 lg:flex-nowrap lg:gap-x-10">
              {ACADEMIC_INSTITUTIONS.map((institution) => (
                <article
                  key={institution.name}
                  className="flex items-center justify-center opacity-72 transition-opacity duration-300 hover:opacity-95"
                >
                  <img
                    src={institution.logo}
                    alt={institution.name}
                    className="h-auto max-h-[2.5rem] w-full object-contain grayscale contrast-125 brightness-75 mix-blend-multiply sm:max-h-[2.8rem] lg:max-h-[3.1rem]"
                    style={{ maxWidth: institution.width }}
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
