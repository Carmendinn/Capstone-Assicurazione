import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const clientiSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataDiNascita: { type: String, required: true },
  avatar: { type: String }
 
}, {
  timestamps: true,
  collection: "clienti"
});



export default mongoose.model("Clienti", clientiSchema); 