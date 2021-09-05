import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import discoverReducer from './discover/discover.reducer';



const rootReducer = combineReducers(
    {
        auth : authReducer,
        discover : discoverReducer,
    }
)

export default rootReducer;