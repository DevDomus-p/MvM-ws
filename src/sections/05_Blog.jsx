import Section from '../components/Section'

const POSTS = [
  {
    date: 'Mar 2025',
    category: 'Inteligencia Artificial',
    title: (
      <>
        IA y la <em className="text-key-italic-dark">Transformación del Gobierno Digital</em>
      </>
    ),
    excerpt: (
      <>
        Cómo la <strong className="text-key-strong-dark">inteligencia artificial</strong> está redefiniendo la manera en que los gobiernos entregan <em className="text-key-italic-dark">servicios públicos</em>, toman decisiones y operan en el siglo XXI.
      </>
    ),
    readTime: '6 min',
  },
  {
    date: 'Feb 2025',
    category: 'Ciberseguridad',
    title: (
      <>
        <strong className="text-key-strong-dark">Resiliencia Cibernética</strong> en la Administración Pública
      </>
    ),
    excerpt: (
      <>
        Estrategias y frameworks para construir <strong className="text-key-strong-dark">instituciones gubernamentales</strong> capaces de resistir, adaptarse y recuperarse ante <em className="text-key-italic-dark">ciberataques sofisticados</em>.
      </>
    ),
    readTime: '8 min',
  },
  {
    date: 'Ene 2025',
    category: 'Digitalización',
    title: (
      <>
        El <em className="text-key-italic-dark">Ciudadano Digital</em>: Rediseñando la Experiencia de Servicios
      </>
    ),
    excerpt: (
      <>
        Una mirada profunda a cómo la <strong className="text-key-strong-dark">digitalización centrada en el ciudadano</strong> puede transformar la <em className="text-key-italic-dark">relación entre el gobierno y la sociedad mexicana</em>.
      </>
    ),
    readTime: '7 min',
  },
]

export default function BlogSection() {
  return (
    <Section id="blog" className="bg-cream-100 py-32 lg:py-44">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        <div className="mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              data-reveal
              className="mb-7 text-[10px] font-semibold uppercase tracking-[0.42em] text-black/50"
            >
              Blog · Pensamiento
            </p>
            <h2
              data-reveal
              data-reveal-delay="0.08"
              className="font-black text-navy-900"
              style={{ fontSize: 'clamp(2.35rem, 4.9vw, 4.85rem)', lineHeight: 0.98, letterSpacing: '-0.055em' }}
            >
              Inteligencia Artificial
              <br />
              y <em className="text-key-italic-dark">Gobiernos Digitales</em>
            </h2>
          </div>

          <a
            href="#"
            data-reveal
            data-reveal-delay="0.18"
            className="group flex shrink-0 items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/50 transition-colors duration-200 hover:text-gold-700"
            onClick={(e) => e.preventDefault()}
          >
            Ver todos los artículos
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div
          data-reveal
          data-reveal-delay="0.12"
          className="grid grid-cols-1 divide-y divide-navy-900/10 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {POSTS.map((post) => (
            <article
              key={post.readTime + post.date}
              className="group cursor-pointer py-10 first:md:pl-0 last:md:pr-0 md:px-10 md:py-0"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-gold-700">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-black/50">
                  <span>{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>

              <h3
                className="mb-4 font-bold leading-[1.42] text-navy-900 transition-colors duration-300 group-hover:text-gold-700"
                style={{ fontSize: 'clamp(1.08rem, 1.65vw, 1.34rem)', letterSpacing: '-0.03em' }}
              >
                {post.title}
              </h3>

              <p className="mb-8 text-[0.96rem] leading-[1.9] tracking-[0.01em] text-black/50">{post.excerpt}</p>

              <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-black/50 transition-all duration-300 group-hover:gap-3 group-hover:text-gold-700">
                Leer artículo →
              </span>

              <div className="mt-6 h-px w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
