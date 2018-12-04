import { AsyncStorage } from "react-native";
import { STORAGE_KEY } from '../utils/constants';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (endpoint, options, contentType) => {
    // set headers for the request
    const token = await AsyncStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
    const authHeader = token ? { 'Authorization': token } : {};

    const mergedOptions = {
        ...options,
        'headers': {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': contentType,
            ...authHeader,
        },
    };

    // check endpoint
    const URL_FROM_CONFIG = endpoint.includes(process.env.API_DOMAIN) ? endpoint : `${process.env.API_PROTOCOL}${process.env.API_DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PATH}`;

    const API_URL = process.env.API_DOMAIN ? URL_FROM_CONFIG : 'http://thepawskingdom.yousoft.vn/api/v1';

    const fullUrl = (endpoint.indexOf(API_URL) === -1) ? API_URL + endpoint : endpoint;
    try {
        const response = await fetch(fullUrl, mergedOptions);
        // success
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        // error
        return Promise.reject({
            status: response.status,
            text: response.statusText,
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

const get = (endpoint, params = null) => {
    // convert json params to query string
    let requestUrl = endpoint;
    if (params) {
        requestUrl += `/${params}`;
    }
    const options = {
        method: 'GET',
    }
    return callApi(requestUrl, options, 'application/json');
};

const post = (endpoint, params = []) => {
    // convert params to json
    const postData = JSON.stringify(params);
    const options = {
        method: 'POST',
        body: postData
    };
    return callApi(endpoint, options, 'application/json');
};

const postImages = (endpoint, params = []) => {
    const options = {
        method: 'POST',
        body: params
    };
    return callApi(endpoint, options, 'multipart/form-data');
};

const put = (endpoint, params) => {
    const options = {
        method: 'PUT',
        body: params ? JSON.stringify(params) : null,
    };
    return callApi(endpoint, options);
};

const remove = (endpoint) => {
    const options = {
        method: 'DELETE',
    };
    return callApi(endpoint, options);
};

export default { get, post, put, remove, postImages };