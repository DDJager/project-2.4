import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profileReducer from './profile_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    profile: profileReducer,
    user: user
});

export default rootReducer;