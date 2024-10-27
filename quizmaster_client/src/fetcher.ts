function updateOptions(options: RequestInit) {
  const update = { ...options };
  if (window.sessionStorage.getItem('token')) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': import.meta.env.VITE_API_URL,
    };
  }
  return update;
}

export default function fetcher(url: string, options: RequestInit) {
  return fetch(url, updateOptions(options));
}
