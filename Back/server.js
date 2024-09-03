import express from "express"; 
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import cors from "cors"; 
import listEndpoints from "express-list-endpoints"; 
import { badRequestHandler, authorizedHandler, notFoundHandler, genericErrorHandler,} from "../Back/middlewares/errorHandlers.js";
import path from "path";
import { fileURLToPath } from "url";
import serviziRoutes from './routes/serviziRoutes.js';
import clientiRoutes from './routes/clientiRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import session from "express-session"; // Importiamo session
import passport from "./config/passportConfig.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();     //configuro dotenv

const app = express();  //configuro app
app.use(cors());   //abilito cors su tutte le rotte

app.use(express.json());  
app.use(
  session({
    
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Inizializzazione di Passport
app.use(passport.initialize());
app.use(passport.session());




mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('Mongo DB connesso'))
 .catch((err)=> console.error('Errore di connessione', err));
 
 app.use("/api/auth", authRoutes);
 app.use('/api/servizi', serviziRoutes);
 app.use('/api/clienti', clientiRoutes);



 const PORT = process.env.PORT || 5000;


 app.use(badRequestHandler); // Gestisce errori 400 Bad Request
 app.use(authorizedHandler); // Gestisce errori 401 Unauthorized
 app.use(notFoundHandler); // Gestisce errori 404 Not Found
 app.use(genericErrorHandler); 

 app.listen(PORT, () => {
    console.log('Server connesso sulla porta'+ PORT);
    console.table(
      listEndpoints(app).map((route) => ({
        path: route.path,
        methods: route.methods.join(", "),
      })),
    );
 });