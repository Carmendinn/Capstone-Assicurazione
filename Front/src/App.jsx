import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Footer from './components/Footer.jsx';
import Contatti from './pages/Contatti.jsx';
import CreaServizio from './pages/CreaServizio.jsx'
import DettagliServizio from './pages/DettagliServizio.jsx'

function App() {
  return (
    <Router>
      <div className="App bg-gray-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contatti />} />
            <Route path="/admin/new-service" element={<CreaServizio />} />
            <Route path="/create" element={<CreaServizio />} />
            <Route path="/post/:id" element={<DettagliServizio  />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
