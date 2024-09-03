import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createPost, getMe } from "../services/api";

export default function CreaServizio() {
  const [servizio, setServizio] = useState({
    category: '',
    title: '',
    content: '',
    duration: '',
    terms: '',
    price: '', // Campo opzionale per il prezzo
    author: '' // Campo per l'email dell'autore
  });

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userData = await getMe();
        setServizio((prevServizio) => ({ ...prevServizio, author: userData.email }));
      } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error);
        navigate("/login");
      }
    };
    fetchUserEmail();
  }, [navigate]);

  const [coverFile, setCoverFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Aggiornamento generale per i campi del servizio
    setServizio({ ...servizio, [name]: value });
  };

  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData();

      // Aggiungo tutti i campi del servizio al formData
      Object.keys(servizio).forEach((key) => {
        // Se il campo `price` è vuoto, impostalo su `0` o `null`
        formData.append(key, key === 'price' && servizio[key] === '' ? 0 : servizio[key]);
      });

      // Aggiungo il file di copertina, se presente
      if (coverFile) {
        formData.append("cover", coverFile);
      } else {
        throw new Error("L'immagine di copertina è obbligatoria");
      }

      // Invio dei dati al backend
      const response = await createPost(formData);

      if (response && response.data.success) {
        setSuccessMessage("Servizio creato con successo!");
        setTimeout(() => navigate("/"), 2000); // Reindirizza dopo 2 secondi
      } else {
        throw new Error(response.data.message || "Errore durante la creazione del servizio");
      }
    } catch (error) {
      console.error("Errore nella creazione del servizio:", error);
      setError(error.message || "Si è verificato un errore durante la creazione del servizio");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crea un nuovo servizio</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Categoria</label>
          <select
            name="category"
            value={servizio.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleziona una categoria</option>
            <option value="Auto">Auto</option>
            <option value="Casa">Casa</option>
            <option value="Vita">Vita</option>
            <option value="Salute">Salute</option>
            <option value="Viaggio">Viaggio</option>
            <option value="Animali">Animali</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Titolo</label>
          <input
            type="text"
            name="title"
            value={servizio.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Contenuto</label>
          <textarea
            name="content"
            value={servizio.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Immagine di copertina</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Durata</label>
          <input
            type="text"
            name="duration"
            value={servizio.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Termini e condizioni</label>
          <textarea
            name="terms"
            value={servizio.terms}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">Prezzo</label>
          <input
            type="number"
            name="price"
            value={servizio.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crea il servizio
        </button>
      </form>
    </div>
  );
}
