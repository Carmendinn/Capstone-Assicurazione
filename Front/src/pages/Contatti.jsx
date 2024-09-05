import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const introVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const contactVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
};

const bounceVariants = {
  hover: {
    scale: 1.05,
    transition: {
      yoyo: Infinity,
      duration: 0.5
    }
  }
};

export default function Contatti() {
  useEffect(() => {
    // Effettua lo scroll verso l'alto al caricamento del componente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="contacts-section" className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Sezione Introduttiva */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={introVariants}
        >
          <h1 className="text-4xl font-semibold text-gray-800">Contattaci</h1>
          <p className="text-gray-600 mt-4">Siamo qui per aiutarti. Contatta il nostro team per qualsiasi domanda o richiesta di informazioni.</p>
        </motion.div>

        {/* Sezione Recapiti */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Recapiti Telefonici */}
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-sm"
            initial="hidden"
            animate="visible"
            variants={contactVariants}
            whileHover="hover"
            variants2={bounceVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recapiti Telefonici</h2>
            <p className="text-gray-700 mb-2">Telefono: <a href="tel:+391234567890" className="text-gray-800 font-medium">+39 123 456 7890</a></p>
            <p className="text-gray-700">Fax: <a href="fax:+391234567891" className="text-gray-800 font-medium">+39 123 456 7891</a></p>
          </motion.div>

          {/* Indirizzo Email */}
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-sm"
            initial="hidden"
            animate="visible"
            variants={contactVariants}
            whileHover="hover"
            variants2={bounceVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email</h2>
            <p className="text-gray-700">Email: <a href="mailto:info@agenziaassicurativa.com" className="text-gray-800 font-medium">info@agenziaassicurativa.com</a></p>
            <p className="text-gray-700">Supporto Clienti: <a href="mailto:supporto@agenziaassicurativa.com" className="text-gray-800 font-medium">supporto@agenziaassicurativa.com</a></p>
          </motion.div>

          {/* Indirizzo Fisico */}
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-sm"
            initial="hidden"
            animate="visible"
            variants={contactVariants}
            whileHover="hover"
            variants2={bounceVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Indirizzo</h2>
            <p className="text-gray-700">Via Assicurativa, 123</p>
            <p className="text-gray-700">00100 Roma, Italia</p>
            <p className="text-gray-700">Orari di apertura: Lun-Ven 9:00 - 18:00</p>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-sm"
            initial="hidden"
            animate="visible"
            variants={contactVariants}
            whileHover="hover"
            variants2={bounceVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seguici sui Social</h2>
            <div className="space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800"
                whileHover="hover"
                variants={bounceVariants}
              >
                Facebook
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800"
                whileHover="hover"
                variants={bounceVariants}
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800"
                whileHover="hover"
                variants={bounceVariants}
              >
                Instagram
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
