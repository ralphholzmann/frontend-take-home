const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatNumber = (number: number) => {
  return number.toLocaleString('en-US');
};

const setQueryParam = (
  key: string,
  value?: string | null,
  mode: 'push' | 'replace' = 'replace',
) => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const current = typeof window !== 'undefined' ? window.location.search : '';
  const params = new URLSearchParams(current);

  if (value == null || value === '') {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  const url = `${pathname}${params.toString() ? `?${params}` : ''}`;
  const method = mode === 'push' ? 'pushState' : 'replaceState';
  window.history[method](null, '', url);
};

export { formatDate, formatNumber, setQueryParam };
