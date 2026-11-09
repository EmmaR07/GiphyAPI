console.log("script.js loaded");

const endpoint = "https://api.giphy.com/v1/stickers/search?api_key=&q=dogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");

async function fetchAndDisplayGifs() {
    const apiKey = 'pIhfbYyalYFITaFP6woRu8CBLevEzUE9';
    try {
        const response = await fetch(endpoint.replace("api_key=", `api_key=${apiKey}`));
        const jsonResponse = await response.json();

        const images = jsonResponse.data.map(gif => gif.images.original.url);

        console.log("Fetched Image URLS:", images);

        gifContainer.innerHTML = "";

        images.forEach(url => {
            const imgElement = document.createElement("img");
            imgElement.src = url;
            imgElement.alt = "Giphy GIF";
            imgElement.style.margin = "10px";
            imgElement.style.width = "200px";

            gifContainer.appendChild(imgElement);
        });
    } catch (error) {
        console.error("Error fetching data from Giphy:", error);
    }
}

fetchButton.addEventListener("click", asyng () => {
    gifContainer.innerHTML = '';
    const images = await fetchGIFS();

    if (images) {
        images.forEach(imageURLL => {
            gifContainer.innerHTML += '<img src="https://api.giphy.com/v1/stickers/search?api_key=&q=dogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips" class="col-3 mb-3">';
        });
    }
});