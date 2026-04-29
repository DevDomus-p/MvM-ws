import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function revealElement(el, options = {}) {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0, x: 0 })
    return null
  }
  return gsap.fromTo(
    el,
    { y: options.y ?? 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.9,
      ease: options.ease ?? 'power3.out',
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger: options.trigger ?? el,
        start: options.start ?? 'top 84%',
        toggleActions: options.toggleActions ?? 'play none none reverse',
      },
    }
  )
}

export function revealBatch(els, trigger, options = {}) {
  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 })
    return null
  }
  return gsap.fromTo(
    els,
    { y: options.y ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.85,
      ease: options.ease ?? 'power3.out',
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: trigger ?? els[0],
        start: options.start ?? 'top 82%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}
