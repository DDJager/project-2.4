import axios from 'axios';

const URL = `http://localhost:5000/api/v1-0`;

export const CREATE_ACCOUNT = 'createAccount';
export const LOGIN = 'login';
export const LOAD_PROFILE = 'loadProfile';
export const GAMES = 'games';
export const PLAYERS = 'users';

export function createAccount(values, success, failed) {
    const target = `${URL}/authenticate/`;
    const request = axios.post(target, values)
        .then((response)=>success())
        .catch(()=>failed());
    return {
        type: CREATE_ACCOUNT,
        payload: request
    }
}

export function login(values) {
    const target = `${URL}/token`;
    const headers = {
        auth: {
            username: values.username,
            password: values.password
        }
    };
    const request = axios.get(target, headers);
    return {
        type: LOGIN,
        payload: request
    }
}

export function loadProfile(id) {
    const target = `${URL}/user/${id}/profile`;
    const request= axios.get(target);

    return {
        type: LOAD_PROFILE,
        payload: request
    }
}

export function loadGames(token) {
    const target = `${URL}/games/`;
    const headers = {
        auth: {
            username: token
        }
    };
    const request = axios.get(target, headers);
    return {
        type: GAMES,
        payload: request
    }
}

export function loadUsers(token) {
    const target = `${URL}/users/`;
    const headers = {
        auth: {
            username: token
        }
    };
    const request = axios.get(target, headers);
    return {
        type: PLAYERS,
        payload: request
    }
}