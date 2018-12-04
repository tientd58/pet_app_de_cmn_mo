import {
    GET_PROFILE_USER_SUCCESS, EDIT_PROFILE_USER_SUCCESS, CHANGE_PASSWORD_USER_SUCCESS,
    GET_ORDER_HISTORY_SUCCESS, GET_SERVICE_HISTORY_SUCCESS, UPLOAD_AVATAR_USER_SUCCESS,
    CLEAR_ERROR_CODE,
} from '../actions/types';

const INITIAL_STATE = {
    profileUser: {},
    listOrderHistory: [],
    listServiceHistory: [],
    avatar: null,
    avatarId: null,
    errorCode: null,
};

const Profile = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_PROFILE_USER_SUCCESS: {
            const profileUser = action.payload.data;
            return { ...state, profileUser };
        }

        case EDIT_PROFILE_USER_SUCCESS: {
            const profileUser = action.payload.data;
            return {
                ...state,
                profileUser,
                avatar: null,
                avatarId: null,
            };
        }

        case CHANGE_PASSWORD_USER_SUCCESS: {
            const errorCode = action.payload.status;
            return {...state, errorCode};
        }

        case GET_ORDER_HISTORY_SUCCESS: {
            const listOrderHistory = action.payload.data;
            return {
                ...state,
                listOrderHistory,
            };
        }

        case GET_SERVICE_HISTORY_SUCCESS: {
            const listServiceHistory = action.payload.data;
            return {
                ...state,
                listServiceHistory,
            };
        }

        case UPLOAD_AVATAR_USER_SUCCESS: {
            const avatar = action.payload.data.full;
            const avatarId = action.payload.data.id;
            return {
                ...state,
                profileUser: {
                    ...state.profileUser,
                    [action.payload.field]: avatar,
                },
                avatar,
                avatarId,
            }
        }

        case CLEAR_ERROR_CODE: return { ...state, errorCode: null };

        default: return { ...state };
    }
}

export default Profile;