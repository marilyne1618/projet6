// Variables pour l'utilisation des libairies dans node_modules
const bodyParser = require("body-parser")
const path = require("path")
// Importation 
const { app, express } = require("./server")
const port = 3000

// Connexion à la base de données
require("./mongo")

// Importation de createUser du fichiers users.js
const { createUser, logUser } = require("./controllers/users")
const { getSauces, createSauce } = require("./controllers/sauces")

// BodyParser.json lit les données HTTP POST comme l'entrée d'un formulaire et le stocke en tant qu'objet javascript
// et BodyParser.urlencoded Retrouve tous les ingrédients à partir d'une sauce
app.use(bodyParser.json())

// "AuthenticatUser" est un Middleware qui donne accès à la page des sauces qu'après l'authentification des utilisateurs
const { authenticateUser } = require("./middleware/auth")
const { upload } = require("./middleware/multer")

// On fait une requête get qui utilise deux arguments: le chemin et une fonction

app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces", authenticateUser, getSauces)
app.post("/api/sauces", authenticateUser, upload.single("image"), createSauce)
// Chemin universel "/"
app.get("/", (req, res) => res.send("hello world"))

// Ici on crée le chemin universel
app.get("/", (req, res) => res.send("hello wordl"))

// Indique un chemin absolu (sur le serveur) "path.join" est utile en cas de déplacement du dossier
app.use("/images", express.static(path.join(__dirname, "images")))

// écoute sur le port 3000 pour pouvoir faire des requêtes
app.listen(port, () => console.log("listening on port " + port))
