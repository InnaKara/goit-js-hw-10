import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

collectionBreeds();

function collectionBreeds() {
  refs.loader.classList.replace('loader', 'not-hidden');
  refs.breedSelect.classList.add('hidden');
  fetchBreeds()
    .then(response => {
      refs.breedSelect.innerHTML = createMarkup(response);
      new SlimSelect({
        select: refs.breedSelect,
      });
    })
    .catch(error =>
      Notify.warning(`Oops! Something went wrong! Try reloading the page!`)
    )
    .finally(() => refs.loader.classList.replace('not-hidden', 'loader')),
    refs.breedSelect.classList.remove('hidden');
}

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}

// //вибір кота
refs.breedSelect.addEventListener('change', setOutput);

function setOutput(event) {
  const selectedOptionValue = event.currentTarget.value;
  refs.loader.classList.replace('loader', 'not-hidden'),
    refs.container.classList.replace('cat-info', 'hidden');
  fetchCatByBreed(selectedOptionValue)
    .then(
      response => (refs.container.innerHTML = createMarkupCatInfo(response))
    )
    .catch(error =>
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
    )
    .finally(
      () => refs.loader.classList.replace('not-hidden', 'loader'),
      refs.container.classList.replace('hidden', 'cat-info')
    );
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
