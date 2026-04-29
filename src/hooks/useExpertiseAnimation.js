import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GOLD = '#30C122'
const DOT_INACTIVE = 'rgba(255,255,255,0.2)'

export function useExpertiseAnimation(sectionRef, panelsRef, dotsRef) {
  useEffect(() => {
    const section = sectionRef.current
    const panels  = panelsRef.current.filter(Boolean)
    const dots    = dotsRef.current.filter(Boolean)
    if (!section || panels.length === 0) return

    // ── prefers-reduced-motion: mostrar todos los paneles estáticos ──────────
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(panels, { scale: 1, autoAlpha: 1 })
      return
    }

    // ── helpers compartidos ──────────────────────────────────────────────────

    /** Anima la transición entre paneles y devuelve el nuevo índice activo. */
    function transitionTo(active, next) {
      if (next === active) return active
      gsap.to(panels[active], { scale: 0.8, autoAlpha: 0, duration: 0.4, ease: 'power2.in',  overwrite: 'auto' })
      gsap.to(panels[next],   { scale: 1,   autoAlpha: 1, duration: 0.5, delay: 0.08, ease: 'power3.out', overwrite: 'auto' })
      if (dots.length) {
        gsap.to(dots[active], { backgroundColor: DOT_INACTIVE, duration: 0.3, overwrite: 'auto' })
        gsap.to(dots[next],   { backgroundColor: GOLD,         duration: 0.3, overwrite: 'auto' })
      }
      return next
    }

    /** Salta al índice dado sin tween — usado en onRefresh y al init. */
    function jumpTo(index) {
      gsap.killTweensOf(panels)
      gsap.killTweensOf(dots)
      gsap.set(panels, { scale: 0.8, autoAlpha: 0 })
      gsap.set(panels[index], { scale: 1, autoAlpha: 1 })
      if (dots.length) {
        gsap.set(dots, { backgroundColor: DOT_INACTIVE })
        gsap.set(dots[index], { backgroundColor: GOLD })
      }
    }

    /** Índice correspondiente al progreso 0→1 del ScrollTrigger. */
    function indexFromProgress(progress) {
      return Math.min(panels.length - 1, Math.floor(progress * panels.length))
    }

    // ── matchMedia ───────────────────────────────────────────────────────────
    const mm = gsap.matchMedia()

    // Desktop — scroll pin con transición entre paneles (comportamiento actual)
    mm.add('(min-width: 768px)', () => {
      jumpTo(0)
      let active = 0

      const st = ScrollTrigger.create({
        id: 'expertise-panels',
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onUpdate: (self) => {
          active = transitionTo(active, indexFromProgress(self.progress))
        },
        onRefresh: (self) => {
          const next = indexFromProgress(self.progress)
          jumpTo(next)
          active = next
        },
      })

      return () => st.kill()
    })

    // Mobile — sin pin; los paneles rotan automáticamente cada 3.5 s.
    // El usuario no pierde scroll y puede ver los tres pilares sin fricciones.
    // Fase 3 convertirá esto a columna única con layout propio.
    mm.add('(max-width: 767px)', () => {
      jumpTo(0)
      let active = 0

      const tick = setInterval(() => {
        const next = (active + 1) % panels.length
        active = transitionTo(active, next)
      }, 3500)

      return () => {
        clearInterval(tick)
        gsap.killTweensOf(panels)
        gsap.killTweensOf(dots)
      }
    })

    return () => mm.revert()
  }, [sectionRef, panelsRef, dotsRef])
}
