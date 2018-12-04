import {
    SERVICE_GET_LIST_CATEGORY_REQUEST, SERVICE_GET_LIST_CATEGORY_SUCCESS, SERVICE_GET_LIST_CATEGORY_FAILURE,
    GET_SERVICES_BY_CATEGORY_REQUEST, GET_SERVICES_BY_CATEGORY_SUCCESS, GET_SERVICES_BY_CATEGORY_FAILURE,
    SERVICES_SELECTED_SUCCESS, SERVICES_REMOVE_ITEM_BILL, SERVICES_CELAR,
    SERVICES_COMFIRM_REQUEST, SERVICES_COMFIRM_SUCCESS, SERVICES_COMFIRM_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getListCategories as getListCategoriesService,
    getServicesByCategory as getServicesByCategoryService,
    orderServiceComfirm as orderServiceComfirmService,
} from '../services/service';

const handleGetListCategories = () => ({
    [CALL_API]: {
        types: [SERVICE_GET_LIST_CATEGORY_REQUEST, SERVICE_GET_LIST_CATEGORY_SUCCESS, SERVICE_GET_LIST_CATEGORY_FAILURE],
        service: getListCategoriesService,
    }
});
export const getListCategories = () => dispatch => dispatch(handleGetListCategories());

const handleGetServicesByCategory = (params) => ({
    [CALL_API]: {
        types: [GET_SERVICES_BY_CATEGORY_REQUEST, GET_SERVICES_BY_CATEGORY_SUCCESS, GET_SERVICES_BY_CATEGORY_FAILURE],
        service: getServicesByCategoryService,
        params,
    }
});
export const getServicesByCategory = (categoryId) => dispatch => dispatch(handleGetServicesByCategory(categoryId));

const handleOrderService = (serviceOrdered, listServices) => ({
    type: SERVICES_SELECTED_SUCCESS,
    payload: {serviceOrdered, listServices},
})
export const orderService = (serviceOrdered, listServices) => dispatch => dispatch(handleOrderService(serviceOrdered, listServices))

const handleOrderRemoveService = (servicesOrder, listServices) => ({
    type: SERVICES_REMOVE_ITEM_BILL,
    payload: {servicesOrder, listServices},
})
export const orderRemoveService = (servicesOrder, listServices) => dispatch => dispatch(handleOrderRemoveService(servicesOrder, listServices))

const handleClearServiceOrdered = () => ({
    type: SERVICES_CELAR,
})
export const clearServiceOrdered = () => dispatch => dispatch(handleClearServiceOrdered())

const handleOrderServiceComfirm = (params, listServices) => ({
    [CALL_API]: {
        types: [SERVICES_COMFIRM_REQUEST, SERVICES_COMFIRM_SUCCESS, SERVICES_COMFIRM_FAILURE],
        service: orderServiceComfirmService,
        params,
        payload: listServices,
    }
})
export const orderServiceComfirm = (serviceOrder, listServices) => dispatch => dispatch(handleOrderServiceComfirm(serviceOrder, listServices))
