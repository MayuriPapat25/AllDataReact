export function cn(...classNames) {
  return classNames.filter(Boolean).join(" ")
}

export const getTestId = (base, key) => {
  // Accept string or array
  const normalized =
    Array.isArray(key)
      ? key.filter(Boolean).join('-')
      : key?.toString().trim();

  return `${base}-${normalized}`.toLowerCase().replace(/\s+/g, '-');
};

export const addMonthsAndFormat = (monthsToAdd) => {
  const d = new Date();
  // Add months, handling month overflow
  d.setMonth(d.getMonth() + monthsToAdd);

  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// helper inside the component, above the useEffect
export const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    const cache = new Set();
    return JSON.stringify(obj, function (key, value) {
      // skip functions
      if (typeof value === 'function') return undefined;
      // skip DOM nodes (safe on SSR because we test properties)
      if (value && typeof value === 'object') {
        // DOM node heuristic: nodeType === 1 is element node
        if (value.nodeType && value.nodeType === 1) return undefined;
        // skip React fiber/stateNode circular objects by ignoring known internal props
        if (key && key.startsWith('__react')) return undefined;
      }
      // handle circular refs
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) return undefined;
        cache.add(value);
      }
      return value;
    });
  }
};