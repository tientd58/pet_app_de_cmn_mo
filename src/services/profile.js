import api from './api';

export const getProfileUser = () => api.get('/me')

export const editProfileUser = (params) => api.post('/changeProfile', params);

export const changePassword = (params) => api.post('/change-password', params);

export const getOrderHistory = () => api.get('/order/food/list');

export const getServiceHistory = () => api.get('/order/service/list');

export const uploadAvatarUser = (params) => api.postImages(`/upload`, params);