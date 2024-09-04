import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Configura un'istanza di axios con l'URL di base
const api = axios.create({
  baseURL: API_URL,
});

// Aggiungi un'interceptor per includere il token di autenticazione in tutte le richieste
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Funzioni per le chiamate API
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
  api.put(`/servizi/${id}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deletePost = (id) => api.delete(`/servizi/${id}`);

export const registerUser = (userData) => api.post("/clienti", userData);

// Funzione per effettuare il login di un utente
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials); // Effettua la richiesta di login
    console.log("Risposta API login:", response.data); // Log della risposta per debugging
    return response.data; // Restituisce i dati della risposta
  } catch (error) {
    console.error("Errore nella chiamata API di login:", error); // Log dell'errore per debugging
    throw error; // Lancia l'errore per essere gestito dal chiamante
  }
};

// Funzione per ottenere i dati dell'utente attualmente autenticato
export const getMe = () =>
  api.get("/auth/me").then((response) => response.data);

// Funzione per ottenere i dati dell'utente attualmente autenticato con gestione degli errori
export const getUserData = async () => {
  try {
    const response = await api.get('/auth/me'); // Effettua la richiesta per ottenere i dati dell'utente
    return response.data; // Restituisce i dati della risposta
  } catch (error) {
    console.error('Errore nel recupero dei dati utente:', error); // Log dell'errore per debugging
    throw error; // Lancia l'errore per essere gestito dal chiamante
  }
};

export default api;
