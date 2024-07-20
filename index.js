const API_KEY = "MhQNrKVHO1JvNzUITP9zmToi1B0m5Q2n";
const API_PREFIX = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_SETTINGS = "offset=0&rating=g&lang=en&bundle=messaging_non_clips";

function formSubmitted(e) {
  e.preventDefault();
  let inputFieldContent = document.querySelector('[name=memeInput]').value
  getMemes(inputFieldContent)
}

function renderGifs(response) {
  console.log(response)
}

function getMemes(searchExpression) {
  fetch(
    `${API_PREFIX}${API_KEY}&q=${searchExpression}&limit=25&${API_SETTINGS}`
  ).then(data => data.json())
   .then(renderGifs);
}

document.querySelector('#memeForm').addEventListener('submit', formSubmitted);
