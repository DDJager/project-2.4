import { PLAYERS } from '../actions/index'

export default function(state = {}, action) {
    if (action.type === PLAYERS) {
        return action.payload.data
    }else {
        return state;
    }
}