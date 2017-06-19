import { LOGIN } from '../actions/index';

export default function (state = {}, action) {

    switch (action.type) {
        case LOGIN:
            if (action.payload.status){
                const data = action.payload.data;
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

        default:
            return state;
    }
}