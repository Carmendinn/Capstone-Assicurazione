import React from 'react';
import { X } from 'lucide-react';
import { motion } from "framer-motion";

export default function NotFound({ searchTerm, onClose }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="container mx-auto mt-8 p-4 max-w-md text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        variants={itemVariants}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-48 h-48 mx-auto mb-6"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <circle cx="100" cy="100" r="80" fill="#f0f0f0" />
          <path d="M70,80 Q100,120 130,80" stroke="#888" strokeWidth="4" fill="none" />
          <circle cx="70" cy="70" r="10" fill="#888" />
          <circle cx="130" cy="70" r="10" fill="#888" />
        </motion.svg>
        <motion.h2
          className="text-3xl font-bold mb-4 text-gray-800"
          variants={itemVariants}
        >
          Nessun risultato trovato!
        </motion.h2>
        <motion.p
          className="mb-6 text-gray-600"
          variants={itemVariants}
        >
          {searchTerm
            ? `Spiacenti, non abbiamo trovato risultati per "${searchTerm}".`
            : "Spiacenti, la pagina che stai cercando non esiste."}
          <br />
          Prova a cercare qualcos'altro o chiudi questa finestra.
        </motion.p>
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
        </motion.div>
      </motion.div>
    </motion.div>
  );
}