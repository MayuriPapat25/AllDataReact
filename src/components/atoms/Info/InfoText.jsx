export function InfoText({ label, value, link, billStatus }) {
  // normalize status → lowercase, no spaces
  const statusClass = billStatus
    ? billStatus.toLowerCase().replace(/\s+/g, "-")
    : "";

  const isFunctionLink = typeof link === "function";

  return (
    <div className="flex justify-between items-center">
      {/* Label */}
      <span className="text-sm text-gray-600">{label}</span>

      {/* Bill Status */}
      {billStatus && <span className={statusClass}>{billStatus}</span>}

      <div className="flex items-center space-x-2">
        {/* Value or Link */}
        {link ? (
          isFunctionLink ? (
            <button
              onClick={link}
              className="font-medium text-blue-600 underline hover:text-blue-800 bg-transparent border-none cursor-pointer"
            >
              {value}
            </button>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              {value}
            </a>
          )
        ) : (
          <span className="font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}
