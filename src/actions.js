const apiKey = 'c330257a22c8e12156e8e0eaa7a666e0';
let moviesArr;

function getMovies(movies = []) {
    return {
        type: 'GET_MOVIES',
        movies
    }
}

const limit = 40;
let ar = ar || [];

function ultimateMovies () {
    return dispatch => {
        for (let i  = 1; i <= limit; i++) {
            moviesArr = (async () => {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=${apiKey}&page=${i}`);
                const json = await response.json();

                if (Object.keys(json).length > 2) {
                    ar.push(...json.results);
                    window.localStorage.setItem('state', JSON.stringify(ar));
                }
            })();
        }

        return dispatch(() => { moviesArr });
    }
}


export function getSortedMovies(movies) {
    return {
        type: 'SORT_BY_VALUE',
        movies
    }
}

export function searchMovies(movies) {
    return {
        type: 'SORT_BY_SEARCH',
        movies
    }
}

export function sortBy(value) {
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.${value}&vote_count.gte=10&api_key=${apiKey}`)
            .then(res => res.json())
            .then(movies => {
                return dispatch(getSortedMovies(movies.results));
            })
            .catch(err => new Error(err));
    }
}

export function fetchMovies () {
    return ultimateMovies();
}

export function fetchSearchMovies(term) {
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`)
            .then(res => res.json())
            .then(movies => {
                return dispatch(searchMovies(movies.results));
            })
            .catch(err => new Error(err));
    }
}

export function submitForm(data) {
    const { input:term, select:value } = data;

    return dispatch => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}&sort_by=vote_average.${value}`)
            .then(res => res.json())
            .then(movies => {
                return dispatch(searchMovies(movies.results));
            })
            .catch(err => new Error(err));
    }
}