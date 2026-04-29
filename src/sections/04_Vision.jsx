import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    title: 'Empoderamiento Económico',
    desc: (
      <>
        Construir una <strong className="text-key-strong-light">economía resiliente y sostenible</strong> que genere <em className="text-key-italic-light">beneficios reales</em> para cada ciudadano.
      </>
    ),
  },
  {
    title: 'Educación de Calidad',
    desc: (
      <>
        Revolucionar la <strong className="text-key-strong-light">educación</strong>, convirtiéndola en un <em className="text-key-italic-light">catalizador del progreso</em> social y tecnológico.
      </>
    ),
  },
  {
    title: 'Servicios para Todos',
    desc: (
      <>
        Garantizar <strong className="text-key-strong-light">servicios de salud</strong> e <em className="text-key-italic-light">infraestructura pública de excelencia</em> para toda la ciudadanía.
      </>
    ),
  },
]

export default function VisionSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const glowRef = useRef(null)
  const outerRingRef = useRef(null)
  const innerRingRef = useRef(null)
  const pillarsRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // ── Desktop con movimiento — scrub narrativo completo ───────────────────
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        const pillarItems = pillarsRef.current?.querySelectorAll('[data-pillar]') ?? []

        gsap.set(labelRef.current, { y: 24, autoAlpha: 0 })
        gsap.set(headingRef.current, { scale: 0.82, y: 44, autoAlpha: 0 })
        gsap.set(glowRef.current, { scale: 0.35, autoAlpha: 0.18 })
        gsap.set(outerRingRef.current, { scale: 0.24, autoAlpha: 0.8 })
        gsap.set(innerRingRef.current, { scale: 0.18, autoAlpha: 0.55 })
        gsap.set(pillarItems, { opacity: 0, y: 40 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.1,
            invalidateOnRefresh: true,
            refreshPriority: -2,
          },
        })

        tl.fromTo(outerRingRef.current, { scale: 0.24, autoAlpha: 0.8 }, { scale: 2.35, autoAlpha: 1, ease: 'none' }, 0)
          .fromTo(innerRingRef.current, { scale: 0.18, autoAlpha: 0.55 }, { scale: 1.95, autoAlpha: 0.95, ease: 'none' }, 0.02)
          .fromTo(glowRef.current, { scale: 0.35, autoAlpha: 0.18 }, { scale: 1.7, autoAlpha: 0.45, ease: 'none' }, 0)
          .fromTo(labelRef.current, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, 0.24)
          .fromTo(headingRef.current, { scale: 0.82, y: 44, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.32, ease: 'power3.out' }, 0.3)
          .to(headingRef.current, { scale: 1.06, y: -10, autoAlpha: 0.96, duration: 0.4, ease: 'none' }, 0.6)
          .to(pillarItems, { opacity: 1, y: 0, duration: 0.28, stagger: 0.08, ease: 'power3.out' }, 0.68)

        return () => {
          gsap.set(
            [labelRef.current, headingRef.current, glowRef.current, outerRingRef.current, innerRingRef.current, ...pillarItems],
            { clearProps: 'willChange' }
          )
        }
      })

      // ── Móvil con movimiento — sin scrub, entrada simple al viewport ─────────
      // El scrub sobre 160vh dejaba los elementos con opacity:0 inline sin revelar.
      // En móvil: los anillos aparecen a tamaño natural y el contenido entra con
      // un fade suave cuando la sección entra al viewport.
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
        const pillarItems = pillarsRef.current?.querySelectorAll('[data-pillar]') ?? []

        // Revelar inmediatamente los elementos que tenían opacity:0 inline en JSX
        gsap.set(labelRef.current, { opacity: 1, y: 0 })
        gsap.set(headingRef.current, { opacity: 1, scale: 1, y: 0 })

        // Entrada suave del label + heading al entrar la sección en viewport
        gsap.fromTo(
          [labelRef.current, headingRef.current],
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Entrada escalonada de los pilares
        gsap.fromTo(
          pillarItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        return () => {
          gsap.killTweensOf([labelRef.current, headingRef.current, ...pillarItems])
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const pillarItems = pillarsRef.current?.querySelectorAll('[data-pillar]') ?? []

        gsap.set(
          [
            labelRef.current,
            headingRef.current,
            glowRef.current,
            outerRingRef.current,
            innerRingRef.current,
            ...pillarItems,
          ],
          { opacity: 1, y: 0, scale: 1, clearProps: 'transform' }
        )
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="vision" ref={sectionRef} className="relative md:min-h-[280vh] bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,193,34,0.16),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.92),rgba(0,0,0,1))]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-35" aria-hidden="true" />

      <div ref={stageRef} className="top-0 md:sticky h-auto md:h-screen md:min-h-[760px] overflow-visible md:overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div
            ref={glowRef}
            className="absolute h-[12rem] w-[12rem] md:h-[18rem] md:w-[18rem] rounded-full bg-gold-500/20 blur-3xl"
            style={{ opacity: 0.18 }}
          />
          <div
            ref={outerRingRef}
            className="absolute rounded-full border border-gold-400/35"
            style={{ width: 'clamp(14rem, 55vw, 24rem)', height: 'clamp(14rem, 55vw, 24rem)', opacity: 0.8 }}
          />
          <div
            ref={innerRingRef}
            className="absolute rounded-full border border-cream-50/12"
            style={{ width: 'clamp(10rem, 40vw, 18rem)', height: 'clamp(10rem, 40vw, 18rem)', opacity: 0.55 }}
          />
          <div className="absolute h-3 w-3 rounded-full bg-gold-300/80 shadow-[0_0_30px_rgba(48,193,34,0.65)]" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6 lg:px-12">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <p
              ref={labelRef}
              className="mb-8 inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-300/95"
              style={{ opacity: 0 }}
            >
              <span className="h-px w-10 bg-gold-500/70" />
              Misión &amp; Visión
              <span className="h-px w-10 bg-gold-500/70" />
            </p>

            <div ref={headingRef} className="max-w-5xl" style={{ opacity: 0 }}>
              <h2
                className="font-black text-cream-50"
                style={{ fontSize: 'clamp(3rem, 8vw, 8.4rem)', lineHeight: 0.86, letterSpacing: '-0.085em', textShadow: '0 18px 54px rgba(0, 0, 0, 0.3)' }}
              >
                Liderazgo
                <br />
                <em className="text-key-italic-light">Visionario</em>,
                <br />
                Progreso Unido
              </h2>
            </div>

            <div
              ref={pillarsRef}
              className="mt-8 md:mt-16 grid w-full max-w-5xl grid-cols-1 gap-5 text-left md:grid-cols-3"
            >
              {PILLARS.map((item) => (
                <article
                  key={item.title}
                  data-pillar
                  className="rounded-[28px] border border-cream-50/10 bg-cream-50/[0.045] px-6 py-6 backdrop-blur-sm shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
                  style={{ opacity: 0 }}
                >
                  <div className="mb-6 h-px w-12 bg-gradient-to-r from-gold-400 to-gold-400/15" />
                  <h3 className="mb-3 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-cream-100">{item.title}</h3>
                  <p className="text-[0.96rem] leading-[1.9] tracking-[0.01em] text-cream-100/86">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
