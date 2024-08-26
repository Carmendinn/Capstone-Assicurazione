import mongoose from "mongoose";

const serviziSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true,
        enum: ['Auto', 'Casa', 'Vita', 'Salute', 'Viaggio', 'Animali'] // Tipo di servizio fornito
    },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    content: { type: String, required: true },
    price: {  type: Number, required: true, min: 0  // Mi assicuro che il prezzo non sia negativo
    },
    duration: { type: String, required: true },
    terms: { type: String, required: true },
}, {
    timestamps: true,
    collection: "servizi"
});

export default mongoose.model("Servizi", serviziSchema);