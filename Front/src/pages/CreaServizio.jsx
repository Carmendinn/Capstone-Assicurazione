import React from 'react'
import { useState } from "react";
// Importa useNavigate da react-router-dom per la navigazione programmatica
import { useNavigate } from "react-router-dom";
// Importo la funzione createPost dal mio file services/api
import { createPost } from "../services/api";



export default function CreaServizio() {
  const [post, setPost] = useState({
    title: "",
    category: "",
    content: "",
    readTime: { value: 0, unit: "minutes" },

  });
  const [coverFile, setCoverFile] = useState(null);

  // Hook per la navigazione
  const navigate = useNavigate();

  // Gestore per i cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "readTimeValue") {
      // Gestiamo il "readTime" del post
      setPost({
        ...post,
        readTime: { ...post.readTime, value: parseInt(value) },
      });
    } else {
      // Aggiornamento generale per gli altri campi
      setPost({ ...post, [name]: value });
    }
  };

  // Nuovo gestore per il cambiamento del file di copertina
  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  // Gestore per l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creiamo un oggetto FormData per inviare sia i dati del post che il file
      const formData = new FormData();

      // Aggiungiamo tutti i campi del post al FormData
      Object.keys(post).forEach((key) => {
        if (key === "readTime") {
          formData.append("readTime[value]", post.readTime.value);
          formData.append("readTime[unit]", post.readTime.unit);
        } else {
          formData.append(key, post[key]);
        }
      });

      // Aggiungiamo il file di copertina se presente
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      // Invia i dati del post al backend
      await createPost(formData);
      // Naviga alla rotta della home dopo la creazione del post
      navigate("/");
    } catch (error) {
      console.error("Errore nella creazione del post:", error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crea un nuovo post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo per il titolo */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Titolo</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Campo per il contenuto HTML */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Contenuto</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
          />
        </div>
        {/* Campo per l'upload del file di copertina */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Immagine di copertina</label>
          <input
            type="file"
            id="cover"
            name="cover"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Campo per il tempo di lettura */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Tempo di lettura (minuti)</label>
          <input
            type="number"
            id="readTimeValue"
            name="readTimeValue"
            value={post.readTime.value}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Pulsante di invio */}
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crea il servizio
        </button>
      </form>
    </div>

  )
};
