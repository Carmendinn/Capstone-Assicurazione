import mongoose from "mongoose";

const serviziSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
      enum: ['Auto', 'Casa', 'Vita', 'Salute', 'Viaggio', 'Animali']
    },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    content: { type: String, required: true },
    duration: { type: String, required: true },
    terms: { type: String, required: true },
    price: { type: Number, required: false },
  }, {
    timestamps: true,
    collection: "servizi"
  });
  


export default mongoose.model("Servizi", serviziSchema);