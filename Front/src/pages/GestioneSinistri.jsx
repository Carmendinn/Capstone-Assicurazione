import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';

const GestioneSinistri = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      title: "Segnalazione del Sinistro",
      content: "Contatta immediatamente la nostra assistenza clienti per segnalare il sinistro. Fornisci tutti i dettagli necessari per avviare la pratica.",
    },
    {
      title: "Valutazione del Danno",
      content: "I nostri esperti esamineranno il danno e forniranno una stima accurata. Ti terremo informato durante tutto il processo di valutazione.",
    },
    {
      title: "Risoluzione e Liquidazione",
      content: "Lavoreremo per risolvere il sinistro nel modo più efficiente possibile. Una volta completato, procederemo con la liquidazione del danno.",
    },
    {
      title: "Cosa fare in caso di incidente?",
      content: "In caso di incidente, assicurati di raccogliere tutte le informazioni necessarie (testimoni, foto, etc.) e contatta il nostro servizio clienti.",
    },
    {
      title: "Quanto tempo ci vuole per risolvere un sinistro?",
      content: "Il tempo di risoluzione dipende dalla complessità del sinistro. Cerchiamo di gestire tutte le pratiche nel minor tempo possibile.",
    },
    {
      title: "Quali documenti sono necessari?",
      content: "Generalmente servono la denuncia del sinistro, le foto del danno e un modulo di richiesta risarcimento. Ti guideremo passo dopo passo.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Gestione Sinistri</h1>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Sezione di supporto con icona e recapito telefonico */}
      <motion.div
        className="mt-12 bg-blue-100 p-6 rounded-lg shadow-md flex items-center justify-between"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: sections.length * 0.2 }}
      >
        <div className="flex items-center">
          <FaPhoneAlt className="text-blue-600 text-3xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-blue-700">Hai bisogno di assistenza immediata?</h2>
            <p className="text-blue-600">Contattaci al numero <a href="tel:+391234567890" className="font-bold">+39 123 456 7890</a></p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-blue-500 italic">Siamo qui per aiutarti 24/7 in caso di emergenza.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GestioneSinistri;
