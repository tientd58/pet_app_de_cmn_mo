import {
    SERVICE_GET_LIST_CATEGORY_REQUEST, SERVICE_GET_LIST_CATEGORY_SUCCESS, SERVICE_GET_LIST_CATEGORY_FAILURE,
} from './types';
import { CALL_API } from '../middleware/api';
import {
    getListCategories as getListCategoriesService,
} from '../services/service';

const handleGetListCategories = () => ({
    [CALL_API]: {
        types: [SERVICE_GET_LIST_CATEGORY_REQUEST, SERVICE_GET_LIST_CATEGORY_SUCCESS, SERVICE_GET_LIST_CATEGORY_FAILURE],
        service: getListCategoriesService,
    }
});
export const getListCategories = () => dispatch => dispatch(handleGetListCategories());

