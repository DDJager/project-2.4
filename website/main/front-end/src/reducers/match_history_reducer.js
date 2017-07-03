import { MATCH_HISTORY } from '../actions/index';

export default function(state = {}, action) {
    if (action.type === MATCH_HISTORY && action.payload.status) {
        const {games, id} = action.payload.data;
        let newState = Object.assign({}, state);
        newState[id] = games;
        return newState;
    }
    return state;
}