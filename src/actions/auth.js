import { AsyncStorage } from 'react-native';
import {
    AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, CLEAR_ERROR_CODE,
    CLEAR_ERROR_CODE_LOGIN, INITIALIZE_STORAGE, LOGOUT_USER,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
    USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAILURE,
    USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_PASSWORD_FAILURE,
} from './types';
import {
    login as loginService,
    register as registerService,
    sendEmailReset as sendEmailResetService,
    updatePassword as updatePasswordService,
 } from '../services/auth';
import { CALL_API } from '../middleware/api';
import { STORAGE_KEY } from '../utils/constants';

const handleLogin = (params) => ({
    [CALL_API]: {
        types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
        service: loginService,
        params,
    }
});

export const login = (userInfo) => dispatch => dispatch(handleLogin(userInfo));

export const clearErrorCode = () => dispatch => dispatch({
    type: CLEAR_ERROR_CODE,
});

export const clearErrorCodeLogin = () => dispatch => dispatch({
    type: CLEAR_ERROR_CODE_LOGIN,
});

export const initStorage = () => async (dispatch) => {
    const token = await AsyncStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
    const userId = parseInt(await AsyncStorage.getItem(STORAGE_KEY.AUTH_ID), 10);
    return dispatch({
        type: INITIALIZE_STORAGE,
        payload: { token, userId },
    });

};

export const logout = () => dispatch => dispatch({
    type: LOGOUT_USER,
});

const handleRegister = (params) => ({
    [CALL_API]: {
        types: [USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE],
        service: registerService,
        params,
    }
});

export const register = (userInfo) => dispatch => dispatch(handleRegister(userInfo));

const handleSendEmailReset = (params) => ({
    [CALL_API]: {
        types: [USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAILURE],
        service: sendEmailResetService,
        params,
        payload: params
    }
});

export const sendEmailReset = (email) => dispatch => dispatch(handleSendEmailReset(email));

const handleUpdatePasswprd = (params) => ({
    [CALL_API]: {
        types: [USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_PASSWORD_FAILURE],
        service: updatePasswordService,
        params,
    }
})
export const updatePassword = (newPassword) => dispatch => dispatch(handleUpdatePasswprd(newPassword));
