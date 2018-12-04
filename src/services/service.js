import api from './api';

export const getListCategories = () => api.get('/service/list-category');

export const getServicesByCategory = (params) => api.get(`/service/category/${params}`)

export const orderServiceComfirm = (params) => api.post('/order/service', params)

