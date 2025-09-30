export function ProductInfo({ title, description, className = "" }) {
  return (
    <div className={` p-4 space-y-3 ${className}`}>
      {
        title && <h2 className="text-xl md:text-2xl font-bold text-black tracking-wide">{title}</h2>
      }
      {
        description && <p className="text-sm md:text-base text-gray-700 leading-relaxed">{description}</p>
      }
    </div>
  )
}
