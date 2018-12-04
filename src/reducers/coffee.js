import {
    GET_LIST_FOOD_SUCCESS, ORDER_FOOD_ITEM_SUCCESS, ORDER_REMOVE_ITEM_BILL,
    ORDER_COMFIRM_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    listFood: [],
    foodOrdered: [],
};

const Coffee = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_LIST_FOOD_SUCCESS: {
            const listFood = action.payload.data;
            return { ...state, listFood }
        }
        case ORDER_FOOD_ITEM_SUCCESS: {
            const newFoodOrdered = action.payload;
            const foodOrdered = [ ...state.foodOrdered, newFoodOrdered ];
            return { ...state, foodOrdered };
        }
        case ORDER_REMOVE_ITEM_BILL: {
            const foodOrdered = action.payload;
            return { ...state, foodOrdered };
        }
        case ORDER_COMFIRM_SUCCESS: {
            return { ...state, foodOrdered: [] };
        }
        
        default: return { ...state };
    }
}

export default Coffee;