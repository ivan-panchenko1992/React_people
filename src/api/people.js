import request from './request';

const SWAPI_URL = 'https://swapi.dev/api/';

const getPeople = () => request(`${SWAPI_URL}people`);

export default getPeople;
