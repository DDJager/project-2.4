import { LOAD_PROFILE } from '../actions/index';

export default function(state, action) {
    if (action.type === LOAD_PROFILE){
        console.log('goinmg');
    }
    return ({
        name: 'ikke'
    })
}