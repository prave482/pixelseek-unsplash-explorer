const request = async (url, signal) => {
  const response = await fetch(url, { signal });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || 'Unable to load photographs.');
  return body;
};

export const getPhotos = ({ query, page, signal }) => {
  const params = new URLSearchParams({ page: String(page), per_page: '12' });
  return request(query ? `/api/photos/search?q=${encodeURIComponent(query)}&${params}` : `/api/photos/featured?${params}`, signal);
};
