import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const clientiSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String}, 
  email: { type: String, unique: true }, 
  dataDiNascita: { type: String },
  avatar: { type: String },
  password: { type: String }, 
  googleId: { type: String },
 
}, {
  timestamps: true,
  collection: "clienti"
});


clientiSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    throw new Error("Nessuna password impostata per questo utente");
  }
  console.log("Password candidata:", candidatePassword);
  console.log("Password hashata nel DB:", this.password);
  return await bcrypt.compare(candidatePassword, this.password);
};

clientiSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    // Genera un salt (un valore casuale per rendere l'hash più sicuro)
    const salt = await bcrypt.genSalt(10);
    // Crea l'hash della password usando il salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Passa eventuali errori al middleware successivo
  }
});
export default mongoose.model("Clienti", clientiSchema); 