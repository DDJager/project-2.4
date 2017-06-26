import { ACHIEVEMENTS } from '../actions/index';

export default function (state = {}, action) {
    if (action.type === ACHIEVEMENTS) {
        const {achievements, id} = action.payload.data;
        state[id] = achievements;
        return state;
    }
    return state;
}