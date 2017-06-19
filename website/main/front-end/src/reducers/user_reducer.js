import { LOGIN } from '../actions/index';

export default function (state = {}, action) {

    switch (action.type) {
        case LOGIN:
            if (action.payload.status){
                return {
                    name: action.name,
                    token: action.payload.data.token,
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