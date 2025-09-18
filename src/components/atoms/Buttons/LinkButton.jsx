export default function LinkButton({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`text-blue-600 underline ${className}`}>
      {children}
    </button>
  )
}
