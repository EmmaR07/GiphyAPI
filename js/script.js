console.log("script.js loaded");

const endpoint = "https://api.giphy.com/v1/stickers/search";

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");
const statusMessage = document.createElement("p");
statusMessage.className = "col-12 text-center";
statusMessage.setAttribute("role", "status");
gifContainer.appendChild(statusMessage);

async function fetchAndDisplayGifs() {
    const apiKey = 'pIhfbYyalYFITaFP6woRu8CBLevEzUE9';
    const params = new URLSearchParams({
        api_key: apiKey,
        q: searchInput.value.trim() || "dogs",
        limit: "25",
        rating: "g",
        lang: "en",
        bundle: "messaging_non_clips",
    });

    statusMessage.textContent = "Loading GIFs...";
    try {
        const response = await fetch(`${endpoint}?${params}`);
        const jsonResponse = await response.json();
        if (!response.ok) {
            throw new Error(jsonResponse.meta?.msg || `GIPHY request failed (${response.status}).`);
        }

        const gifs = jsonResponse.data || [];
        if (gifs.length === 0) {
            statusMessage.textContent = "No GIFs found. Try another search.";
            return;
        }

        gifContainer.replaceChildren(statusMessage);
        gifs.forEach(gif => {
            const column = document.createElement("div");
            column.className = "col-6 col-md-4 col-lg-3 mb-3";

            const imgElement = document.createElement("img");
            imgElement.src = gif.images.original.url;
            imgElement.alt = gif.title || "Giphy GIF";
            imgElement.className = "img-fluid rounded";
            imgElement.loading = "lazy";

            column.appendChild(imgElement);
            gifContainer.appendChild(column);
        });
        statusMessage.textContent = `Showing ${gifs.length} GIFs.`;
    } catch (error) {
        console.error("Error fetching data from Giphy:", error);
        statusMessage.textContent = error.message || "Could not load GIFs.";
    }
}

fetchButton.addEventListener("click", async () => {
    gifContainer.replaceChildren(statusMessage);
    await fetchAndDisplayGifs();
});