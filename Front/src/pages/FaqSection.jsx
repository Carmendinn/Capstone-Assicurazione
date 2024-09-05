import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  { question: "Quali sono i vostri orari di apertura?", answer: "Siamo aperti dal lunedì al venerdì, dalle 9:00 alle 18:00." },
  { question: "Come posso richiedere un'assicurazione?", answer: "Puoi richiedere un'assicurazione direttamente dal nostro sito web o contattando il nostro servizio clienti." },
  { question: "Quali tipi di assicurazioni offrite?", answer: "Offriamo una vasta gamma di assicurazioni, tra cui auto, casa, vita e aziendali." },
  { question: "Come posso segnalare un sinistro?", answer: "Puoi segnalare un sinistro chiamando il nostro servizio clienti o utilizzando l'apposita sezione sul nostro sito." },
  { question: "Quali documenti sono necessari per sottoscrivere una polizza?", answer: "Di solito richiediamo un documento d'identità, il codice fiscale e la documentazione del veicolo o immobile." },
  { question: "Cosa fare in caso di emergenza?", answer: "In caso di emergenza, contattaci subito tramite il nostro numero verde disponibile 24/7." },
  { question: "Posso modificare la mia polizza?", answer: "Sì, puoi modificare la tua polizza in qualsiasi momento contattando il nostro servizio clienti." },
  { question: "Quali sono i metodi di pagamento accettati?", answer: "Accettiamo pagamenti tramite carta di credito, bonifico bancario e PayPal." },
  { question: "È possibile richiedere una consulenza personalizzata?", answer: "Sì, offriamo consulenze personalizzate per aiutarti a trovare la soluzione assicurativa più adatta alle tue esigenze." },
  { question: "Come posso annullare la mia polizza?", answer: "Per annullare la tua polizza, contatta il nostro servizio clienti almeno 30 giorni prima della scadenza." },
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
