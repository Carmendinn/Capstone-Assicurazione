import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, text: "Ho stipulato una polizza auto e una polizza sulla casa, e ogni volta che ho avuto bisogno di assistenza sono stati rapidi e professionali. Il loro team è sempre disponibile e cordiale, e mi hanno aiutato a trovare la soluzione migliore per le mie esigenze. Consigliatissimi!", author: "Giulia Bianchi" },
  { id: 2, text: "Ho dovuto fare una richiesta di risarcimento per un incidente stradale e sono stati molto efficienti nel gestire il tutto. La procedura è stata chiara e ho ricevuto il pagamento in tempi brevi.", author: "Luca Conti" },
  { id: 3, text: "Mi sono rivolto a loro per una polizza viaggio e sono rimasto colpito dalla loro competenza e dall'ampia gamma di coperture offerte. Anche il prezzo era competitivo rispetto ad altre compagnie. Continuerò a fare affidamento su di loro per le mie future esigenze assicurative.", author: "Alessandro Ferrara" },
  { id: 4, text: "Il mio consulente, Marco, è stato fantastico nel guidarmi attraverso la scelta della mia assicurazione sulla vita. Mi ha spiegato tutto in modo molto semplice e ha risposto a tutte le mie domande con pazienza. Non mi sono mai sentita così sicura nelle mie decisioni finanziarie.", author: "Francesca  Rossi" }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const carouselVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const buttonVariants = {
  hover: { scale: 1.1, backgroundColor: '#333', transition: { duration: 0.3 } }
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000); // Cambia testimonianza ogni 5 secondi

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-gray-100 py-2 mb-0">
      <div className="max-w-7xl mx-auto p-6">
        {/* Sezione Introduttiva */}
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">Cosa dicono i nostri clienti</h1>
          <p className="text-gray-600">Leggi le esperienze dei nostri clienti soddisfatti.</p>
        </motion.div>

        {/* Carosello di Testimonianze */}
        <div className="relative p-6 rounded-lg bg-white shadow-lg mb-2">
          <motion.div
            className="flex overflow-hidden relative"
            initial="hidden"
            animate="visible"
            variants={carouselVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`flex-none w-full p-6 mx-2 bg-white rounded-lg transform transition-transform duration-500 ease-in-out ${index === current ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 text-lg italic">"{testimonial.text}"</p>
                <p className="mt-4 text-gray-900 font-semibold text-right">- {testimonial.author}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Frecce di Navigazione */}
          <div className="absolute inset-y-1/2 left-4 flex items-center space-x-4">
            <button
              className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-700 focus:outline-none"
              onClick={() => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              variants={buttonVariants}
              whileHover="hover"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-1/2 right-4 flex items-center space-x-4">
            <button
              className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-700 focus:outline-none"
              onClick={() => setCurrent(prev => (prev + 1) % testimonials.length)}
              variants={buttonVariants}
              whileHover="hover"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicatori di posizione */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 bg-indigo-900 rounded-full ${index === current ? 'bg-indigo-700' : 'bg-indigo-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
