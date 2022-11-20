function updateOptions(options) {
  const update = { ...options };
  if (window.sessionStorage.getItem('token')) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}
