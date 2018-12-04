import {
    GET_PROFILE_USER_REQUEST, GET_PROFILE_USER_SUCCESS, GET_PROFILE_USER_FAILURE,
    EDIT_PROFILE_USER_REQUEST, EDIT_PROFILE_USER_SUCCESS, EDIT_PROFILE_USER_FAILURE,
    CHANGE_PASSWORD_USER_REQUEST, CHANGE_PASSWORD_USER_SUCCESS, CHANGE_PASSWORD_USER_FAILURE,
    GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE,
    GET_SERVICE_HISTORY_REQUEST, GET_SERVICE_HISTORY_SUCCESS, GET_SERVICE_HISTORY_FAILURE,
    UPLOAD_AVATAR_USER_REQUEST, UPLOAD_AVATAR_USER_SUCCESS, UPLOAD_AVATAR_USER_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getProfileUser as getProfileUserService,
    editProfileUser as editProfileUserService,
    changePassword as changePasswordService,
    getOrderHistory as getOrderHistoryService,
    getServiceHistory as getServiceHistoryService,
    uploadAvatarUser as uploadAvatarUserService,
} from '../services/profile';

const handleGetProfileUser = () => ({
    [CALL_API]: {
        types: [GET_PROFILE_USER_REQUEST, GET_PROFILE_USER_SUCCESS, GET_PROFILE_USER_FAILURE],
        service: getProfileUserService,
    }
});
export const getProfileUser = () => dispatch => dispatch(handleGetProfileUser());

const handleEditProfile = (params) => ({
    [CALL_API]: {
        types: [EDIT_PROFILE_USER_REQUEST, EDIT_PROFILE_USER_SUCCESS, EDIT_PROFILE_USER_FAILURE],
        service: editProfileUserService,
        params,
    }
});
export const editProfile = (userProfile) => dispatch => dispatch(handleEditProfile(userProfile));

const handleChangePassword = (params) => ({
    [CALL_API]: {
        types: [CHANGE_PASSWORD_USER_REQUEST, CHANGE_PASSWORD_USER_SUCCESS, CHANGE_PASSWORD_USER_FAILURE],
        service: changePasswordService,    
        params,
    }
});
export const changePassword = (userProfile) => dispatch => dispatch(handleChangePassword(userProfile));

const handleGetOrderHistory = () => ({
    [CALL_API]: {
        types: [GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE],
        service: getOrderHistoryService,
    }
});
export const getOrderHistory = () => dispatch => dispatch(handleGetOrderHistory());

const handleGetServiceHistory = () => ({
    [CALL_API]: {
        types: [GET_SERVICE_HISTORY_REQUEST, GET_SERVICE_HISTORY_SUCCESS, GET_SERVICE_HISTORY_FAILURE],
        service: getServiceHistoryService,
    }
});
export const getServiceHistory = () => dispatch => dispatch(handleGetServiceHistory());

const handleUploadAvatarUser = (params) => ({
    [CALL_API]: {
        types: [UPLOAD_AVATAR_USER_REQUEST, UPLOAD_AVATAR_USER_SUCCESS, UPLOAD_AVATAR_USER_FAILURE],
        service: uploadAvatarUserService,
        params,
        payload: { field: 'avatar' }
    }
});
export const uploadAvatarUser = (avatar) => dispatch => dispatch(handleUploadAvatarUser(avatar));