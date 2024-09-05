import React from 'react';
import { motion } from 'framer-motion';

// Importazione manuale delle immagini
import marioImage from '../public/images/Team1.jpg';
import luisaImage from '../public/images/Team2.jpg';
import giuseppeImage from '../public/images/Team3.jpg';

const teamMembers = [
  { name: "Mario Rossi", position: "CEO", bio: "Esperto di assicurazioni con oltre 20 anni di esperienza.", image: marioImage },
  { name: "Luisa Bianchi", position: "Responsabile Clienti", bio: "Appassionata di servizio clienti e risoluzione problemi.", image: luisaImage },
  { name: "Giuseppe Verdi", position: "Specialista IT", bio: "Tecnico informatico con esperienza nella sicurezza dei dati.", image: giuseppeImage },
];

const TeamSection = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Il Nostro Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="p-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-70 object-contain object-center mb-2"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gray-900 bg-opacity-70 text-white flex items-center justify-center p-4 opacity-0"
              whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <p className="text-center">{member.bio}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
