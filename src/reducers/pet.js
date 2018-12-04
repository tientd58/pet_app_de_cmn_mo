import {
    GET_LIST_PET_SUCCESS, ADD_PET_SUCCESS, 
    EDIT_PET_SUCCESS, DELETE_PET_SUCCESS,
    GET_PET_DETAIL_SUCCESS,
    UPLOAD_IMAGE_PET_SUCCESS,
    DELETE_IMAGE_UPLOAD_SUCCESS,
    DELETE_IMAGE_PET_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    listPet: [],
    petDetail: {},
    imagesPet: [],
    imagesId: '',
};

const removeToImageId = (imagesId, imageIdRemove) => {
    const arrayImagesId = imagesId.split('/');
    const indexRemove = arrayImagesId.findIndex(item => item === imageIdRemove);
    arrayImagesId.splice(indexRemove, 1);
    const newImagesId = arrayImagesId.join();
    return newImagesId;
}

const removeToImagePet = (imagesPet, imageRemove) => {
    const indexRemove = imagesPet.findIndex(item => item === imageRemove);
    imagesPet.splice(indexRemove, 1);
    return imagesPet;
}

const updatePet = (listPet, petUpdated) => listPet.map(item => {
    if (item.id === petUpdated.id) {
        return petUpdated;
    }
    return item;
})

const Pet = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_LIST_PET_SUCCESS: {
            const listPet = action.payload.data;
            return { ...state, listPet }
        }
        case ADD_PET_SUCCESS: {
            const newPet = action.payload.data;
            return {
                ...state,
                listPet: [...state.listPet, newPet],
                imagesPet: [],
                imagesId: '',
            }
        }
        case EDIT_PET_SUCCESS: {
            const petDetail = action.payload.data;
            const listPet = updatePet(state.listPet, petDetail);
            return {
                ...state,
                petDetail,
                listPet,
                imagesPet: [],
                imagesId: '',
            }
        }
        case DELETE_PET_SUCCESS: {
            const listPet = state.listPet;
            const indexDelete = listPet.findIndex(item => item.id === action.payload.petId)
            listPet.splice(indexDelete, 1);
            return { ...state, listPet };
        }
        case GET_PET_DETAIL_SUCCESS: {
            const petDetail = action.payload.data;
            return { ...state, petDetail}
        }
        case UPLOAD_IMAGE_PET_SUCCESS: {
            const newImage = action.payload.data.full;
            const imagesId = state.imagesId;
            let newId = '';
            if (imagesId.length === 0) newId = `${action.payload.data.id}`;
            else newId = imagesId.concat(`,${action.payload.data.id}`);
            return {
                ...state,
                imagesPet: [...state.imagesPet, newImage],
                imagesId: newId,
            }
        }
        case DELETE_IMAGE_UPLOAD_SUCCESS: {
            const imagesId = removeToImageId(state.imagesId, action.payload.imageIdRemove);
            const imagesPet = removeToImagePet(state.imagesPet, action.payload.imageRemove);
            return { ...state, imagesId, imagesPet };
        }
        case DELETE_IMAGE_PET_SUCCESS: {
            const petDetail = state.petDetail;
            const images = petDetail.images;
            const newImages = removeToImagePet(images, action.payload.imageRemove)
            petDetail.images = newImages;
            return {
                ...state,
                petDetail,
            }
        }
        default: return { ...state };
    }
}

export default Pet;