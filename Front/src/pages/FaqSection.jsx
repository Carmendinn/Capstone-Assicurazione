import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  { question: "Quali sono i vostri orari di apertura?", answer: "Siamo aperti dal lunedì al venerdì, dalle 9:00 alle 18:00." },
  { question: "Come posso richiedere un'assicurazione?", answer: "Puoi richiedere un'assicurazione direttamente dal nostro sito web o contattando il nostro servizio clienti." },
  { question: "Quali tipi di assicurazioni offrite?", answer: "Offriamo una vasta gamma di assicurazioni, tra cui auto, casa, vita e aziendali." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Domande Frequenti</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <motion.div
              onClick={() => handleToggle(index)}
              className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md"
              initial={{ backgroundColor: "#f9f9f9" }}
              whileHover={{ backgroundColor: "#e0e0e0" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
            </motion.div>
            <motion.div
              className="overflow-hidden"
              animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="p-4 bg-gray-50 rounded-lg">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;