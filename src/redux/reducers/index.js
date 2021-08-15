import {combineReducers} from 'redux';
// import panelReducer from './panel/panel.reducer';
import authReducer from './auth/auth.reducer';
// import estateReducer from './estate/estate.reducer';



const rootReducer = combineReducers(
    {
        // estate : estateReducer ,
        auth : authReducer,
        // panel : panelReducer
    }
)

export default rootReducer;