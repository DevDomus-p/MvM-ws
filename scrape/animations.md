# Análisis de Animaciones — aventuradentalarts.com
*Referencia visual capturada el 2026-04-28 en viewport 1920×1080*

---

## 1. Hero Entrance

**Tipo:** Split-layout hero (50% fondo claro / 50% imagen/video)
**Trigger:** Page load
**Animación observada:**
- Texto del hero aparece con fade-in y ligero desplazamiento vertical
- El lado derecho (imagen) se revela con un clip o fade
- Navbar desliza desde arriba: `y: -20 → 0`, `opacity: 0 → 1`
**Duración estimada:** 0.8–1.2s
**Easing:** power3.out / expo.out
**Elemento receptor:** Heading principal, subtítulo, nav items

---

## 2. Scroll-Driven Video / Text Overlay

**Tipo:** Scroll-pinned hero con texto que cambia
**Trigger:** Scroll dentro del hero (start: "top top", end: "+=500")
**Animación:** Texto superpuesto ("Your smile, effortlessly") se revela con scroll
- `opacity: 0 → 1` ligado a scroll progress
- Posible `blur(8px) → blur(0px)` (blur reveal)
**Scrub:** true
**Elemento receptor:** Div de texto overlay sobre el video/imagen de fondo

---

## 3. Section Counters (02/06)

**Tipo:** Contador horizontal que avanza con scroll
**Trigger:** ScrollTrigger con `scrub: 1` por cada sub-panel
**Animación:** Número grande (01, 02, 03...) cambia y la imagen correspondiente hace fade-in
**Duración:** Controlado por scroll
**Elemento receptor:** `.counter-number`, `.panel-image`

---

## 4. Fade-in Reveals (Elementos de contenido)

**Tipo:** Scroll-triggered reveal desde abajo
**Trigger:** `start: "top 82%"`, `toggleActions: "play none none reverse"`
**Animación:**
- `y: 40 → 0`, `opacity: 0 → 1`
- `duration: 0.8–1.0s`, `ease: power3.out`
- Stagger de 0.1–0.15s entre elementos siblings
**Elemento receptor:** Headings, párrafos, cards, botones de sección

---

## 5. Dark Section Statement Text ("We are here to Enhance Your Smile")

**Tipo:** Large viewport-spanning text con scroll entrada horizontal
**Trigger:** `start: "top 70%"`, one-time play
**Animación:**
- Texto enorme (clamp 5–9rem) entra desde izquierda: `x: -100 → 0`, `opacity: 0 → 1`
- Elipse decorativa hace scale: `scale: 0.6 → 1`, `rotate: -15deg → 0`
- Elipse en parallax suave: `scrub: 1.5`, mueve `-80px` en Y
**Duración:** 1.2–1.8s, `ease: expo.out`
**Elemento receptor:** `h2.statement-text`, `.decorative-ellipse`

---

## 6. Hover Effects — Botones y Links

**Tipo:** CSS transitions (no GSAP)
**Trigger:** `:hover` del usuario
**Animación:**
- Botón CTA: `background-color` cambia en 200ms, leve `scale(1.01)`
- Links de nav: underline animado (`width: 0 → 100%`) en 300ms
- Cards de technology: imagen sutil scale `1 → 1.03` en 400ms `ease-out`
- "Learn More" links: `opacity` + `translateX(4px)` en 250ms

---

## 7. Parallax Suave en Imágenes

**Tipo:** Scroll parallax en imágenes de sección
**Trigger:** ScrollTrigger con `scrub: true`
**Animación:** `y: 0 → -60px` mientras la sección es visible (movimiento 0.5x vs scroll)
**Elemento receptor:** `img.panel-image`, fondos de sección

---

## 8. Transiciones de Sección (Dark ↔ Light)

**Tipo:** Hard-cut entre fondos — no hay fade de background
**Método:** Secciones adyacentes con colores contrastantes
- Claro: `#F0EFEB` (warm off-white / cream)
- Oscuro: `#17181C` (deep charcoal/navy)
**No hay:** fade de background en sí, el contraste visual crea la sensación de transición brusca e impactante

---

## Paleta de Colores Detectada

| Uso | Color | Hex Aproximado |
|---|---|---|
| Fondo claro | Warm off-white | `#F0EFEB` |
| Fondo oscuro | Deep navy/charcoal | `#17181C` |
| Texto en claro | Dark charcoal | `#1F1F1D` |
| Texto en oscuro | Cream white | `#EDEDEA` |
| Texto muted en claro | Medium gray | `#8A8A85` |
| Texto muted en oscuro | Dim cream | `#6B6B68` |
| Acento/CTA | Dark charcoal (el sitio no usa acento de color) | `#1F1F1D` |
| Borde sutil claro | Barely visible warm | `rgba(31,31,29,0.08)` |
| Borde sutil oscuro | Barely visible light | `rgba(255,255,255,0.06)` |

---

## Layout & Spacing

- Max-width contenido: ~1440px con padding lateral 48–96px
- Grid: 8px base unit
- Secciones: padding vertical 120–160px (`py-32 lg:py-40`)
- Tipografía display: `clamp(4rem, 9vw, 9rem)`, tracking `-0.03em`
- Navbar: 60px alto, transparente → sólido al hacer scroll

---

## Notas para Implementación (Moisés Villaverde Mier)

El sitio de referencia usa serif/italic para contraste tipográfico. Para el proyecto objetivo:
- **Reemplazar serif** por Inter 700-800 con tracking muy ajustado (-0.03em)
- **Paleta adaptada** a Navy (#0A0E1A) + Gold (#C9A84C) en lugar del cream/charcoal neutro
- **Mismas proporciones espaciales** y ritmo de secciones dark/light
- **Mismos patrones de animación** pero con identidad corporativo-tech
