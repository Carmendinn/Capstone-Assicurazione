import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Aggiungi useNavigate per gestire la navigazione
import { getPost, deletePost } from "../services/api"; // Importa la funzione deletePost per eliminare i post

export default function DettagliServizio() {
  const [post, setPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); // Aggiungi navigate per gestire la navigazione

  useEffect(() => {
    // Controlla se esiste un token nel localStorage (se è loggato)
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Controlla lo stato di login all'avvio
    checkLoginStatus();

    // Aggiungi un event listener per controllare lo stato di login
    window.addEventListener("storage", checkLoginStatus);

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (error) {
        console.error("Errore nella fetch del post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id); // Elimina il post tramite la funzione deletePost
      navigate("/"); // Torna alla pagina principale dopo l'eliminazione
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
      alert("Errore durante l'eliminazione del post. Riprova.");
    }
  };

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
          </div>

          {/* Contenuto del post */}
          <div
            className="post-content prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Se l'utente è loggato, mostra i pulsanti Modifica ed Elimina */}
          {isLoggedIn ? (
            <div className="mt-6 flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => navigate(`/post/edit/${id}`)}
              >
                Modifica
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={handleDelete}
              >
                Elimina
              </button>
            </div>
          ) : null /* Se non è loggato, non mostra nulla */}
        </div>
      </article>
    </div>
  );
}
