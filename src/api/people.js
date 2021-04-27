import { request } from './api';

const getPeople = () => (request('people/'));

export default getPeople;
