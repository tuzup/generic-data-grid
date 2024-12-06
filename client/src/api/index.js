import axios from 'axios';

const API = axios.create({ baseURL: '' })

export const getAllData = () => API.get('/api/table/getAllData');

export const getSingleData = (id) => API.get(`/api/table/getSingleData/${id}`);