// Full-page spinner (centered)
const FullPageSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30">
    <div className="p-4 rounded-lg bg-white shadow-lg flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 50 50" className="inline-block align-middle">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
        <path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.682-18.682-18.682c-10.318,0-18.682,8.364-18.682,18.682h4.068 c0-8.072,6.542-14.614,14.614-14.614c8.072,0,14.614,6.542,14.614,14.614H43.935z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" />
        </path>
      </svg>
      <span className="text-sm font-medium">Updating access points...</span>
    </div>
  </div>
)

export default FullPageSpinner