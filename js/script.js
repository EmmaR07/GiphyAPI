console.log("script.js loaded");

const API_KEY = "PASTE_YOUR_GIPHY_API_KEY_HERE";
const endpoint = "https://api.giphy.com/v1/gifs/search";
const searchInput = document.querySelector("#search-input");
const fetchButton = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");
const statusMessage = document.createElement("p");
statusMessage.className = "text-center";
statusMessage.setAttribute("role", "status");
gifContainer.parentNode.insertBefore(statusMessage, gifContainer);

async function fetchAndDisplayGifs() {
  const query = searchInput.value.trim();
  if (!query) {
    statusMessage.textContent = "Enter a search term.";
    return;
  }

  if (API_KEY === "PASTE_YOUR_GIPHY_API_KEY_HERE") {
    statusMessage.textContent = "Add your GIPHY API key in js/script.js before searching.";
    return;
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    q: query,
    limit: "25",
    rating: "g",
  });

  statusMessage.textContent = "Loading GIFs...";
  gifContainer.replaceChildren();

  try {
    const response = await fetch(`${endpoint}?${params}`);
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new Error(jsonResponse.meta?.msg || `GIPHY request failed (${response.status}).`);
    }

    const gifs = jsonResponse.data ?? [];
    if (gifs.length === 0) {
      statusMessage.textContent = "No GIFs found. Try another search.";
      return;
    }

    gifs.forEach((gif) => {
      const column = document.createElement("div");
      column.className = "col-6 col-md-4 col-lg-3 mb-3";

      const image = document.createElement("img");
      image.src = gif.images.fixed_width.url;
      image.alt = gif.title || `GIF matching ${query}`;
      image.className = "img-fluid rounded";
      image.loading = "lazy";

      column.appendChild(image);
      gifContainer.appendChild(column);
    });
    statusMessage.textContent = `Showing ${gifs.length} GIFs for "${query}".`;
  } catch (error) {
    console.error("Error fetching GIFs from GIPHY:", error);
    statusMessage.textContent = error.message || "Could not load GIFs. Check your connection and API key.";
  }
}

fetchButton.addEventListener("click", fetchAndDisplayGifs);