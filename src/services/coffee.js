import api from './api';

export const getListFood = () => api.get('/food/list');

export const orderComfirm = (params) => api.post('/order/food', params);
