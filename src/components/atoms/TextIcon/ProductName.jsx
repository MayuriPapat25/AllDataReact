export function ProductName({ name, className = "" }) {
  return <span className={`font-normal ${className}`}>{name}</span>
}
