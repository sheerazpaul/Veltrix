const colorMap = {
  error: 'bg-error/10 text-error',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary',
  'surface-tint': 'bg-surface-tint/10 text-surface-tint',
}

export default function Chip({ label, color = 'primary' }) {
  const colors = colorMap[color] || colorMap.primary

  return (
    <span className={`inline-flex items-center px-sm-custom py-0.5 rounded-full text-label-sm font-medium ${colors}`}>
      {label}
    </span>
  )
}
