import {
    CLEAR_ERROR_CODE, CLEAR_ERROR_CODE_LOGIN,
} from './types';

export const clearErrorCode = () => dispatch => dispatch({
    type: CLEAR_ERROR_CODE,
});

export const clearErrorCodeLogin = () => dispatch => dispatch({
    type: CLEAR_ERROR_CODE_LOGIN,
});
