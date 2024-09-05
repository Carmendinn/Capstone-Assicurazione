import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../public/images/logo png.png';
import defaultAvatar from '../public/images/default-avatar.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(defaultAvatar);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAvatar(defaultAvatar);
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16">
        <Link to="/" className="text-white text-xl font-bold">
          <img src={logo} alt="Logo" className="w-20 h-auto inline-block" />
        </Link>

        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/contacts" className="text-white hover:text-gray-300">
              Contatti
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Sinistri
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <li>
                  <Link
                    to="/gestione-sinistri"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleDropdown}
                  >
                    Gestione Sinistri
                  </Link>
                </li>
                <li>
                  <Link
                    to="/carrozzerie-convenzionate"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleDropdown}
                  >
                    Carrozzerie Convenzionate
                  </Link>
                </li>
              </ul>
            )}
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
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
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
              src={avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
            />
            <label htmlFor="avatar" className="cursor-pointer">
              {/* Puoi aggiungere un'icona o un testo qui se lo desideri */}
            </label>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;