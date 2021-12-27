import types from './discover.types';


const initial_state = {

    search : '' , 
    // location : '' ,
    category : [], 
    home_auction : [], 
    type : [] , 
    ordering : ''
}


const discoverReducer = (state = initial_state, {type, payload = {}}) => {
    switch (type) {


        case types.SET_FILTER_QUERIES:
            return {
                ...state , 
                search : payload.search , 
                // location : payload.location ,
                category : payload.category, 
                home_auction : payload.home_auction, 
                type : payload.type , 
                ordering : payload.ordering , 
            }


        case types.CLEAR_FILTERS:
            console.log('Clear All Filters');
            return {
                ...state , 
                search : '' , 
                // location : '' ,
                category : [], 
                home_auction : [], 
                type : [] , 
                ordering : '' , 
            }

        default :
            return state;
    }
}

export default discoverReducer;