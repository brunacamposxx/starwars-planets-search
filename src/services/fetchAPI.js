const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchAPI = () => (
  fetch(ENDPOINT)
    .then((response) => response.json())
    .then((response) => response.results)
);

export default fetchAPI;
