import express from "express";
import Servizi from "../models/Servizi.js";
//import { sendEmail } from "../services/emailService.js";
import cloudinaryUploader from "../config/cloudinaryConfig.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let query = {};
        // Se c'è un parametro 'title' nella query, crea un filtro per la ricerca case-insensitive
        if (req.query.title) {
            // Per fare ricerca case-insensitive:
            query.title = { $regex: req.query.title, $options: "i" };

        }
        // Cerca i servizi nel database usando il filtro (se presente)
        const servizi = await Servizi.find(query);
        // Invia la lista dei servizi come risposta JSON
        res.json(servizi);
    } catch (err) {
        // In caso di errore,
        res.status(500).json({ message: err.message });
    }
});

// GET servizio
router.get("/:id", async (req, res) => {
    try {
        // Cerca un servizio specifico per ID
        const servizi = await Servizi.findById(req.params.id);
        if (!servizi) {

            return res.status(404).json({ message: "Servizio non trovato" });
        }

        res.json(servizi);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
});

router.use(authMiddleware);

// POST / crea un nuovo servizio
router.post("/", cloudinaryUploader.single("cover"), async (req, res) => {
    try {
      const postData = req.body;
      if (req.file) {
        postData.cover = req.file.path; // Cloudinary restituirà direttamente il suo url
      }
      const newServizio = new Servizi(postData);
      await newServizio.save();
  
      // CODICE PER INVIO MAIL con MAILGUN
      const htmlContent = `
        <h1>Il tuo post è stato pubblicato!</h1>
        <p>Ciao ${newServizio.author},</p>
        <p>Il tuo post "${newServizio.title}" è stato pubblicato con successo.</p>
        <p>Categoria: ${newServizio.category}</p>
        <p>Grazie per il tuo contributo al blog!</p>
      `;
  
      await sendEmail(
        newServizio.clienti, // Ovviamente assumendo che newPost.author sia l'email dell'autore
        "Il tuo post è stato correttamente pubblicato",
        htmlContent
      );
  
      res.status(201).json(newServizio);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  });

// PUT / modifica un servizio
router.put('/:id', async (req, res) => {
    try {
        const updateServizio = await Servizi.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updateServizio) {
            return res.status(404).json({ message: 'Servizio non trovato' })
        }
        else {
            res.json(updateServizio);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE / elimina un servizio

router.delete('/:id', async (req, res) => {
    try {
        const deletedServizio = await Servizi.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!deletedServizio) {
            return res.status(404).json({ message: 'Servizio non trovato' })
        }
        else {
            res.json({ message: 'Servizio cancellato' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH carica un'immagine di copertina per il servizio specificato
router.patch("/:servizioId/cover", cloudinaryUploader.single("cover"), async (req, res) => {
    try {
      // Verifica se è stato caricato un file o meno
      if (!req.file) {
        return res.status(400).json({ message: "Ops, nessun file caricato" });
      }
  
      // Cerca il blog post nel db
      const servizio = await Servizi.findById(req.params.blogPostId);
      if (!servizio) {
        return res.status(404).json({ message: "Servizio non trovato" });
      }
  
      // Aggiorna l'URL della copertina del servizio con l'URL fornito da Cloudinary
      servizio.cover = req.file.path;
  
      // Salva le modifiche nel db
      await servizio.save();
  
      // Invia la risposta con il blog post aggiornato
      res.json(servizio);
    } catch (error) {
      console.error("Errore durante l'aggiornamento della copertina:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  });

export default router; 