
const initialState = { movies: [], sort_by: '' };

export default function reducers (state = initialState, action) {
    switch (action.type) {
        case 'GET_MOVIES':
            // return {
            //     ...state,
            //     movies: action.movies
            // }
            return Object.assign({}, state, { movies: action.movies });

        case 'SORT_BY_VALUE':
            // return {
            //     ...state,
            //     movies: action.movies
            // }
            return Object.assign({}, state, { movies: action.movies });

        case 'SORT_BY_SEARCH':
            // return {
            //     ...state,
            //     movies: action.movies
            // }
            return Object.assign({}, state, { movies: action.movies });
        default:
            return state;
    }
}