import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profileReducer from './profile_reducer';
import user from './user_reducer';
import gamesReducer from './games_reducer';
import players from './players_reducer';
import achievements from './achievements_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    profile: profileReducer,
    user: user,
    games: gamesReducer,
    players: players,
    achievements: achievements
});

export default rootReducer;