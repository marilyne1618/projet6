// Librairie pour les variables d'environnement
require('dotenv').config()

// Variables pour l'utilisation des libairies dans node_modules
const express = require("express")
const app = express()
const cors = require("cors")

// Cors est un MiddLeware et s'exécute entre la requête et la réponse comme une autorisation
// Cors dit à Express d'autoriser l'accès dans la base de données
app.use(cors())
app.use(express.json())

module.exports = { app, express }