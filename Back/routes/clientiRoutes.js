import express from "express";
import Clienti from "../models/Clienti.js";
import cloudinaryUploader from "../config/cloudinaryConfig.js";

const router = express.Router();

// GET Ottieni tutti i clienti
router.get('/', async (req, res) => {
    try {
        const clienti = await Clienti.find();
        res.json(clienti);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post Crea un nuovo cliente

router.post('/', async (req, res) => {
    const cliente = new Clienti(req.body);
    try {
        
        const newCliente = await cliente.save();
        const clienteResponse = newCliente.toObject();
        delete clienteResponse.password; // Rimuove la password dalla risposta

        res.status(201).json(clienteResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT  Modifica un cliente esistente per ID
router.put('/:id', async (req, res) => {
    try {
        const updateCliente = await Clienti.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updateCliente) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(updateCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE  Elimina un cliente esistente tramite ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCliente = await Clienti.findByIdAndDelete(req.params.id);
        if (!deletedCliente) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json({ message: 'Cliente eliminato' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/:clienteId/avatar", cloudinaryUploader.single("avatar"), async (req, res) => {
    try {
      // Verifica se è stato caricato un file, se non l'ho caricato rispondo con un 400
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      }
  
      // Cerca l'autore nel database, se non esiste rispondo con una 404
      const cliente = await Cliente.findById(req.params.authorId);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente non trovato" });
      }
  
      // Aggiorna l'URL dell'avatar dell'autore con l'URL fornito da Cloudinary
      cliente.avatar = req.file.path;
  
      // Salva le modifiche nel db
      await cliente.save();
  
      // Invia la risposta con l'autore aggiornato
      res.json(cliente);
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'avatar:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  });
  

export default router;
