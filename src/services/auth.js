import api from './api';

export const login = (params) => api.post('/login', params);

export const register = (params) => api.post('/register', params);

export const sendEmailReset = (params) => api.post('/reset-password', params);

export const updatePassword = (params) => api.post('/update-password', params);
