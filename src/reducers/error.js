import {
    GET_LIST_PET_FAILURE,
    AUTH_FAILURE,
    CLEAR_ERROR_CODE,
    GET_PROFILE_USER_FAILURE,
    EDIT_PROFILE_USER_FAILURE,
    CHANGE_PASSWORD_USER_FAILURE,
    ADD_PET_FAILURE,
    DELETE_PET_FAILURE,
    EDIT_PET_FAILURE,
    GET_PET_DETAIL_FAILURE,
    UPLOAD_IMAGE_PET_FAILURE,
    UPLOAD_AVATAR_USER_FAILURE,
    GET_LIST_FOOD_FAILURE,
    ORDER_COMFIRM_FAILURE,
    SERVICE_GET_LIST_CATEGORY_FAILURE,
    GET_SERVICES_BY_CATEGORY_FAILURE,
    SERVICES_COMFIRM_FAILURE,
    DELETE_IMAGE_UPLOAD_FAILURE,
    USER_RESET_PASSWORD_FAILURE,
    USER_UPDATE_PASSWORD_FAILURE,
    DELETE_IMAGE_PET_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    errorCode: null,
    errorMessage: null,
};

const MyError = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_LIST_PET_FAILURE: return {...state}
        case EDIT_PROFILE_USER_FAILURE:
        case ADD_PET_FAILURE:
        case DELETE_PET_FAILURE:
        case EDIT_PET_FAILURE:
        case GET_PET_DETAIL_FAILURE:
        case UPLOAD_IMAGE_PET_FAILURE:
        case UPLOAD_AVATAR_USER_FAILURE:
        case GET_LIST_FOOD_FAILURE:
        case ORDER_COMFIRM_FAILURE:
        case SERVICE_GET_LIST_CATEGORY_FAILURE:
        case GET_SERVICES_BY_CATEGORY_FAILURE:
        case SERVICES_COMFIRM_FAILURE:
        case GET_PROFILE_USER_FAILURE:
        case CHANGE_PASSWORD_USER_FAILURE:
        case DELETE_IMAGE_UPLOAD_FAILURE:
        case USER_RESET_PASSWORD_FAILURE:
        case USER_UPDATE_PASSWORD_FAILURE:
        case DELETE_IMAGE_PET_FAILURE:
        case AUTH_FAILURE: {
            return {
                ...state,
            };
        }
        case CLEAR_ERROR_CODE: {
            return {
                ...state,
                errorCode: null,
            };
        }
        default: return { ...state };
    }
};

export default MyError;