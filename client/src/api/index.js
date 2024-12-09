import axios from 'axios';

const API = axios.create({ baseURL: '' })

export const getAllData = () => API.get('/api/table/getAllData');

export const getSingleData = (id) => API.get(`/api/table/getSingleData/${id}`);

export const deleteData = (id) => API.delete(`/api/table/deleteData/${id}`);

export const initializeData = () => API.get('/api/table/addData');

export const searchData = (searchValue) => API.post('/api/table/searchData',searchValue);

export const filterData = (filterValue) => API.post('/api/table/filterData',filterValue);