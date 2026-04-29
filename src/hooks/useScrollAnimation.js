import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const from = options.from ?? { y: 50, opacity: 0 }
    const anim = gsap.fromTo(el, from, {
      y: 0,
      opacity: 1,
      x: 0,
      scale: 1,
      duration: options.duration ?? 0.9,
      ease: options.ease ?? 'power3.out',
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger: options.trigger ?? el,
        start: options.start ?? 'top 84%',
        toggleActions: options.toggleActions ?? 'play none none reverse',
        ...(options.scrollTrigger ?? {}),
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [ref, options.delay, options.start])
}
