import {
    GET_LIST_FOOD_REQUEST, GET_LIST_FOOD_SUCCESS, GET_LIST_FOOD_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getListFood as getListFoodService,
} from '../services/coffee';

const handleGetListFood = () => ({
    [CALL_API]: {
        types: [GET_LIST_FOOD_REQUEST, GET_LIST_FOOD_SUCCESS, GET_LIST_FOOD_FAILURE],
        service: getListFoodService,
    }
});
export const getListFood = () => dispatch => dispatch(handleGetListFood());

