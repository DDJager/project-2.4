import { GAMES } from '../actions/index';

export default function games(state = {}, action) {
    if (action.type === GAMES) {
        state = action.payload.data;
    }
    return state;
}