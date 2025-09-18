export function ProductName({ name, className = "" }) {
  return <span className={`font-medium text-gray-900 ${className}`}>{name}</span>
}
