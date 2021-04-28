export const swapiUrl = 'https://swapi.dev/api/';

const request = (url) => fetch(url)
  .then((response) => response.json())
  .then((result) => result.results)
  .catch(() => new Error('Request failed'));

export default request;
