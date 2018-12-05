import {
    GET_PROFILE_USER_REQUEST, GET_PROFILE_USER_SUCCESS, GET_PROFILE_USER_FAILURE,
    UPLOAD_AVATAR_USER_REQUEST, UPLOAD_AVATAR_USER_SUCCESS, UPLOAD_AVATAR_USER_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getProfileUser as getProfileUserService,
    uploadAvatarUser as uploadAvatarUserService,
} from '../services/profile';

const handleGetProfileUser = () => ({
    [CALL_API]: {
        types: [GET_PROFILE_USER_REQUEST, GET_PROFILE_USER_SUCCESS, GET_PROFILE_USER_FAILURE],
        service: getProfileUserService,
    }
});
export const getProfileUser = () => dispatch => dispatch(handleGetProfileUser());

const handleUploadAvatarUser = (params) => ({
    [CALL_API]: {
        types: [UPLOAD_AVATAR_USER_REQUEST, UPLOAD_AVATAR_USER_SUCCESS, UPLOAD_AVATAR_USER_FAILURE],
        service: uploadAvatarUserService,
        params,
        payload: { field: 'avatar' }
    }
});
export const uploadAvatarUser = (avatar) => dispatch => dispatch(handleUploadAvatarUser(avatar));