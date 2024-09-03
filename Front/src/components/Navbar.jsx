import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../public/images/logo png.png'


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    // Controlla se esiste un token nel localStorage
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
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center h-16"> {/* Altezza ridotta */}
        {/* Logo a sinistra */}
        <Link to="/" className="text-white text-xl font-bold">
          <img src={logo} alt="Logo" className="w-20 h-auto inline-block" /> {/* Logo mantenuto grande */}
        </Link>

        {/* Link a destra */}
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/contacts" className="text-white hover:text-gray-300">
              Contatti
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin/new-service" className="text-white hover:text-gray-300">
                  Nuovo Servizio
                </Link>
                <button onClick={handleLogout} className="text-white hover:text-gray-200">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-gray-200">
                  Registrati
                </Link>
              </div>
            )}
          </li>
        </ul>

        {isLoggedIn && (
          <div className="relative flex items-center ml-4">
            <input
              type="file"
              id="avatar"
              className="absolute top-0 left-0 w-12 h-12 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <img
              src={avatar || "https://via.placeholder.com/48"}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
            />
            <label htmlFor="avatar" className="cursor-pointer">
              
            </label>
          </div>
        )}
      </div>
    </nav>
  );
}


export default Navbar;
