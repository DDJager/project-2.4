import _ from 'lodash';

import { PLAYERS } from '../actions/index'

export default function(state = {}, action) {
    if (action.type === PLAYERS) {
        const data = action.payload.data;
        let newState = Object.assign({}, state);
        _.map(data, (player)=>{
            newState[player.id] = player;
        });
        return newState;
    }else {
        return state;
    }
}