import api from './api';

export const getListPet = () => api.get('/pet/list');

export const addPet = (params) => api.post('/pet', params);

export const deletePet = (params) => api.get(`/pet/delete/${params}`);

export const getPetDetail = (params) => api.get(`/pet/${params}`);

export const editPet = (params) => api.post(`/pet/edit/${params.petId}`, params.postData);

export const uploadImagePet = (params) => api.postImages(`/upload`, params);

export const deleteImagePet = (params) => api.get(`/delete-upload/${params}`);
