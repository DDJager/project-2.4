import { PLAYERS } from '../actions/index'

export default function(state = {}, action) {
    if (action.type === PLAYERS) {console.log(action.payload.data);
        const list = {list:action.payload.data};
        return list;
    }else {
        return state;
    }
}