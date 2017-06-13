import axios from 'axios';

const URL = `localhost:5000`;

export const CREATE_ACCOUNT = 'createAccount';
export const LOGIN = 'login';
export const LOAD_PROFILE = 'loadProfile';

export function createAccount(values) {
    const target = `${URL}/api/v1/register`;
    const request = axios.post(target, values);

    return {
        type: CREATE_ACCOUNT,
        payload: request
    }
}

export function login(values) {
    const target = `${URL}/api/v1/login`;
    const request = axios.post(target, values);
    return {
        type: LOGIN,
        payload: request
    }
}

export function loadProfile(id) {
    const target = `${URL}/api/v1/user/${id}/profile`;
    const request= axios.get(target);

    return {
        type: LOAD_PROFILE,
        payload: request
    }
}