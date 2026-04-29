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

    // ── prefers-reduced-motion: show all panels statically ──────────────────
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(panels, { scale: 1, autoAlpha: 1 })
      return
    }

    // ── initial state ────────────────────────────────────────────────────────
    // All panels invisible + scaled-down (CodePen pattern)
    gsap.set(panels, { scale: 0.8, autoAlpha: 0 })
    // First panel visible immediately
    gsap.set(panels[0], { scale: 1, autoAlpha: 1 })
    // Dots
    if (dots.length) {
      gsap.set(dots, { backgroundColor: DOT_INACTIVE })
      gsap.set(dots[0], { backgroundColor: GOLD })
    }

    let activeIndex = 0

    // ── transition function (adapted from CodePen's setSection) ─────────────
    // force=true bypasses the guard — used after resize/refresh
    function setPanel(newIndex, force = false) {
      if (!force && newIndex === activeIndex) return

      const oldPanel = panels[activeIndex]
      const newPanel = panels[newIndex]

      gsap.to(oldPanel, {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.in',
        overwrite: 'auto',
      })
      gsap.to(newPanel, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.08,
        overwrite: 'auto',
      })

      if (dots.length) {
        gsap.to(dots[activeIndex], {
          backgroundColor: DOT_INACTIVE,
          duration: 0.3,
          overwrite: 'auto',
        })
        gsap.to(dots[newIndex], {
          backgroundColor: GOLD,
          duration: 0.3,
          overwrite: 'auto',
        })
      }

      activeIndex = newIndex
    }

    // ── helper: compute correct panel index from progress ───────────────────
    function indexFromProgress(progress) {
      return Math.min(panels.length - 1, Math.floor(progress * panels.length))
    }

    // ── single pin trigger + onUpdate to detect active panel ────────────────
    // Progress 0→0.33 = panel 0, 0.33→0.67 = panel 1, 0.67→1.0 = panel 2
    const st = ScrollTrigger.create({
      id: 'expertise-panels',
      trigger: section,
      start: 'top top',
      end: '+=200%',   // 2 extra viewport heights → 3 "pages" total
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      onUpdate: (self) => {
        setPanel(indexFromProgress(self.progress))
      },
      // After viewport resize GSAP recalculates positions & refires with
      // the current scroll — force-sync so the correct panel is always shown
      onRefresh: (self) => {
        const newIndex = indexFromProgress(self.progress)
        // Jump state immediately (no tween) for a clean refresh
        gsap.killTweensOf(panels)
        gsap.set(panels, { scale: 0.8, autoAlpha: 0 })
        gsap.set(panels[newIndex], { scale: 1, autoAlpha: 1 })
        if (dots.length) {
          gsap.set(dots, { backgroundColor: DOT_INACTIVE })
          gsap.set(dots[newIndex], { backgroundColor: GOLD })
        }
        activeIndex = newIndex
      },
    })

    return () => {
      st.kill()
    }
  }, [sectionRef, panelsRef, dotsRef])
}
