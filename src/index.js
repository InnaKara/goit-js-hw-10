import axios from 'axios';
import { fetchBreeds, refs, fetchCatByBreed } from './cat-api';

fetchBreeds();

refs.breedSelect.addEventListener('change', setOutput);

function setOutput(event) {
  const selectedOptionValue = event.currentTarget.value;
  fetchCatByBreed(selectedOptionValue);
}
