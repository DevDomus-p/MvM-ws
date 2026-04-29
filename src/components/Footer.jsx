const FOOTER_NAV = [
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Visión', href: '#vision' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contact' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-navy-950">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-gold-500/50">
                <span className="text-[9px] font-black tracking-[0.32em] text-gold-400">MV</span>
              </div>
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-cream-100/90">Moisés Villaverde Mier</p>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.16em] text-cream-400/58">Doctorante · Administración Pública</p>
              </div>
            </div>
            <p className="max-w-sm text-[0.95rem] leading-[1.88] tracking-[0.01em] text-cream-300/78">
              Más de <strong className="text-key-strong-light">18 años</strong> transformando la gestión pública a través de la <em className="text-key-italic-light">innovación tecnológica</em>. Experto en seguridad pública, ciberseguridad y digitalización de servicios gubernamentales.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                className="inline-flex items-center gap-2 border border-gold-500/30 bg-gold-500/10 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-400 transition-colors duration-200 hover:bg-gold-500/20"
              >
                Agendar Consulta →
              </a>
            </div>
          </div>

          <div>
            <p className="mb-6 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-gold-400/92">Navegación</p>
            <nav className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-cream-300/74 transition-colors duration-200 hover:text-cream-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-6 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-gold-400/92">Contacto</p>
            <div className="flex flex-col gap-4 text-[0.93rem] tracking-[0.01em] text-cream-300/74">
              <div>
                <p className="mb-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-cream-200/88">Ubicación</p>
                <p>México · <strong className="text-key-strong-light">Administración Pública</strong></p>
              </div>
              <div>
                <p className="mb-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-cream-200/88">Especialidades</p>
                <p><strong className="text-key-strong-light">Ciberseguridad</strong> · <em className="text-key-italic-light">Digitalización</em></p>
                <p>Seguridad Pública · Infraestructura</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-cream-400/38">
            © 2025 Moisés Villaverde Mier. Todos los derechos reservados.
          </p>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-cream-400/34">
            <em className="text-key-italic-light">Consultoría Ejecutiva</em> · Innovación Tecnológica
          </p>
        </div>
      </div>
    </footer>
  )
}
