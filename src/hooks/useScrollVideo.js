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

    // Limpia el trigger del hero para evitar conflictos al cambiar breakpoint
    const killScrub = () =>
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'hero-video-scrub')
        .forEach((t) => t.kill())

    const onLoaded = () => {
      const duration = video.duration
      if (!duration || !isFinite(duration)) return

      mm = gsap.matchMedia()

      // Desktop — scrub narrativo del video sobre 500vh de scroll con pin
      mm.add('(min-width: 768px)', () => {
        killScrub()
        video.pause()
        video.loop = false

        ScrollTrigger.create({
          id: 'hero-video-scrub',
          trigger: container,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            video.currentTime = self.progress * duration
          },
        })

        return killScrub
      })

      // Mobile — sin pin; el video corre como fondo ambiente en loop.
      // Elimina el efecto "scroll atrapado" que se siente pesado en teléfono.
      mm.add('(max-width: 767px)', () => {
        killScrub()
        video.loop = true
        video.currentTime = 0
        // muted + playsInline garantizan autoplay en Safari iOS y Chrome Android
        video.play().catch(() => {})

        return () => {
          video.pause()
          video.loop = false
          video.currentTime = 0
          killScrub()
        }
      })
    }

    if (video.readyState >= 2) {
      onLoaded()
    } else {
      video.addEventListener('loadedmetadata', onLoaded)
    }

    return () => {
      mm?.revert()
      killScrub()
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [videoRef, containerRef])
}
