import types from './discover.types';


export const setFilterQueries = (data) => (
    {
        type: types.SET_FILTER_QUERIES,
        payload: data

    }
)


export const clearFilters = () => (
    {
        type: types.CLEAR_FILTERS,
    }
)