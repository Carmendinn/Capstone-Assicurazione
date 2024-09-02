import { useState, useEffect } from "react";
// Importa useParams per accedere ai parametri dell'URL
import { useParams } from "react-router-dom";
// Importo la funzione getPost dal mio file services/api
import { getPost } from "../services/api";

import React from 'react'

export default function DettagliServizio() {
  const [post, setPost] = useState(null);

  // Estrae l'id del post dai parametri dell'URL
  const { id } = useParams();

  // Effect hook per fetchare i dati del post quando il componente viene montato o l'id cambia
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Effettua una richiesta GET al backend per ottenere i dettagli del post
        const response = await getPost(id);
        // Aggiorna lo stato con i dati del post
        setPost(response.data);
      } catch (error) {
        // Logga eventuali errori nella console
        console.error("Errore nella fetch del post:", error);
      }
    };
    // Chiama la funzione fetchPost
    fetchPost();
  }, [id]); // L'effetto si attiva quando l'id cambia

  // Se il post non è ancora stato caricato, mostra un messaggio di caricamento
  if (!post) return <div>Caricamento...</div>;
  return (
    <div className="container mx-auto p-8 mt-10">
      <article className="post-detail bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Immagine di copertina del post */}
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          {/* Titolo del post */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

          {/* Dati del post */}
          <div className="post-meta text-gray-600 text-sm space-y-2 mb-6">
            <span className="block">
              <strong>Categoria:</strong> {post.category}
            </span>
            <span className="block">
              <strong>Autore:</strong> {post.author}
            </span>
            <span className="block">
              <strong>Tempo di lettura:</strong> {post.readTime?.value} {post.readTime?.unit}
            </span>
          </div>

          {/* Contenuto del post */}
          <div
            className="post-content prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>

  )
}
