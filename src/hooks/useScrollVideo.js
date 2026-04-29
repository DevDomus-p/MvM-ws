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

    const onLoaded = () => {
      const duration = video.duration
      if (!duration || !isFinite(duration)) return

      // Kill any previous hero ScrollTrigger to avoid conflicts
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'hero-video-scrub')
        .forEach((t) => t.kill())

      ScrollTrigger.create({
        id: 'hero-video-scrub',
        trigger: container,
        start: 'top top',
        end: '+=500%',   // 500vh — hero stays pinned for this full scroll distance
        pin: true,
        scrub: 1,        // 1s smoothing for fluid playback
        onUpdate: (self) => {
          video.currentTime = self.progress * duration
        },
      })
    }

    if (video.readyState >= 2) {
      onLoaded()
    } else {
      video.addEventListener('loadedmetadata', onLoaded)
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'hero-video-scrub')
        .forEach((t) => t.kill())
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [videoRef, containerRef])
}
