import axios from "axios";

const API_ENDPOINT = "https://api.unsplash.com";
const CLIENT_ID = "censMuyin1i_kyCulN6S4ZLfNUWQjpfDpJyiP5wJLOQ";
const LIMIT = 10;

export async function getImages({ query, pageParam }) {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/search/photos?query=${query}&client_id=${CLIENT_ID}&page=${pageParam}&per_page=${LIMIT}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

export async function getPhotoById(id) {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/photos/${id}?client_id=${CLIENT_ID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching photo:", error);
    return null;
  }
}
