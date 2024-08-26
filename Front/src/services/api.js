import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Configura un'istanza di axios con l'URL di base
const api = axios.create({
    baseURL: API_URL,
});



export const getPosts = () => api.get("/servizi");
export const getPost = (id) => api.get(`/servizi/${id}`);
// UPLOAD: modificata la funzione createPost per gestire FormData
export const createPost = (postData) =>
  api.post("/servizi", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updatePost = (id, postData) =>
  api.put(`/servizi/${id}`, postData);
export const deletePost = (id) => api.delete(`/servizi/${id}`);



export default api;