import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Footer from './components/Footer.jsx';
import Contatti from './pages/Contatti.jsx';
import CreaServizio from './pages/CreaServizio.jsx';
import DettagliServizio from './pages/DettagliServizio.jsx';
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Search from './pages/Search.jsx';
import { getPosts } from './services/api.js';
import TeamSection from './pages/TeamSection.jsx';
import FaqSection from './pages/FaqSection.jsx';
import Testimonials from './pages/Testimonials.jsx';
import WhatsAppButton from './pages/WhatsappButton.jsx';
import GestioneSinistri from './pages/GestioneSinistri.jsx';
import CarrozzerieConvenzionate from './pages/CarrozzerieConvenzionate.jsx';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Errore nella fetch dei post:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    setIsSearching(value !== '');
    filterPosts(value);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    filterPosts(search);
  };

  const filterPosts = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => {
        const title = post.title ? post.title.toLowerCase() : '';
        const author = post.author ? post.author.toLowerCase() : '';
        const searchLower = searchTerm.toLowerCase();
        return title.includes(searchLower) || author.includes(searchLower);
      });
      setFilteredPosts(filtered);
    }
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
            <Route 
              path="/" 
              element={
                isSearching && filteredPosts.length === 0 
                  ? <NotFound searchTerm={search} />
                  : <Home posts={filteredPosts} />
              } 
            />
            <Route path="/contacts" element={<Contatti />} />
            <Route path="/admin/new-service" element={<CreaServizio />} />
            <Route path="/create" element={<CreaServizio />} />
            <Route path="/post/:id" element={<DettagliServizio />} />
            <Route path="/gestione-sinistri" element={<GestioneSinistri />} />
            <Route path="/carrozzerie-convenzionate" element={<CarrozzerieConvenzionate />} />
            <Route path="*" element={<NotFound searchTerm={search} />} />
          </Routes>
          <TeamSection />
          <Testimonials />
          <FaqSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;