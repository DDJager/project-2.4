import { LOGIN, AUTH_CHECK, LOGOUT } from '../actions/index';

export default function (state = {}, action) {

    switch (action.type) {
        case LOGIN:
            if (action.payload.status){
                const data = action.payload.data;
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.user.id);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("picture_url", data.user.picture_url);
                localStorage.setItem("description", data.user.description);

                return {
                    token: data.token,
                    username: data.user.username,
                    picture_url: data.user.picture_url,
                    description: data.user.description,
                    status: 'successful'
                };
            }else {
                return {
                    status: 'failed'
                }
            }
            break;
        case AUTH_CHECK:
            if (action.payload.status){
                const data = action.payload.data;
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.user.id);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("picture_url", data.user.picture_url);
                localStorage.setItem("description", data.user.description);

                return {
                    token: data.token,
                    username: data.user.username,
                    picture_url: data.user.picture_url,
                    description: data.user.description,
                    status: 'successful'
                };
            }else {
                localStorage.removeItem("token");
                return {};
            }
            break;
        case LOGOUT:
            return {};
            break;
        default:
            return state;
    }
}