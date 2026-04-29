import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Section({ id, children, className = '', tag: Tag = 'section' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const revealEls = ref.current?.querySelectorAll('[data-reveal]')
      if (!revealEls?.length) return

      revealEls.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? '0')
        gsap.fromTo(
          el,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    },
    { scope: ref }
  )

  return (
    <Tag id={id} ref={ref} className={className}>
      {children}
    </Tag>
  )
}
