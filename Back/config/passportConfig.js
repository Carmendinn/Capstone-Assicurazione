import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Clienti from '../models/Clienti.js';
import passport from "passport";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5001/api/auth/google/callback'
    
},
async function(accessToken, refreshToken, profile, done) {
  try {
    // Cerca prima l'utente per email
    let cliente = await Clienti.findOne({ email: profile.emails[0].value });
    
    if (cliente) {
      // Se l'utente esiste ma non ha un googleId, aggiornalo
      if (!cliente.googleId) {
        cliente.googleId = profile.id;
        await cliente.save();
      }
    } else {
      // Se l'utente non esiste, creane uno nuovo
      cliente = await Clienti.create({
        googleId: profile.id,
        nome: profile.name.givenName,
        cognome: profile.name.familyName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
    }
    return done(null, user);
  } catch (error) {
    console.error('Errore durante l\'autenticazione Google:', error);
    return done(error, null);
  }
}));
  
  passport.serializeUser((cliente, done) => {
    done(null, cliente.id);
  });
  
  
  passport.deserializeUser(async (id, done) => {
    try {
      const cliente = await Clienti.findById(id);
      done(null, cliente);
    } catch (error) {
      done(error, null);
    }
  });
  
  export default passport;