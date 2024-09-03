import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Footer from './components/Footer.jsx';
import Contatti from './pages/Contatti.jsx';
import CreaServizio from './pages/CreaServizio.jsx'
import DettagliServizio from './pages/DettagliServizio.jsx'
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Search from './pages/Search';
import { getPosts } from './services/api';

function App() {
  const [search, setSearch] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Errore nella fetch dei post:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = posts.filter(post => {
      const title = post.title ? post.title.toLowerCase() : '';
      const author = post.author ? post.author.toLowerCase() : '';
      const searchLower = search.toLowerCase();
      return title.includes(searchLower) || author.includes(searchLower);
    });
    setFilteredPosts(filtered);
    setSearchSubmitted(true);
    setSearch('');
  };

  return (
    <Router>
      <div className="App bg-gray-300">
        <Navbar />
        <Search
          search={search}
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home posts={filteredPosts.length > 0 ? filteredPosts : posts} />} />
            <Route path="/contacts" element={<Contatti />} />
            <Route path="/admin/new-service" element={<CreaServizio />} />
            <Route path="/create" element={<CreaServizio />} />
            <Route path="/post/:id" element={<DettagliServizio />} />
            <Route
              path="/search"
              element={
                searchSubmitted && filteredPosts.length === 0 ?
                  <NotFound searchTerm={search} /> :
                  <Navigate to="/" replace />
              }
            />
            <Route path="*" element={<NotFound searchTerm={search} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
