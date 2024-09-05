import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero.jsx';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto p-4 mt-5">
      <Hero />
      <h1 className="text-3xl font-bold mb-4 mt-5 text-center font-original text-gray-800 hover:text-indigo-900 transition-colors duration-300">
        Consulta i nostri servizi
      </h1>
      <div className="post-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {posts.length > 0 ? (
          posts.map(post => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="post-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transform transition-transform duration-300 mt-5"
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
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">Nessun servizio trovato.</p>
        )}
      </div>
    </div>
  );
}