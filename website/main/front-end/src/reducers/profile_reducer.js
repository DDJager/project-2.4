import { LOGIN } from '../actions/index';

export default function(state, action) {
    if (action.type === LOGIN){
        console.log('goinmg');
    }
    return ({
        name: 'ikke'
    })
}