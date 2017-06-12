import axios from 'axios';

const URL = `localhost:5000`;

export const CREATE_ACCOUNT = 'createAccount';
export const LOGIN = 'login';

export function createAccount(values) {
    const request = axios.post(URL, values);

    return {
        type: CREATE_ACCOUNT,
        payload: request
    }
}

export function login(values) {
    const request = axios.post(URL, values);
    return {
        type: LOGIN,
        payload: request
    }
}

export function loadProfile(id) {
    const request= axios.get(URL)
}