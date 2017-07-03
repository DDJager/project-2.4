import { PLAYERS } from '../actions/index'

export default function(state = {}, action) {
    if (action.type === PLAYERS) {
        const list = {list:action.payload.data};
        return list;
    }else {
        return state;
    }
}