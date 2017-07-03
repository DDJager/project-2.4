import { ACHIEVEMENTS } from '../actions/index';

export default function (state = {}, action) {
    if (action.type === ACHIEVEMENTS) {
        const {achievements, id} = action.payload.data;
        let newState = Object.assign({}, state);
        newState[id] = achievements;
        return newState;
    }
    return state;
}