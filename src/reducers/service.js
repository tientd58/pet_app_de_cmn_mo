import {
    SERVICE_GET_LIST_CATEGORY_SUCCESS, GET_SERVICES_BY_CATEGORY_SUCCESS,
    SERVICES_SELECTED_SUCCESS, SERVICES_REMOVE_ITEM_BILL, SERVICES_CELAR,
    SERVICES_COMFIRM_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    listCategory: [],
    listServices: [],
    serviceOrdered: [],
};

const customListService = (list) => list.map(item => {
    const isCollapsed = false;
    return { ...item, isCollapsed };
})

const Service = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SERVICE_GET_LIST_CATEGORY_SUCCESS: {
            const listCategory = action.payload.data;
            return { ...state, listCategory }
        }
        case GET_SERVICES_BY_CATEGORY_SUCCESS: {
            const listServices = customListService(action.payload.data);
            return { ...state, listServices }
        }
        case SERVICES_SELECTED_SUCCESS: {
            const serviceOrdered = action.payload.serviceOrdered;
            const listServices = action.payload.listServices;
            return { ...state, serviceOrdered, listServices };
        }
        case SERVICES_REMOVE_ITEM_BILL: {
            const serviceOrdered = action.payload.servicesOrder;
            const listServices = action.payload.listServices;
            return { ...state, serviceOrdered, listServices };
        }
        case SERVICES_COMFIRM_SUCCESS: {
            const listServices = action.payload;
            return { ...state, listServices };
        }
        case SERVICES_CELAR: return { ...state, serviceOrdered: [], listServices: [] };
        default: return { ...state };
    }
}

export default Service;