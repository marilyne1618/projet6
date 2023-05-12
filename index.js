// Librairie pour les variables d'environnement
require('dotenv').config()

// Variables pour l'utilisation des libairies dans node_modules
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 3000

// Connexion à la base de données
require("./mongo")

// Importation de createUser du fichiers users.js
const { createUser, logUser } = require("./controllers/users")

// Cors est un MiddLeware et s'exécute entre la requête et la réponse comme une autorisation
// Cors dit à Express d'autoriser l'accès dans la base de données
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// On fait une requête get qui utilise deux arguments: le chemin et une fonction
// Ici on crée le chemin universel
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces", (req, res) => res.send("hello wordl"))

// écoute sur le port 3000 pour pouvoir faire des requêtes
app.listen(port, () => console.log("listening on port " + port))
