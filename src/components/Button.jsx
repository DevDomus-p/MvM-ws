export default function Button({ children, variant = 'primary', className = '', as: Tag = 'button', ...props }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-tight transition-all duration-200 cursor-pointer'

  const variants = {
    primary: 'bg-gold-500 text-navy-900 hover:bg-gold-400',
    outline: 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500',
    ghost: 'text-cream-200 hover:text-cream-50 hover:bg-white/5',
    dark: 'bg-navy-800 text-cream-200 border border-white/10 hover:border-gold-500/30',
  }

  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
