import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.50.113.221:3333',
});
