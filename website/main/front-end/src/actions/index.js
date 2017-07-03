import axios from 'axios';

const URL = `http://145.37.150.210:5000/api/v1-0`;

export const CREATE_ACCOUNT = 'createAccount';
export const LOGIN = 'login';
export const GAMES = 'games';
export const PLAYERS = 'users';
export const USER = 'user';
export const AUTH_CHECK = 'authCheck';
export const LOGOUT = 'logout';
export const ACHIEVEMENTS = ' achievements';
export const MATCH_HISTORY = 'matchHistory';
export const UPDATE_ACCOUNT = 'updateAccount';

export function createAccount(values, success, failed) {
    const target = `${URL}/signup`;
    const request = axios.post(target, values)
        .then((response)=>success())
        .catch(()=>failed());
    return {
        type: CREATE_ACCOUNT,
        payload: request
    }
}

export function updateAccount(id, values) {
    const target = `${URL}/user/update/${id}`;
    const request = axios.post(target, values);
    return {
        type: UPDATE_ACCOUNT,
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

export function loadGames() {
    const target = `${URL}/games/`;
    const headers = {
        auth: {
            username: localStorage.getItem("token")
        }
    };
    const request = axios.get(target, headers);
    return {
        type: GAMES,
        payload: request
    }
}

export function loadUsers() {
    const target = `${URL}/users/`;
    const headers = {
        auth: {
            username: localStorage.getItem("token")
        }
    };
    const request = axios.get(target, headers);
    return {
        type: PLAYERS,
        payload: request
    }
}

export function loadUsername(username) {
    const target = `${URL}/search/user/${username}`;
    const headers = {
        auth: {
            username: localStorage.getItem("token")
        }
    };
    const request = axios.get(target, headers);
    return {
        type: USER,
        payload: request
    }
}

export function checkLogin() {
    const target = `${URL}/token`;
    const headers = {
        auth: {
            username: localStorage.getItem("token")
        }
    };
    const request = axios.get(target, headers);
    return {
        type: AUTH_CHECK,
        payload: request
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("picture_url");
    localStorage.removeItem("description");
    return {
        type: LOGOUT
    }
}

export function loadAchievements(id) {
    const target = `${URL}/achievements/${id}`;
    const headers = {
        auth: {
            username: localStorage.getItem("token")
        }
    };
    const request = axios.get(target, headers);
    return {
        type: ACHIEVEMENTS,
        payload: request
    }
}

export function loadMatchHistory(id) {
    const target = `${URL}/history/${id}`;
    const headers = {
        auth: {
            username: localStorage.getItem("token")
        }
    };
    const request = axios.get(target, headers);
    return {
        type: MATCH_HISTORY,
        payload: request
    }
}