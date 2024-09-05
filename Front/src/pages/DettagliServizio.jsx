import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost, updatePost } from "../services/api";
import { motion } from 'framer-motion';

export default function DettagliServizio() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    cover: null, // Per gestire l'immagine
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingPost, setEditingPost] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

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
      await deletePost(id);
      navigate("/");
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
      alert("Errore durante l'eliminazione del post. Riprova.");
    }
  };

  const handleEdit = () => {
    setEditingPost(true);
  };

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !post) {
      console.error('Utente non autorizzato o post non valido.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      if (post.cover instanceof File) {
        formData.append("cover", post.cover);
      }
  
      await updatePost(id, formData);
      setPost({
        ...post,
        cover: post.cover instanceof File ? URL.createObjectURL(post.cover) : post.cover
      });
      setEditingPost(false);
    } catch (error) {
      console.error("Errore nell'aggiornamento del post:", error);
      alert(`Errore nell'aggiornamento del post: ${error.message}`);
    }
  };
  
  if (!post) return <div>Caricamento...</div>;

  return (
    <div className="container mx-auto p-8 mt-10">
      <motion.article
        className="post-detail bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="post-meta text-gray-600 text-sm space-y-2 mb-6">
            <span className="block">
              <strong>Categoria:</strong> {post.category}
            </span>
          </div>
          <div
            className="post-content prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {isLoggedIn && (
            <div className="mt-4">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Modifica Post
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Elimina Post
              </button>
            </div>
          )}
          {editingPost && (
            <form onSubmit={handleEditPostSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Titolo
                </label>
                <input
                  type="text"
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  Contenuto
                </label>
                <textarea
                  id="content"
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="6"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cover">
                  Immagine di copertura
                </label>
                <input
                  type="file"
                  id="cover"
                  onChange={(e) => setPost({ ...post, cover: e.target.files[0] })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {post.cover && typeof post.cover === 'string' && (
                  <img src={post.cover} alt="Current cover" className="mt-2 w-32 h-32 object-cover" />
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Salva Modifiche
              </button>
            </form>
          )}
        </div>
      </motion.article>
    </div>
  );
}
