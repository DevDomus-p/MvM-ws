import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    // prefers-reduced-motion: mostrar el elemento estático sin animación
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const mm = gsap.matchMedia()

    // Fábrica de animación — isMobile reduce el desplazamiento y la duración
    // para que los elementos no entren desde muy abajo en pantallas pequeñas.
    const makeAnim = (isMobile) => {
      const fromY = isMobile
        ? Math.min(options.from?.y ?? 50, 30)
        : (options.from?.y ?? 50)

      const anim = gsap.fromTo(
        el,
        { ...(options.from ?? {}), y: fromY, opacity: options.from?.opacity ?? 0 },
        {
          y: 0,
          opacity: 1,
          x: 0,
          scale: 1,
          duration: options.duration ?? (isMobile ? 0.7 : 0.9),
          ease: options.ease ?? 'power3.out',
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: options.trigger ?? el,
            start: options.start ?? 'top 84%',
            toggleActions: options.toggleActions ?? 'play none none reverse',
            ...(options.scrollTrigger ?? {}),
          },
        }
      )

      return () => {
        anim.scrollTrigger?.kill()
        anim.kill()
      }
    }

    mm.add('(min-width: 768px)', () => makeAnim(false))
    mm.add('(max-width: 767px)', () => makeAnim(true))

    return () => mm.revert()
  }, [ref, options.delay, options.start])
}
