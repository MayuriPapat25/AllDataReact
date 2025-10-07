export function ProductInfo({ title, description, className = "" }) {
  return (
    <div className={`py-4 px-8 space-y-3 ${className}`}>
      {
        title && <h5 className="text-xl md:text-2xl font-medium uppercase tracking-wide">{title}</h5>
      }
      {
        description && <p className="text-gray-500 leading-relaxed">{description}</p>
      }
    </div>
  )
}
