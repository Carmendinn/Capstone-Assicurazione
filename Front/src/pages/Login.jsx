import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/api";

  
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "", // campo email
    password: "", // campo password
  });


  const navigate = useNavigate(); // cambio pagina
  const location = useLocation();
  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    //const userName = params.get("userName");

    if (token) {
      localStorage.setItem("token", token);
      
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("loginStateChange"));
      navigate("/");
    }
  }, [location, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await loginUser(formData); 
      localStorage.setItem("token", response.token); 
      window.dispatchEvent(new Event("storage")); 
      console.log("Login effettuato con successo!"); 
      navigate("/"); 
    } catch (error) {
      console.error("Errore durante il login:", error); 
      alert("Credenziali non valide. Riprova."); 
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };


  
  return (
    <div className="container mx-auto mt-8 p-4 max-w-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white p-3 rounded hover:bg-gray-800 transition duration-300"
        >
          Accedi
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Accedi con Google
      </button>
    </div>
  )
};