import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_IMqG6bUaSyyjZTT55n3noYP1N2QAD7sn8mZiYwJS72fciTUD2iv8y9k1aP5sTgEW';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function fetchBreeds() {
  refs.loader.classList.replace('loader', 'not-hidden');
  refs.breedSelect.classList.add('hidden');
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      console.log(response.data);

      refs.breedSelect.insertAdjacentHTML(
        'beforeend',
        createMarkup(response.data)
      );
      new SlimSelect({
        select: refs.breedSelect,
        settings: {
          searchHighlight: true,
          showSearch: false,
        },
      });
    })
    .catch(error => {
      Notify.warning(`Oops! Something went wrong! Try reloading the page!`);
      refs.error.classList.replace('error', 'not-hidden');
    })
    .finally(() => refs.loader.classList.replace('not-hidden', 'loader')),
    refs.breedSelect.classList.remove('hidden');
}

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}

function fetchCatByBreed(breedId) {
  refs.loader.classList.replace('loader', 'not-hidden'),
    refs.container.classList.replace('cat-info', 'hidden');
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response.data);
      refs.container.innerHTML = createMarkupCatInfo(response.data);
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
      refs.error.classList.replace('error', 'not-hidden');
    })
    .finally(() => refs.loader.classList.replace('not-hidden', 'loader')),
    refs.container.classList.replace('hidden', 'cat-info');
}

function createMarkupCatInfo(arr) {
  return arr
    .map(
      ({ url, breeds }) => `  
       <img src="${url}" alt="${breeds[0].name}" />
      <div class="cat-desc">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><span class="desc-temper">Temperament</span>: ${breeds[0].temperament}</p>
      </div>`
    )
    .join('');
}

export { fetchBreeds, refs, fetchCatByBreed };
