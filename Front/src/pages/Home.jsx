import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import Hero from './Hero.jsx';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Effettua una richiesta GET al backend per ottenere tutti i post
        const response = await getPosts();
        // Aggiorna lo stato con i dati dei post
        setPosts(response.data);
      } catch (error) {
        // Logga eventuali errori nella console
        console.error("Errore nella fetch del post:", error);
      }
    };
    // Chiamiamo la funzione fetchPosts
    fetchPosts();
  }, []);


  return (
    <div className="container mx-auto p-4 mt-5">
      <Hero />
      <h1 className="text-3xl font-bold mb-4 mt-5 text-center font-original text-gray-800 hover:text-indigo-900 transition-colors duration-300">
        Consulta i nostri servizi
      </h1>
      <div className="post-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {posts.map(post => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="post-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transform transition-transform duration-300 mt-5"
          >
            <img
              src={post.cover}
              alt={post.title}
              className="post-image w-full h-48 object-cover"
            />
            <div className="post-content p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 mt-2">Categoria: {post.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
}