import HeroVideo from '../components/HeroVideo'

export default function HeroSection() {
  return (
    <HeroVideo
      heading={
        <>
          Transformando
          <br />
          <em className="text-key-italic-light">el Presente</em>
        </>
      }
      subheading={
        <>
          <strong className="text-key-strong-light">Doctorante en Administración Pública</strong> con más de 18 años de experiencia en <em className="text-key-italic-light">seguridad pública</em>, <strong className="text-key-strong-light">ciberseguridad</strong> y <em className="text-key-italic-light">digitalización de servicios</em> e infraestructura.
        </>
      }
      cta="Agendar Consulta"
    />
  )
}
