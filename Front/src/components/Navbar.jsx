import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo a sinistra */}
      <Link to="/" className="text-white text-xl font-bold">
        <img src ={("../public/logo")} alt="Logo" className="h-8 inline-block mr-2" />
      </Link>
      
      {/* Link a destra */}
      <ul className="flex space-x-4">
        <li>
          <Link to="/contacts" className="text-white hover:text-gray-300">
            Contatti
          </Link>
        </li>
        <li>
          <Link to="/admin/new-service" className="text-white hover:text-gray-300">
            Nuovo Servizio
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
