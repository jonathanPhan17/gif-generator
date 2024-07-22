const API_KEY = "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";

const maxImages = 4; 
let selectedImageNumber = null;

function disableLoadingButton() {
  document.getElementById("button").disabled = true;
}

function enableLoadingButton() {
  document.getElementById("button").disabled = false;
}

function clearImages() {
  const imageGrid = document.getElementById("image-grid");
  imageGrid.innerHTML = "";
}

async function generateImages(input) {
  disableLoadingButton();
  clearImages();

  const loading = document.getElementById("loading");
  loading.style.display = "block";

  const imageUrls = [];

  for (let i = 0; i < maxImages; i++) {
    const randomNumber = Math.random();
    const prompt = `${input} ${randomNumber}`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      alert("Failed to load image!");
    }

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    imageUrls.push(imgUrl);

    const img = document.createElement("img");
    img.src = imgUrl;
    img.onclick = () => downloadImage(imgUrl, i);
    document.getElementById("image-grid").appendChild(img);
  }

  loading.style.display = "none";
  enableLoadingButton();  

  selectedImageNumber = null; 
}

document.getElementById("button").addEventListener("click", () => {
  const input = document.getElementById("user-input").value;
  generateImages(input);
});

function downloadImage(imgUrl, imageNumber) {
  const link = document.createElement("a");
  link.href = imgUrl;

  link.download = `image-${imageNumber}.jpg`;
  link.click();
}