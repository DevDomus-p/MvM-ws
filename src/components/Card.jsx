export default function Card({ label, title, description, index, className = '' }) {
  return (
    <div
      className={`group relative p-8 lg:p-10 border border-white/[0.07] bg-navy-800/50 hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-500 ${className}`}
    >
      {/* Background index number */}
      {index !== undefined && (
        <span
          className="text-white/[0.04] font-black absolute top-4 right-5 leading-none pointer-events-none select-none group-hover:text-gold-500/[0.06] transition-colors duration-500"
          style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
          aria-hidden="true"
        >
          {String(index).padStart(2, '0')}
        </span>
      )}

      {/* Label */}
      {label && (
        <p className="text-gold-500 text-xs font-semibold tracking-[0.28em] uppercase mb-5">{label}</p>
      )}

      <h3 className="text-cream-50 text-xl font-bold tracking-tight leading-snug mb-4 relative z-10">
        {title}
      </h3>
      <p className="text-cream-300/60 text-sm leading-relaxed relative z-10">{description}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/50 transition-all duration-500" />
    </div>
  )
}
