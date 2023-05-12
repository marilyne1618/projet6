//  Mongo (Connexion et accès à la base de données)
const mongoose = require("mongoose")

// Variable qui utilise un module pour obtenir de meilleurs messages d'erreurs
const uniqueValidator = require("mongoose-unique-validator")

// variables d'environnement liés au fichier ".env" pour ne pas faire apparaître des données sensibles
const password = process.env.PASSWORD
const login = process.env.LOGIN
const db = process.env.DB
const uri = `mongodb+srv://${login}:${password}@cluster0.ijorfer.mongodb.net/${db}?retryWrites=true&w=majority`

// Mongoose se connecte à l'url (uri) et envoir une promesse
// Utilisation de Then au lieu de Await car utile pour obtenir des informations sur les évènements avec (e)
mongoose.connect(uri).then(() => {
    console.log("connected to database")
})
    .catch((err) => console.error(err))

// Création du modèle d'utilisateur dans la base de données avec un email unique
// Cela n'enregistrera pas deux fois le même email
const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)


// Exportation de mongoose dans la page users.js
module.exports = { mongoose, User }

