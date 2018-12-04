import { AsyncStorage } from 'react-native';
import { STORAGE_KEY } from '../utils/constants';
import { AUTH_SUCCESS, CLEAR_ERROR_CODE_LOGIN, INITIALIZE_STORAGE, USER_UPDATE_PASSWORD_SUCCESS,
    LOGOUT_USER, USER_REGISTER_SUCCESS, USER_RESET_PASSWORD_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    token: null,
    userInfo: {},
    errorCode: null,
    errorMessage: null,
    userId: null,
    code: null,
    emailReset: null,
};

const Auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_SUCCESS: {
            if (action.payload.status !== 200) {
                const errorCode = action.payload.status;
                return {
                    ...state,
                    errorCode,
                };
            }
            AsyncStorage.multiSet([
                [STORAGE_KEY.AUTH_TOKEN, action.payload.token],
                [STORAGE_KEY.AUTH_ID, action.payload.data.id.toString()]
            ]);
            return {
                ...state,
                errorCode: 200,
                token: action.payload.token,
                userInfo: action.payload.data,
                userId: action.payload.data.id
            };
        }
        case CLEAR_ERROR_CODE_LOGIN: {
            return {
                ...state,
                errorCode: null,
                errorMessage: null,
            };
        }
        case USER_REGISTER_SUCCESS: return { ...state }
        case INITIALIZE_STORAGE: return { token: action.payload.token, userId: action.payload.userId };
        case LOGOUT_USER: {
            AsyncStorage.multiRemove([STORAGE_KEY.AUTH_TOKEN, STORAGE_KEY.AUTH_ID]);
            return {...state};
        }
        case USER_RESET_PASSWORD_SUCCESS: {
            const code = action.payload.data;
            const errorCode = action.payload.status;
            const emailReset = action.payload.email;
            return {
                ...state,
                code,
                errorCode,
                emailReset,
            }
        }
        case USER_UPDATE_PASSWORD_SUCCESS: {
            const errorCode = action.payload.status;
            return {
                ...state,
                errorCode,
            }
        }
        default: return { ...state };
    }
}

export default Auth;