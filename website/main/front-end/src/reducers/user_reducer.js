import { LOGIN } from '../actions/index';

export default function (state = null, action) {

    switch (action.type) {
        case LOGIN:
            if (action.payload.status){
                console.log(action.payload.data.token);
                return {
                    name: action.name,
                    token: action.payload.data.token
                };
            }else {
                //TODO handle authentication rejection
            }

        default:
            return state;
    }
}