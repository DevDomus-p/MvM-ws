import { useRef } from 'react'
import { useExpertiseAnimation } from '../hooks/useExpertiseAnimation'

const PILARES = [
  {
    titulo: 'Seguridad Pública',
    descripcion: (
      <>
        Diseño e implementación de <strong className="text-key-strong-light">estrategias integrales</strong> de <em className="text-key-italic-light">seguridad pública</em> con enfoque tecnológico. Infraestructura crítica, sistemas de respuesta, análisis de datos e inteligencia aplicada a la prevención del delito.
      </>
    ),
  },
  {
    titulo: 'Ciberseguridad',
    descripcion: (
      <>
        Protección de <strong className="text-key-strong-light">activos digitales gubernamentales</strong> y <em className="text-key-italic-light">resiliencia cibernética</em>. Frameworks de seguridad adaptados al contexto de la administración pública mexicana. Gestión de riesgos y respuesta a incidentes.
      </>
    ),
  },
  {
    titulo: 'Digitalización de Servicios',
    descripcion: (
      <>
        Transformación digital de <strong className="text-key-strong-light">servicios públicos</strong> centrada en el <em className="text-key-italic-light">ciudadano</em>. Implementación de infraestructura tecnológica que mejora la eficiencia, la transparencia y la experiencia en los servicios gubernamentales.
      </>
    ),
  },
]

export default function ExpertiseSection() {
  const sectionRef = useRef(null)
  const panelsRef = useRef([])
  const dotsRef = useRef([])

  useExpertiseAnimation(sectionRef, panelsRef, dotsRef)

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="bg-navy-900"
      style={{ overflow: 'hidden' }}
    >
      <div
        className="max-w-8xl mx-auto px-6 lg:px-16 py-24 min-h-screen"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <div>
          <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-400/92">
            Áreas de Expertise
          </p>

          <h2
            className="font-black text-cream-50"
            style={{ fontSize: 'clamp(2.35rem, 4.9vw, 4.85rem)', lineHeight: 0.97, letterSpacing: '-0.055em' }}
          >
            Tres pilares de <em className="text-key-italic-light">transformación gubernamental</em>
          </h2>

          <div className="flex gap-3 mt-12">
            {PILARES.map((_, i) => (
              <div
                key={i}
                ref={el => { dotsRef.current[i] = el }}
                style={{
                  width: '2rem',
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative" style={{ height: '60vh' }}>
          {PILARES.map((pilar, i) => (
            <div
              key={i}
              ref={el => { panelsRef.current[i] = el }}
              className="absolute inset-0 flex flex-col justify-center border border-white/[0.07] bg-navy-800/50"
              style={{ padding: '2.5rem', borderRadius: '16px' }}
            >
              <span className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-400/90">
                Pilar {String(i + 1).padStart(2, '0')}
              </span>

              <h3
                className="mb-6 font-bold text-cream-50"
                style={{ fontSize: 'clamp(2rem, 3.3vw, 3.05rem)', lineHeight: 0.98, letterSpacing: '-0.04em' }}
              >
                {pilar.titulo}
              </h3>

              <p className="text-[0.98rem] leading-[1.92] tracking-[0.01em] text-cream-200/86" style={{ maxWidth: '36ch' }}>
                {pilar.descripcion}
              </p>

              <span
                className="absolute bottom-6 right-8 font-black select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  color: 'rgba(255,255,255,0.04)',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
