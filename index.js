const API_KEY = "MhQNrKVHO1JvNzUITP9zmToi1B0m5Q2n";
const API_PREFIX = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_SETTINGS = "offset=0&rating=g&lang=en&bundle=messaging_non_clips";

  function formSubmitted(e) {
    e.preventDefault()
    const inputField = document.querySelector("[name='user-input']");
    const inputFieldContent = inputField.value.trim();
    const validationError = document.querySelector(".error-message");
    

    validationError.style.display = "none";
    validationError.textContent = "";

    if (!inputFieldContent) {
      validationError.textContent = "please enter input!";
      validationError.style.display = "block";
      return;
    } 
    getMemes(inputFieldContent);
  }

  function renderGifs(response) {
    const imageContainer = document.querySelector(".js-memes-container");
    imageContainer.innerHTML = "";

    response.data.map((gif, index) => {
      const img = document.createElement("img");
      img.src = gif.images.original.url;
      img.alt = `meme-${index + 1}`;
      imageContainer.appendChild(img);
    });
  }

  async function getMemes(searchExpression) {
    disableSubmitButton();

    const loading = document.querySelector("#loading");
    loading.style.display = "block";

    const imageContainer = document.querySelector(".js-memes-container");
    imageContainer.innerHTML = "";

    try {
      const response = await fetch(
        `${API_PREFIX}${API_KEY}&q=${searchExpression}&${API_SETTINGS}`
      );
      
      const data = await response.json();

      if (data.data.length === 0 || !response.ok) {
        throw new Error("Memes not found!");
      }

      renderGifs(data);
    } catch (error) {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } finally {
      enableSubmitButton();
      loading.style.display = "none";
    }
  }

  function disableSubmitButton() {
    document.querySelector("#button").disabled = true;
  }

  function enableSubmitButton() {
    document.querySelector("#button").disabled = false;
  }

  document.querySelector(".meme-form").addEventListener("submit", formSubmitted);
