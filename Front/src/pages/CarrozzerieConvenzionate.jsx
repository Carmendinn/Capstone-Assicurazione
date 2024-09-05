import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const carrozzerie = [
  {
    nome: "Carrozzeria Roma",
    indirizzo: "Via del Colosseo, 123, Roma",
    telefono: "+39 123 456 7890",
  },
  {
    nome: "Carrozzeria Milano",
    indirizzo: "Corso Buenos Aires, 45, Milano",
    telefono: "+39 123 456 7891",
  },
  {
    nome: "Carrozzeria Napoli",
    indirizzo: "Via Toledo, 67, Napoli",
    telefono: "+39 123 456 7892",
  },
  {
    nome: "Carrozzeria Firenze",
    indirizzo: "Piazza del Duomo, 12, Firenze",
    telefono: "+39 123 456 7893",
  },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CarrozzerieConvenzionate = () => {
  return (
    <motion.div
      className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Carrozzerie Convenzionate
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {carrozzerie.map((carrozzeria, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {carrozzeria.nome}
            </h3>
            <p className="flex items-center text-gray-600 mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              {carrozzeria.indirizzo}
            </p>
            <p className="flex items-center text-gray-600">
              <FaPhone className="mr-2 text-green-500" />
              {carrozzeria.telefono}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CarrozzerieConvenzionate;
