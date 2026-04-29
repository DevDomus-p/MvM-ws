import { useState } from 'react'
import Section from '../components/Section'

const INFO = [
  { icon: '□', label: 'Ubicación', value: <>México · <strong className="text-key-strong-light">Administración Pública</strong></> },
  { icon: '◎', label: 'Especialidad', value: <><strong className="text-key-strong-light">Ciberseguridad</strong> · <em className="text-key-italic-light">Digitalización</em> · Seguridad Pública</> },
  { icon: '◈', label: 'Email', value: <>contacto@moisesvillaverdemier.com</> },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    }, 800)
  }

  const inputBase =
    'w-full bg-navy-800/60 border border-white/[0.08] px-5 py-4 text-[0.92rem] tracking-[0.01em] text-cream-200 placeholder:text-cream-400/30 placeholder:uppercase placeholder:tracking-[0.12em] outline-none transition-all duration-200 focus:border-gold-500/50 focus:bg-navy-800/80'

  return (
    <Section id="contact" className="bg-navy-900 py-32 lg:py-44">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <p
            data-reveal
            className="mb-7 text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-400/92"
          >
            Contacto
          </p>
          <h2
            data-reveal
            data-reveal-delay="0.08"
            className="max-w-2xl font-black text-cream-50"
            style={{ fontSize: 'clamp(2.35rem, 4.9vw, 4.85rem)', lineHeight: 0.98, letterSpacing: '-0.055em' }}
          >
            ¿Tienes algo en mente? <em className="text-key-italic-light">Conectemos.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p
              data-reveal
              className="mb-12 max-w-md text-[1rem] leading-[1.92] tracking-[0.01em] text-cream-200/84"
            >
              Si buscas <strong className="text-key-strong-light">consultoría en innovación tecnológica</strong>, <em className="text-key-italic-light">seguridad pública</em> o digitalización de servicios gubernamentales, estoy aquí para ayudarte.
            </p>

            <div
              data-reveal
              data-reveal-delay="0.1"
              className="flex flex-col gap-6"
            >
              {INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gold-500/25 text-sm text-gold-400/70">
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-cream-300/72">{item.label}</p>
                    <p className="text-[0.96rem] font-medium tracking-[0.01em] text-cream-100/92">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              data-reveal
              data-reveal-delay="0.2"
              className="mt-16 border border-gold-500/15 bg-gold-500/[0.04] p-6"
            >
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-300/88">
                Consultoría Ejecutiva
              </p>
              <p className="text-[0.95rem] leading-[1.88] tracking-[0.01em] text-cream-200/80">
                Transformando la <strong className="text-key-strong-light">administración pública</strong> con <em className="text-key-italic-light">tecnología, datos</em> y una visión de 18+ años de experiencia.
              </p>
            </div>
          </div>

          <div data-reveal data-reveal-delay="0.15">
            {sent ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold-500/40">
                  <span className="text-xl text-gold-400">✓</span>
                </div>
                <h3 className="mb-3 text-[1.45rem] font-bold text-cream-50" style={{ letterSpacing: '-0.03em', lineHeight: 1.02 }}>
                  Mensaje enviado
                </h3>
                <p className="text-[0.95rem] tracking-[0.01em] text-cream-200/72">
                  Me pondré en <em className="text-key-italic-light">contacto contigo</em> en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputBase}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Asunto o área de interés"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputBase}
                />
                <textarea
                  name="message"
                  placeholder="¿En qué puedo ayudarte?"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputBase} resize-none`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 bg-gold-500 py-4 text-[0.74rem] font-bold uppercase tracking-[0.18em] text-navy-900 transition-colors duration-200 hover:bg-gold-400 disabled:bg-gold-500/60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Enviar mensaje
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
