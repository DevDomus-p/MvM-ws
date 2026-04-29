import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollVideo(videoRef, containerRef) {
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.autoplay = false
    video.loop = false
    video.muted = true
    video.playsInline = true

    let mm = null

    // Crea el ScrollTrigger con el end distance correcto para cada breakpoint.
    // Devuelve la función de cleanup que matchMedia ejecuta al cambiar contexto.
    const makeScrub = (end, duration) => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'hero-video-scrub')
        .forEach((t) => t.kill())

      ScrollTrigger.create({
        id: 'hero-video-scrub',
        trigger: container,
        start: 'top top',
        end,         // desktop: +=500%  |  mobile: +=200%
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          video.currentTime = self.progress * duration
        },
      })

      return () => {
        ScrollTrigger.getAll()
          .filter((t) => t.vars.id === 'hero-video-scrub')
          .forEach((t) => t.kill())
      }
    }

    const onLoaded = () => {
      const duration = video.duration
      if (!duration || !isFinite(duration)) return

      mm = gsap.matchMedia()
      // Desktop — recorrido largo para el scrub narrativo del video
      mm.add('(min-width: 768px)', () => makeScrub('+=500%', duration))
      // Mobile — recorrido corto; evita que el hero consuma demasiado scroll
      mm.add('(max-width: 767px)', () => makeScrub('+=200%', duration))
    }

    if (video.readyState >= 2) {
      onLoaded()
    } else {
      video.addEventListener('loadedmetadata', onLoaded)
    }

    return () => {
      mm?.revert()
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'hero-video-scrub')
        .forEach((t) => t.kill())
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [videoRef, containerRef])
}
