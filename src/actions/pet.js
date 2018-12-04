import {
    GET_LIST_PET_REQUEST, GET_LIST_PET_SUCCESS, GET_LIST_PET_FAILURE,
    ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE,
    DELETE_PET_REQUEST, DELETE_PET_SUCCESS, DELETE_PET_FAILURE,
    EDIT_PET_REQUEST, EDIT_PET_SUCCESS, EDIT_PET_FAILURE,
    GET_PET_DETAIL_REQUEST, GET_PET_DETAIL_SUCCESS, GET_PET_DETAIL_FAILURE,
    UPLOAD_IMAGE_PET_REQUEST, UPLOAD_IMAGE_PET_SUCCESS, UPLOAD_IMAGE_PET_FAILURE,
    DELETE_IMAGE_UPLOAD_REQUEST, DELETE_IMAGE_UPLOAD_SUCCESS, DELETE_IMAGE_UPLOAD_FAILURE,
    DELETE_IMAGE_PET_REQUEST, DELETE_IMAGE_PET_SUCCESS, DELETE_IMAGE_PET_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getListPet as getListPetService,
    addPet as addPetService,
    deletePet as deletePetService,
    editPet as editPetService,
    getPetDetail as getPetDetailService,
    uploadImagePet as uploadImagePetService,
    deleteImagePet as deleteImagePetService,
} from '../services/pet';

const handleGetListPet = () => ({
    [CALL_API]: {
        types: [GET_LIST_PET_REQUEST, GET_LIST_PET_SUCCESS, GET_LIST_PET_FAILURE],
        service: getListPetService,
    }
});
export const getListPet = () => dispatch => dispatch(handleGetListPet());

const handleAddPet = (params) => ({
    [CALL_API]: {
        types: [ADD_PET_REQUEST, ADD_PET_SUCCESS, ADD_PET_FAILURE],
        service: addPetService,
        params,
    }
});
export const addPet = (pet) => dispatch => dispatch(handleAddPet(pet));

const handleEditPet = (postData, petId) => ({
    [CALL_API]: {
        types: [EDIT_PET_REQUEST, EDIT_PET_SUCCESS, EDIT_PET_FAILURE],
        service: editPetService,
        params: { postData, petId },
    }
});
export const editPet = (pet, petId) => dispatch => dispatch(handleEditPet(pet, petId));

const handleDeletePet = (params) => ({
    [CALL_API]: {
        types: [DELETE_PET_REQUEST, DELETE_PET_SUCCESS, DELETE_PET_FAILURE],
        service: deletePetService,
        params,
        payload: { petId: params }
    }
});
export const deletePet = (petId) => dispatch => dispatch(handleDeletePet(petId));

const handleGetPetDetail = (params) => ({
    [CALL_API]: {
        types: [GET_PET_DETAIL_REQUEST, GET_PET_DETAIL_SUCCESS, GET_PET_DETAIL_FAILURE],
        service: getPetDetailService,
        params,
    }
});
export const getPetDetail = (petId) => dispatch => dispatch(handleGetPetDetail(petId));

const handleUploadImagePet = (params) => ({
    [CALL_API]: {
        types: [UPLOAD_IMAGE_PET_REQUEST, UPLOAD_IMAGE_PET_SUCCESS, UPLOAD_IMAGE_PET_FAILURE],
        service: uploadImagePetService,
        params,
    }
});
export const uploadImagePet = (image) => dispatch => dispatch(handleUploadImagePet(image));

const handledeleteImageUpload = (params, imageRemove) => ({
    [CALL_API]: {
        types: [DELETE_IMAGE_UPLOAD_REQUEST, DELETE_IMAGE_UPLOAD_SUCCESS, DELETE_IMAGE_UPLOAD_FAILURE],
        service: deleteImagePetService,
        params,
        payload: {
            imageIdRemove: params,
            imageRemove,
        }
    }
})
export const deleteImageUpload = (imageId, imageRemove) => dispatch => dispatch(handledeleteImageUpload(imageId, imageRemove))

const handleDeleteImagePet = (params, imageRemove) => ({
    [CALL_API]: {
        types: [DELETE_IMAGE_PET_REQUEST, DELETE_IMAGE_PET_SUCCESS, DELETE_IMAGE_PET_FAILURE],
        service: deleteImagePetService,
        params,
        payload: {
            imageRemove,
        }
    }
})
export const deleteImagePet = (imageId, imageRemove) => dispatch => dispatch(handleDeleteImagePet(imageId, imageRemove))
