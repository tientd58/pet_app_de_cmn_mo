import {
    GET_LIST_FOOD_REQUEST, GET_LIST_FOOD_SUCCESS, GET_LIST_FOOD_FAILURE,
    ORDER_FOOD_ITEM_SUCCESS, ORDER_REMOVE_ITEM_BILL,
    ORDER_COMFIRM_REQUEST, ORDER_COMFIRM_SUCCESS, ORDER_COMFIRM_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getListFood as getListFoodService,
    orderComfirm as orderComfirmService,
} from '../services/coffee';

const handleGetListFood = () => ({
    [CALL_API]: {
        types: [GET_LIST_FOOD_REQUEST, GET_LIST_FOOD_SUCCESS, GET_LIST_FOOD_FAILURE],
        service: getListFoodService,
    }
});
export const getListFood = () => dispatch => dispatch(handleGetListFood());

const handleOrderFood = (foodOrder) => ({
    type: ORDER_FOOD_ITEM_SUCCESS,
    payload: foodOrder,
})
export const orderFood = (foodOrder) => dispatch => dispatch(handleOrderFood(foodOrder))

const handleOrderRemoveFood = (foodOrder) => ({
    type: ORDER_REMOVE_ITEM_BILL,
    payload: foodOrder,
})
export const orderRemoveFood = (foodOrder) => dispatch => dispatch(handleOrderRemoveFood(foodOrder))

const handleOrderComfirm = (params) => ({
    [CALL_API]: {
        types: [ORDER_COMFIRM_REQUEST, ORDER_COMFIRM_SUCCESS, ORDER_COMFIRM_FAILURE],
        service: orderComfirmService,
        params,
    }
})
export const orderComfirm = (order) => dispatch => dispatch(handleOrderComfirm(order))
