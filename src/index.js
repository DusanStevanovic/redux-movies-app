import 'babel-polyfill';
import configureStore from './store';
import * as actions from './actions';
const store = configureStore();

let state;

const select = document.getElementById('select');
const form = document.getElementById('form');
const movie = document.getElementById('movie');
const input = document.querySelector('[name=search]');
const title = movie.querySelectorAll('h2')[0];
const text = movie.querySelectorAll('h3')[0];
const overview = movie.querySelectorAll('p')[0];

// select.addEventListener('change', function (e) {
//     const value = this.value;

//     store.dispatch(actions.sortBy(e.target.value));
//     setTimeout(renderMovies, 500);
// });

// input.addEventListener('keyup', function (e) {
//     var term = this.value;

//     if (!term) {
//         setTimeout(renderMovies, 500);
//     }

//     store.dispatch(actions.fetchSearchMovies(term));

//     setTimeout(renderMovies(term), 500);
// });

form.addEventListener('submit', function (e) {

    e.preventDefault();

    if (!input.value) {
        document.querySelector('input').previousElementSibling.style.color = 'red';
        return;
    } else {
        document.querySelector('input').previousElementSibling.style.color = 'black';
    }

    const data = {
        input: input.value,
        select: select.value
    }

    store.dispatch(actions.submitForm(data));

    // setTimeout(renderMovies(data), 500);
    store.subscribe(() => renderMovies(data));
});

const renderMovies = (data = {}) => {
    const { input:value } = data;

    state = typeof store.getState().movies === 'undefined' || store.getState().movies.length === 0 ? JSON.parse(window.localStorage.getItem('state')) : store.getState();
    movie.innerHTML = '';

    (state.movies || state).filter(m => {
        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        let h3 = document.createElement('h3');
        let stringify;

        try {
            stringify = JSON.stringify(`${m.title} ${m.overview }`);
        } catch (e) {
            stringify = '';
        }

        // if (stringify.toLowerCase().indexOf((value || '').toLowerCase()) === -1) return;

        h2.innerHTML = typeof value !== 'undefined' ? m.title.toLowerCase().replace(value.toLowerCase(), `<i>${value.toUpperCase()}</i>`) : m.title;
        h3.textContent = m.vote_average;
        p.innerHTML = typeof value !== 'undefined' ? m.overview.toLowerCase().replace(value.toLowerCase(), `<i>${value.toUpperCase()}</i>`) : m.overview;
        li.append(h2, p, h3);

        return movie.append(li);
    });
}

// initial render
store.dispatch(actions.fetchMovies());
setTimeout(renderMovies, 500);


