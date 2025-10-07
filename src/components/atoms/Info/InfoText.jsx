export function InfoText({ label, value, link, billStatus, className, billStatusClassName }) {
  // normalize status → lowercase, no spaces
  // const statusClass = `mr-auto ml-6 ${billStatus ? billStatus.toLowerCase().replace(/\s+/g, "-") : ""
  //   }`;

  const isFunctionLink = typeof link === "function";

  return (
    <div className={`flex justify-between flex-col md:flex-row md:items-center w-full ${className}`}>
      <div class="flex items-center space-x-4">
        {/* Label */}
        <span className="text-md ml">{label}</span>

        {/* Bill Status */}
        {billStatus && <span className={billStatusClassName}>{billStatus}</span>}
      </div>

      <div className="flex items-center space-x-2">
        {/* Value or Link */}
        {link ? (
          isFunctionLink ? (
            <button
              onClick={link}
              className="btn btn-primary cursor-pointer"
            >
              {value}
            </button>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline hover:text-primary"
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

