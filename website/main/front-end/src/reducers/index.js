import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user_reducer';
import gamesReducer from './games_reducer';
import players from './players_reducer';
import achievements from './achievements_reducer';
import matchHistory from './match_history_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: user,
    games: gamesReducer,
    players: players,
    achievements: achievements,
    matchHistory: matchHistory
});

export default rootReducer;