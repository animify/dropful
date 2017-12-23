import axios from 'axios';
import qs from 'qs';
import Auth from './Auth';
import History from './History';

const client = (token = null) => {
    const defaults = {
        headers: {
            Authorization: token ? `bearer ${token}` : '',
            'Content-type': 'application/x-www-form-urlencoded'
        }
    };

    axios.interceptors.response.use(response => response, (error) => {
        if (error.response.status === 400) {
            console.log(error.response.data);
        }

        if (error.response.status === 401) {
            History.push('/logout');
        }

        return Promise.reject(error.response);
    });

    return {
        get: (url, props = {}) => axios.get(url, { ...defaults, ...props }),
        post: (url, data, props = {}) => axios.post(url, qs.stringify(data), { ...defaults, ...props }),
        put: (url, data, props = {}) => axios.put(url, qs.stringify(data), { ...defaults, ...props }),
        delete: (url, props = {}) => axios.delete(url, { ...defaults, ...props }),
    };
};

const request = client(Auth.getToken());

export default request;
