import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_IMqG6bUaSyyjZTT55n3noYP1N2QAD7sn8mZiYwJS72fciTUD2iv8y9k1aP5sTgEW';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    console.log(response.data);
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };
