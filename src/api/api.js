export const swapiUrl = 'https://swapi.dev/api/';

export const request = (url) => {
  fetch(`${swapiUrl}${url}`)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch(() => new Error('Failed download'));
};
