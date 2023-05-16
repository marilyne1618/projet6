const mongoose = require("mongoose")
const bodyParser = require("body-parser")

// Création du schéma des sauces
const productSchema = new mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersliked: [String],
    usersdisliked: [String]
})

// Création du modèle de sauce
const Product = mongoose.model("Product", productSchema)

function getSauces(req, res) {
    // Affiche les sauces après l'authentification des utilisateurs
    Product.find({}).then(products => res.send(products))
}

function createSauce(req, res) {
    const { body, file } = req
    const { fileName } = file
    // Transforme la chaîne de caractères en objet avec JSON.parse
    const sauce = JSON.parse(body.sauce)

    // Récupération des informations depuis le body de la requête passée par le site Web
    const { name, manufacturer, description, mainPepper, heat, userId } = sauce
    function makeImageUrl(req, fileName) {
        return req.protocol + "://" + req.get("host") + "/images/" + fileName
    }

    // Création des éléments pour la base de données
    const product = new Product({
        userId: userId,
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        imageUrl: makeImageUrl(req, fileName),
        heat: heat,
        likes: 0,
        dislikes: 0,
        usersliked: [],
        usersdisliked: [],
    })
    product
        .save()
        .then((message) => {
            res.send({ message: message })
            return console.log("produit enregistré", message)
        })
        .catch(console.error)
}

// Exportation des fonctions dans le fichier index.js
module.exports = { getSauces, createSauce }