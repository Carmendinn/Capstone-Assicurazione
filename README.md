Il mio progetto per il capstone è la realizzazione di un sito web per un'agenzia di assicurazione.

Creato in React con Vite e lo stile è stato gestito con Tailwind e Framer Motion.


Parliamo ora del progetto lato Backend e Frontend


Questo progetto implementa un robusto sistema di autenticazione utilizzando Google OAuth 2.0 e un efficiente meccanismo di upload di immagini su Cloudinary per un'applicazione Node.js. Il sistema è progettato per offrire un'esperienza utente fluida, consentendo agli utenti di autenticarsi tramite i loro account Google e caricare immagini in modo sicuro su Cloudinary.
Il progetto implementa una robusta gestione degli errori utilizzando middleware personalizzati di Express. Questi middleware catturano e gestiscono vari tipi di errori, fornendo risposte coerenti e informative.
Il progetto utilizza Mongoose per definire e gestire i modelli di dati per MongoDB. Sono stati implementati due principali modelli: Clienti e Servizi.
La password viene automaticamente hashata prima del salvataggio.
Il metodo comparePassword permette un confronto sicuro delle password.
Evitare di esporre campi sensibili come password nelle risposte API.


-Route Clienti
Questo modulo gestisce tutte le operazioni CRUD (Create, Read, Update, Delete) relative ai clienti, oltre all'upload dell'avatar.

-Route di Autenticazione
Questo modulo gestisce l'autenticazione degli utenti, incluso il login tradizionale e l'autenticazione tramite Google OAuth.

-Route Servizi
Questa API fornisce la gestione dei servizi all'interno di un'applicazione, inclusa la creazione, lettura, aggiornamento e cancellazione di servizi, nonché la gestione delle immagini di copertina. Si integra con Cloudinary per il caricamento di immagini e include l'invio di email di conferma tramite un servizio esterno (Mailgun).

-Token Jwt
Questa utility fornisce due funzioni principali per la gestione dei token JWT all'interno di applicazioni Node.js: una funzione per generare token e una per verificare la loro validità. È costruita utilizzando il pacchetto jsonwebtoken.

Funzionalità
Generazione di JWT: Crea un token JWT firmato con un payload personalizzato e una scadenza configurabile.
Verifica di JWT: Decodifica e verifica un token JWT per confermarne la validità e restituire il payload.

Per quuanto riguarda il Frontend

-Footer
Il componente Footer è un semplice footer per un'applicazione web sviluppata con React e utilizzando Tailwind CSS per lo styling

-Navbar
Il componente Navbar gestisce la barra di navigazione della tua applicazione con funzioni dinamiche come il controllo dello stato di login, il caricamento di un avatar personalizzato, e un menu a tendina per alcune voci di navigazione. 

Funzionalità Principali
Gestione dello stato di login:

Usa useState e useEffect per controllare se l'utente è loggato o meno, basato sulla presenza di un token JWT memorizzato nel localStorage.
Lo stato di login viene monitorato anche con un listener su window.addEventListener("storage") per eventuali cambiamenti da altre schede o finestre del browser.
Logout:

Il token di autenticazione viene rimosso dal localStorage e l'utente viene reindirizzato alla homepage.
Caricamento di un avatar personalizzato:

L'utente può caricare un'immagine personalizzata come avatar, che viene gestita tramite il FileReader e visualizzata accanto ai controlli di navigazione.
Dropdown Menu per "Sinistri":

C'è un menu a tendina per le opzioni di "Sinistri", che mostra altre voci di navigazione (es. "Gestione Sinistri", "Carrozzerie Convenzionate") quando viene cliccato.
Navigazione:

Link statici per le pagine "Contatti", "Nuovo Servizio" (visibile solo per utenti loggati), "Login" o "Logout", e un'icona/logo che porta alla homepage.
Codice

-Componenti

Il codice è composto da più componenti React che utilizzano librerie come Framer Motion per gestire animazioni e transizioni, e React Router per la navigazione tra le pagine.

-Api
gestisce le chiamate API in un'applicazione JavaScript/React utilizzando Axios per comunicare con un backend. Viene definita un'istanza preconfigurata di Axios, con un sistema di interceptor per gestire i token di autenticazione.
Viene configurato un interceptor per le richieste API. Ogni volta che una richiesta viene inviata, l'interceptor aggiunge il token di autenticazione (se presente) negli header della richiesta.
Il token è recuperato da localStorage con la chiave "token", e viene incluso come Bearer token nell'intestazione Authorization.
Se ci sono errori nella richiesta, vengono gestiti e passati tramite Promise.reject().

-funzioni principali

getPosts: recupera tutti i servizi (o post) dall'endpoint /servizi.
getPost: recupera un singolo servizio specificato dall'ID.
createPost: permette di creare un nuovo servizio (o post) inviando i dati sotto forma di FormData per gestire i file, ad esempio immagini.
updatePost: aggiorna un servizio specifico utilizzando l'ID, e invia i dati con la stessa struttura di multipart/form-data.
deletePost: elimina un servizio specifico usando il suo ID.
registerUser: effettua la registrazione di un nuovo utente inviando i dati dell'utente all'endpoint /clienti.
loginUser: invia le credenziali dell'utente all'endpoint /auth/login. Se la risposta ha successo, il token di autenticazione viene incluso nei dati di risposta.
Viene anche gestito e loggato un eventuale errore durante la richiesta.
getMe: effettua una richiesta per ottenere i dati dell'utente attualmente autenticato.
getUserData: simile a getMe, ma utilizza async/await e include la gestione degli errori.